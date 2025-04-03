import { Outlet, useLoaderData } from "react-router";
import prisma from "~/lib/prisma";
import { getSession } from "~/session.server";

export async function loader({
	request,
	params,
}: {
	request: Request;
	params: { username: string };
}) {
	const session = await getSession(request);
	const sessionUserId = session.get("userId");

	// Retrieve the username from the route params
	const { username } = params;

	if (!username) {
		throw new Response("Username is required", { status: 400 });
	}

	// Fetch the user by username
	const user = await prisma.user.findUnique({
		where: { username },
	});

	if (!user) {
		throw new Response("User not found", { status: 404 });
	}
	console.log("User:", user.username);

	// Fetch posts for the user
	const posts = await prisma.post.findMany({
		where: { userId: user.id },
	});
	console.log("User Posts:", posts);

	return { user, posts, sessionUserId };
}

type LoaderData = {
	user: { id: string; username: string };
	posts: { id: string; title: string }[];
	sessionUserId: string | null;
};

export default function UserLayout({
	params,
}: {
	params: { username: string };
}) {
	const { username } = params;

	const { user, posts, sessionUserId } = useLoaderData<LoaderData>();
	const data = { user, posts, sessionUserId };

	return (
		<div>
			<h1>Welcome, {username}!</h1>
			<Outlet context={data} />
		</div>
	);
}
