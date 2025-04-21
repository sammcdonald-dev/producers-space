import { useLoaderData } from "react-router";
import PostCard from "~/components/postCard";
import prisma from "~/lib/prisma";
import { getUserById } from "~/models/user.server";
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
	const id = postId;
	console.log(postId);
	const post = await prisma.post.findUnique({
		where: { id },
		include: {
			user: {
				select: {
					id: true,
					username: true,
				},
			},
		},
	});
	if (!post) {
		throw new Response("Post not found", { status: 404 });
	}
	console.log(post.userId);
	const user = await getUserById(post.userId);

	return { post, sessionUserId };
}

type PostProps = {
	post: {
		link: string | null;
		id: string;
		title: string;
		body: string;
		createdAt: Date;
		updatedAt: Date;
		upVotes: number;
		downVotes: number;
		userId: string;
		user: {
			id: any;
			username: any;
		};
	};
	sessionUserId: any;
};

export default function postPage({ params }: { params: { postId: string } }) {
	const { postId } = params;
	const { post, sessionUserId } = useLoaderData<PostProps>();
	return (
		<div>
			<PostCard post={post} sessionUserId={sessionUserId} />
		</div>
	);
}
