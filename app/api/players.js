// pages/api/players.js
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
    const { year } = req.query;
    const players = await prisma.PlayerStats.findMany({
        where: {
            year: Number(year)
        }
    });
    res.json(players);
}