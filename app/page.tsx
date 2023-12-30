import { prisma } from "@/lib/prisma";

export default async function Homer() {
  const players = await prisma.PlayerStats.findMany({
    where : {
      Player: "Precious Achiuwa"
    }
  });

  return (
    <div>
      {players.map((player, index) => (
        <div key={index}>
          <p>{player.Player}</p>
          <p>{player.Pos}</p>
          {/* Add more fields as needed */}
        </div>
      ))}
    </div>
  );
}