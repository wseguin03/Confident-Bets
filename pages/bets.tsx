import Navbar from '@/components/Navbar'
import React from 'react'
import { Form, Button, Container, Row } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { prisma } from '@/lib/prisma'
import Select from 'react-select';
import { useState, useEffect } from 'react';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

export default function Bets({ playerStats, teams, gameStats }: Props) {
    const router = useRouter();
    const playerURL = router.query.player;
    const team = router.query.team;
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [filteredGameStats, setFilteredGameStats] = useState([]);

    const defaultOptions = teams.map(team => ({
        value: team,
        label: team,
      }));

      const handleInputChange = (newValue) => {
        const inputValue = newValue.replace(/\W/g, '');
        return inputValue;
      };
      const handleSubmit = (event) => {
        event.preventDefault();
    
        const filteredStats = gameStats.filter(stat => stat.team === selectedTeam);
        setFilteredGameStats(filteredStats);
      };
    
      useEffect(() => {
        // Fetch gameStats here and set it to state
      }, []);
    return (
        <>
            <Navbar />
            <Container>
                <Row><br></br></Row>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Team</Form.Label>
                        <Form.Control type="text" placeholder="Enter team" defaultValue={playerStats?.Tm} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Player</Form.Label>
                        <Form.Control type="text" placeholder="Enter player" defaultValue={playerStats?.Player} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Bet Type</Form.Label>
                        <Form.Select>
                            <option>Select bet type</option>
                            <option value="points">Points</option>
                            <option value="rebounds">Rebounds</option>
                            <option value="assists">Assists</option>
                            <option value="3P">3 Points Made</option>

                            {/* Add more options as needed */}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
            <Form.Label>Team</Form.Label>
            <Select options={defaultOptions} />
          </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Prop Line Bet</Form.Label>
                        <Form.Control type="number" placeholder="Enter Prop Value" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Bet Type</Form.Label>
                        <Form.Select>
                            <option>Over/Under/Milestone</option>
                            <option value="over">Over</option>
                            <option value="under">Under</option>
                            <option value="milestone">Milestone</option>
                            {}
                        </Form.Select>
                    </Form.Group>
                    <Button type="submit">Calculate</Button>

                </Form>
            </Container>
        </>
    )
}
export async function getServerSideProps(context) {
    const player = context.query.player;

    if (!player) {
        return {
            notFound: true,
        };
    }

    let teams = [];
    try {
        const response = await prisma.playerStats.findMany({
            select: {
                Tm: true,
            },
        });

        teams = Array.from(new Set(response.map(team => team.Tm)));
    } catch (error) {
        console.error('Error fetching teams:', error);
    }

    const playerStats = await prisma.playerStats.findFirst({
        where: {
            Player: player,
            YEAR: 2024,
        },
    });
    const gameStats = await prisma.gameStats.findMany();

    await prisma.$disconnect();

    return {
        props: {
            playerStats,
            teams,
            gameStats,
        },
    };
};
