import { Card, Row, Col, Container } from 'react-bootstrap';
import { prisma } from "@/lib/prisma"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Navbar from '@/components/Navbar';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

export default function Players({players}: Props){
  return (
    <>
      <Navbar/>
      <Container>
        <h1>Players:</h1>
        <Row xs={1} md={5} className="g-4">
          {players.map((player, index) => (
            <Col key={index}>
              <Card>
                <Card.Body>
                  <Card.Title>{player.Player}</Card.Title>
                  <Card.Text>
                    Year: {player.YEAR}
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
  const players = await prisma.playerStats.findMany({
    where : {
      Player: "Precious Achiuwa"
    }
  })
  return {
    props: {
      players,
    },
  }
}