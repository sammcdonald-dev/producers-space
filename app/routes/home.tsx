import { Form } from "react-router";
import type { Route } from "./+types/home";
import prisma from "~/lib/prisma";
import { getSession } from "~/session.server";
import Post from "~/components/post";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export async function loader({ request }: { request: Request }) {
	const session = await getSession(request);
	const sessionUserId = session.get("userId");
	const users = await prisma.user.findMany();
	const posts = await prisma.post.findMany();
	return { users, posts, sessionUserId, session };
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const { users, posts, sessionUserId } = loaderData;

	return (
		<div className="min-h-screen flex flex-col items-center justify-center">
			{/* <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
				Superblog
			</h1>
			<ol className="list-decimal list-inside font-[family-name:var(--font-geist-sans)] text-[#333333]">
				{users.map((user) => (
					<li key={user.id} className="mb-2">
						{user.username}
					</li>
				))}
			</ol> */}
			<ol className="space-y-5 mt-5">
				{posts.map((post) => (
					<Post key={post.id} post={post} sessionUserId={sessionUserId} /> // Assuming Post component is imported
				))}
			</ol>
			<button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
				<a href="/newPost">Make A New Post</a>
			</button>

			<Form action="/logout" method="post">
				<button
					type="submit"
					className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
				>
					Logout
				</button>
			</Form>
		</div>
	);
}
