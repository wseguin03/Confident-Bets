
// // import { useState, useEffect } from 'react';
// // import { Card, CardGroup, Container, Row, Col, Form } from 'react-bootstrap';
// // import Navbar from '../../components/Navbar';
// // import { prisma } from "@/lib/prisma";

import { prisma } from "@/lib/prisma"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { Infer } from "next/dist/compiled/superstruct"

// // export default async function Homer() {
// //   const players = await prisma.playerStats.findMany({
// //     where : {
// //       Player: "Precious Achiuwa"
// //     }
// //   });

// // return (
// //   <div>
// //     <Navbar />
// //     {players.map((player, index) => (
// //       <div key={index}>
// //         <p>{player.Player}</p>
// //         <p>{player.Pos}</p>
// //         {/* Add more fields as needed */}
// //       </div>
// //     ))}  
// //   </div>
// // );

// type Props = InferGetServerSidePropsType<typeof getServerSideProps>
// export default function Players(){
//   return (
//     <div>
//       <h1>Players</h1>
//     </div>
//   )
// }

// export const getServerSideProps: GetServerSideProps= async (context) => {
//   const players = await prisma.playerStats.findMany({
//     where : {
//       Player: "Precious Achiuwa"
//     }
//   })
//   return {
//     props: {
//       players,
//     },
//   }
// }