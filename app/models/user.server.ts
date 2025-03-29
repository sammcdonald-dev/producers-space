import type { User } from "@prisma/client";
import prisma from "~/lib/prisma";

export async function getUserById(id: User["id"]) {
	return prisma.user.findUnique({ where: { id } });
}
