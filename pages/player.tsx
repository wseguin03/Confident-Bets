import { Form, Card, Row, Col, Container, Accordion } from 'react-bootstrap';
import { prisma } from "@/lib/prisma"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Navbar from '@/components/Navbar';
import { useState } from 'react';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

export default function Players({ players }: Props) {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlayers = players.filter(player =>
    player.YEAR === parseInt(selectedYear) && player.Player.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        </Row>
        <Row><br></br></Row>
        <Accordion>
          <Row xs={1} md={4} className="g-4">
            {filteredPlayers.map((player, index) => (
              <Col key={index}>
                <Card>
                  <Accordion.Item eventKey={index.toString()}>
                    <Accordion.Header>
                      <img src={player.photoUrl} alt={player.Player} style={{ width: '91px', height: '59.5px' }} />
                      {player.Player}
                    </Accordion.Header>
                    <Accordion.Body>
                      Position: {player.Pos}<br />
                      Age: {player.Age}<br />
                      Team: {player.Tm}<br />
                      Games: {player.G}<br />
                      Games Started: {player.GS}<br />
                      Minutes Played: {player.MP}<br />
                      Field Goals: {player.FG}
                      {/* Add more player details here */}
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
        player: player.Player,
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
