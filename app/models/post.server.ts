import prisma from "~/lib/prisma";
import type { Post } from "@prisma/client";

export type { Post } from "@prisma/client";

export async function getPostById(id: Post["id"]) {
	return prisma.post.findUnique({ where: { id } });
}

export async function createPost(userId: string, title: string, body: string) {
	console.log("Creating post for userId:", userId); // Debugging log
	const userExists = await prisma.user.findUnique({ where: { id: userId } });
	if (!userExists) {
		throw new Error("User not found");
	}
	return prisma.post.create({
		data: {
			title: title,
			body: body,
			user: {
				connect: { id: userId },
			},
		},
	});
}
