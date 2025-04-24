import prisma from "~/lib/prisma";
import { getSession } from "~/session.server";

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
		where: {
			postId: postId,
		},
		select: {
			id: true,
			createdAt: true,
			userId: true,
			postId: true,
			user: {
				select: {
					id: true,
					username: true,
				},
			},
		},
	});

	return { comments, sessionUserId };
}

export default function PostComments({
	comments,
	sessionUserId,
}: {
	comments: Array<{
		id: string;
		createdAt: string;
		userId: string;
		postId: string;
		user: {
			id: string;
			username: string;
		};
		body?: string;
	}>;
	sessionUserId: string;
}) {
	return (
		<div className="card card-border border-base-300 bg-base-200 mx-auto w-sm md:w-lg lg:w-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
			<div className="card-body">
				<h2 className="card-title">Comments</h2>
				<p>Comments will be here</p>
				{comments &&
					comments.length >= 1 &&
					comments.map((comment) => (
						<div
							key={comment.id}
							className="card card-bordered bg-base-100 shadow-sm mb-2"
						>
							<div className="card-body">
								<h3 className="card-title">{comment.user.username}</h3>
								<p>{comment.body}</p>
							</div>
						</div>
					))}
			</div>
		</div>
	);
}
