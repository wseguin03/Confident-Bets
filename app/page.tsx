import Navbar from "../components/Navbar";
import { prisma } from "@/lib/prisma";
import React from 'react';
import '../components/MainPage.css'
export default async function Home() {
  return (
    <main>
      <Navbar />
     <body>

     </body>
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