import { Form, Card, Row, Col, Container, Accordion, Button } from 'react-bootstrap';
import { prisma } from "@/lib/prisma"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Navbar from '@/components/Navbar';
import { useState } from 'react';
import { useRouter } from 'next/router';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

export default function Players({ players }: Props) {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const filteredPlayers = players.filter(player =>
    player.YEAR === parseInt(selectedYear) && player.Player.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [sortType, setSortType] = useState('');

  const sortPlayers = (players) => {
    switch (sortType) {
      case 'Rk':
        return [...players].sort((a, b) => a.Rk - b.Rk);
      case 'PTS':
        return [...players].sort((a, b) => b.PTS - a.PTS);
      default:
        return players;
    }
  };
  return (
    <>
      <Navbar />
      <Row><br></br></Row>

      <Container>
        <h1>Players:</h1>

        <Row>
          <Col>
            <Form.Select aria-label="Select Year" onChange={(e) => setSelectedYear(e.target.value)} value={selectedYear}>
              <option>Select Year</option>
              {[...Array(10)].map((_, i) => (
                <option key={i} value={2015 + i}>{2015 + i}</option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Form.Control type="text" placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)} />
          </Col>
          <Col>
            <Form.Select aria-label="Sort By" onChange={(e) => setSortType(e.target.value)}>
              <option value="">Sort By</option>
              <option value="Rk">Season Rank</option>
              <option value="PTS">Average PTS</option>
            </Form.Select>
          </Col>
        </Row>
        <Row><br></br></Row>
        <Accordion key={searchTerm}>
          <Row xs={1} md={4} className="g-4">
            {sortPlayers(filteredPlayers).map((player, index) => (
              <Col key={index}>
                <Card>
                  <Accordion.Item eventKey={index.toString()}>
                    <Accordion.Header>
                      <img src={player.photoUrl} alt={player.Player} style={{ width: '91px', height: '59.5px' }} />
                      {player.Player}
                    </Accordion.Header>
                    <Accordion.Body>
                      Position: {player.Pos}<br />
                      PTS: {player.PTS}<br />
                      Team: {player.Tm}<br />
                      Games: {player.G}<br />
                      Games Started: {player.GS}<br />
                      Minutes Played: {player.MP}<br />
                      Field Goals: {player.FG}
                      {/* Add more player details here */}
                      <br />
                      <Button variant="primary" onClick={() => router.push(`/bets?player=${player.Player}`)}>
                        Place Bet
                      </Button>
                    </Accordion.Body>
                  </Accordion.Item>
                </Card>
              </Col>
            ))}
          </Row>
        </Accordion>
      </Container>
    </>
  )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const players = await prisma.playerStats.findMany()
  
  const playersWithPhotos = await Promise.all(players.map(async player => {
    const photo = await prisma.playerPhotos.findFirst({
      where: {
        player: {
          contains: player.Player,
        },
      },
    });

    return {
      ...player,
      photoUrl: photo ? photo.url : null,
    };
  }));

  return {
    props: {
      players: playersWithPhotos,
    },
  }
}
// export const getServerSidePropsPhotos: GetServerSideProps = async (context) => {
//   const photos = await prisma.playerPhotos.findMany()
//   return {
//     props: {
//       photos,
//     },
//   }
// }
