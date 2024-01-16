import Navbar from '@/components/Navbar'
import React from 'react'
import { Form, Button, Container, Row } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { prisma } from '@/lib/prisma'
import Select from 'react-select';
import { useState, useEffect } from 'react';
import { count } from 'console'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

export default function Bets({ playerStats, teams, gameStats }: Props) {
    const router = useRouter();
    const playerURL = router.query.player;
    const team = router.query.team;
    const [selectedTeam, setSelectedTeam] = useState('');
    const [filteredGameStats, setFilteredGameStats] = useState([]);
    const [playerName, setPlayerName] = useState('');
    const [opposingTeam, setopposingTeam] = useState('');
    const [propLine , setPropLine] = useState('');
    const [betType, setBetType] = useState('');
    const [propType, setPropType] = useState('');
    const [selectedStat, setSelectedStat] = useState(null);
    const [resLength , setResLength] = useState(0);
    const [resLengthPlayer , setResLengthPlayer] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [resLengthPlayerTeam , setResLengthPlayerTeam] = useState(0);
    const defaultOptions = teams.map(team => ({
        value: team,
        label: team,
      }));

      const handleInputChange = (newValue) => {
        const inputValue = newValue.replace(/\W/g, '');
        return inputValue;
      };
    useEffect(() => {
        const playerStats = filteredGameStats.filter(stat => stat.PLAYER === playerName);
        setResLength(playerStats.length);
        console.log("RESULTS LENGTH"+ resLength);
    }, [filteredGameStats, playerName]);

      const handleSubmit = async (event) => {
        setIsSubmitted(true);
        event.preventDefault();
        let count = 0;
        let teamCount = 0;
            const propLineValue = Number(propLine);
            const filteredStats = gameStats.filter(stat => {
                switch (betType) {
                    case 'over':
                        if (stat.PLAYER == playerName) {
                            count+=1;
                        }
                        if(stat.MATCH_UP == opposingTeam && stat.PLAYER == playerName) {
                            teamCount+=1;
                        }
                        return stat.PLAYER == playerName &&
                                     stat.TEAM == selectedTeam &&
                                     (!opposingTeam || stat.MATCH_UP == opposingTeam) &&
                                     stat[propType] > propLineValue;
                    case 'under':
                        if (stat.PLAYER == playerName) {
                            count+=1;

                        }
                        return stat.PLAYER == playerName &&
                                     stat.TEAM == selectedTeam &&
                                     (!opposingTeam || stat.MATCH_UP == opposingTeam) &&
                                     stat[propType] < propLineValue;
                    default:
                        return false;
                }
            });

        setFilteredGameStats(filteredStats);
        setResLengthPlayer(count);
        setResLengthPlayerTeam(teamCount);
        console.log(gameStats.slice(0, 10));
        console.log(playerName)
        console.log(selectedTeam)
        console.log(opposingTeam)
        console.log(propLine)
        console.log(betType)
        console.log(propType)
        console.log("RESULTS" + filteredStats.map(fs => JSON.stringify(fs)).join('\n'));
        console.log("RESULTS LENGTH PLAYER"+ resLengthPlayer);

    };

    
      useEffect(() => {
        if (playerStats?.Tm) {
          setSelectedTeam(playerStats.Tm);
        }
    
        if (playerStats?.Player) {
          setPlayerName(playerStats.Player);
        }
      }, []);

      const handleStatChange = (selectedOption) => {
        setSelectedStat(selectedOption.value);
      };
    return (
        <>
            <Navbar />
            <Container>
                <Row><br></br></Row>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Team</Form.Label>
                        <Form.Control type="text" placeholder="Enter team" onChange={(e)=>setSelectedTeam(e.target.value)}defaultValue={playerStats?.Tm} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Player</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Enter player" 
                        onChange={(e) => setPlayerName(e.target.value)} 
                        defaultValue={playerStats?.Player} 
                        />                    
                        </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Player Prop</Form.Label>
                        <Form.Select onChange={(e) => setPropType(e.target.value)}>
                            <option>Select player prop</option>
                            <option value="PTS">Points</option>
                            <option value="REB">Rebounds</option>
                            <option value="AST">Assists</option>
                            <option value="3P">3 Points Made</option>

                            {/* Add more options as needed */}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
            <Form.Label>Opposing Team</Form.Label>
            <Select 
                options={defaultOptions}
                onChange={(selectedOption) => {
                    if (selectedOption) {
                        setopposingTeam(selectedOption.value);
                    } else {
                        setopposingTeam('');
                    }
                }}            />
            </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Prop Line Bet</Form.Label>
                        <Form.Control type="number" placeholder="Enter Prop Value" onChange={(e) => setPropLine(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Bet Type</Form.Label>
                        <Form.Select onChange={(e) => setBetType(e.target.value)}>
                            <option>Over/Under</option>
                            <option value="over">Over</option>
                            <option value="under">Under</option>
                            {}
                        </Form.Select>
                    </Form.Group>
                    <Button type="submit">Calculate</Button>
                    <Row><br></br></Row>
                    {isSubmitted && ( 
                        <div>
                            <h2>Results</h2>

                            {opposingTeam !== '' ? (
                                <p>{playerName} has played {resLengthPlayerTeam} games this season against {opposingTeam} and done this in {resLength} of them ({resLength} / {resLengthPlayerTeam})</p>
                                ) : (
                                <p>{playerName} has played {resLengthPlayer} games this season and done this in {resLength} of them ({resLength} / {resLengthPlayer})</p>
                                )}
                        </div>
                    )}
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
    let gameStats = await prisma.gameStats.findMany();

    // Convert Date objects to strings
    gameStats = gameStats.map(stat => ({
      ...stat,
      GAME_DATE: stat.GAME_DATE.toISOString(),
    }));
    await prisma.$disconnect();

    return {
        props: {
            playerStats,
            teams,
            gameStats,
        },
    };
};
