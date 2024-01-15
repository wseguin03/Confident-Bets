import Navbar from '@/components/Navbar'
import React from 'react'
import { Form, Button, Container, Row } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { prisma } from '@/lib/prisma'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

export default function Bets({ playerStats }: Props) {
    const router = useRouter();
    const playerURL = router.query.player;
    const team = router.query.team;

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
                        <Form.Label>Points Bet</Form.Label>
                        <Form.Control type="number" placeholder="Enter points bet" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Money Line Bet</Form.Label>
                        <Form.Control type="number" placeholder="Enter money line bet" />
                    </Form.Group>
                    {/* ... */}
                </Form>
            </Container>
        </>
    )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const player = context.query.player;

    if (typeof player !== 'string') {
        // Handle the error here. For example, you can return a 404 error.
        return {
            notFound: true,
        };
    }

    const playerStats = await prisma.playerStats.findFirst({
        where: {
            Player: player,
            YEAR: 2024,
        },
    });

    return {
        props: {
            playerStats,
        },
    };
};
