// app/players/page.tsx
'use client'; // Marking the parent component as a client component

import { useState, useEffect } from 'react';
import { Card, CardGroup, Container, Row, Col, Form } from 'react-bootstrap';
import Navbar from '../../components/Navbar';
import { prisma } from "@/lib/prisma";

export default function Players() {

  return (
    <client>
      <PlayersClient />
    </client>
  );
}

function PlayersClient() {
  const [year, setYear] = useState(2024);
  const [players, setPlayers] = useState([]);

  const fetchPlayers = async () => {
    const players = await prisma.PlayerStats.findMany({
      where: {
        year: year
      }
    });
    setPlayers(players);
  };

  useEffect(() => {
    fetchPlayers();
  }, [year]);

  return (
    <>
      <Navbar />
      <Container>
        <Form.Control as="select" value={year} onChange={e => setYear(e.target.value)}>
          {[...Array(10).keys()].map(i => (
            <option key={i} value={2015 + i}>{2015 + i}</option>
          ))}
        </Form.Control>
        <Row>
          {players.map((player, index) => (
            <Col md={2} key={index}>
              <CardGroup>
                <Card>
                  <Card.Body>
                    <Card.Title>{player.Player}</Card.Title>
                    <Card.Text>{player.Pos}</Card.Text>
                  </Card.Body>
                </Card>
              </CardGroup>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
