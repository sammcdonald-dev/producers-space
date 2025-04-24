import prisma from "~/lib/prisma";

export async function createComment(
	userId: string,
	postId: string,
	text: string
) {
	return prisma.comment.create({
		data: {
			text,
			user: {
				connect: { id: userId },
			},
			post: {
				connect: { id: postId },
			},
		},
	});
}
