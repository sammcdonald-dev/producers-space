import prisma from "~/lib/prisma";
import { getSession } from "~/session.server";
import type { Route } from "./+types";
import Comment from "~/components/comment";

export async function loader({
	request,
	params,
}: {
	request: Request;
	params: { postId: string };
}) {
	const session = await getSession(request);
	const sessionUserId = session.get("userId");
	const { postId } = params;
	const comments = await prisma.comment.findMany({
		orderBy: { createdAt: "desc" },
		where: {
			postId: postId,
		},
		include: {
			user: {
				select: {
					id: true,
					username: true,
				},
			},
		},
	});

	console.log("comments", comments);

	return { comments, sessionUserId };
}

export default function PostComments({ loaderData }: Route.ComponentProps) {
	const { comments, sessionUserId } = loaderData;
	return (
		<div
			className="card p-4 card-border border-base-300 bg-base-200 mx-auto w-sm md:w-lg 
			lg:w-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
		>
			<h2 className="card-title p-2">Comments</h2>
			{comments.map((comment) => (
				<Comment comment={comment} />
			))}
		</div>
	);
}
