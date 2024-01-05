import { Form, Card, Row, Col, Container, Image, Dropdown } from 'react-bootstrap';
import { prisma } from "@/lib/prisma"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Navbar from '@/components/Navbar';
import { useState } from 'react';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

export default function Players({players}: Props){
  const [selectedYear, setSelectedYear] = useState('2024');

  const filteredPlayers = selectedYear ? players.filter(player => player.YEAR === parseInt(selectedYear)) : players;

  return (
    <>
      <Navbar/>
      <Row><br></br></Row>

      <Container>
        <h1>Players:</h1>
        <Row>
          <Form.Select value = {selectedYear} aria-label="Select Year" onChange={(e) => setSelectedYear(e.target.value)}>
            <option>Select Year</option>
            {[...Array(10)].map((_, i) => (
              <option key={i} value={2015 + i}>{2015 + i}</option>
            ))}
          </Form.Select>
        </Row>
        <Row><br></br></Row>
        <Row xs={1} md={5} className="g-4">
          {filteredPlayers.map((player, index) => (
            <Col key={index}>
              <Card>
                <Card.Body>
                  <Card.Title>{player.Player}</Card.Title>
                  {/* <Image src="https://via.placeholder.com/150" alt={player.Player} /> */}
                  <Card.Text>
                    Average Points: {player.PTS}
                    {/* Add more player details here */}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps= async (context) => {
  const players = await prisma.playerStats.findMany()
  return {
    props: {
      players,
    },
  }
}