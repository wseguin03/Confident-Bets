import { Button, Col, Container, Row } from 'react-bootstrap';
import Navbar from "../components/Navbar";
import '../styles/MainPage.css';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Container className="h-100 d-flex align-items-center justify-content-center mt-5">
        <Row className="mt-5">
          <Col>
            <div className="text-center p-5 border bg-white">
              <h1 className="mb-4">Welcome to NBA-Central</h1>
              <p className="mb-4">Gain Information on bets before placing them</p>
              <Button href='/player' variant="primary">Start here</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
// const players = await prisma.PlayerStats.findMany({
//   where : {
//     Player: "Precious Achiuwa"
//   }
// });

// return (
//   <div>
//     {players.map((player, index) => (
//       <div key={index}>
//         <p>{player.Player}</p>
//         <p>{player.Pos}</p>
//         {/* Add more fields as needed */}
//       </div>
//     ))}
//   </div>
// );