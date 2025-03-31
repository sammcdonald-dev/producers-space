import { Form } from "react-router";
import type { Route } from "./+types/home";
import prisma from "~/lib/prisma";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export async function loader() {
	const users = await prisma.user.findMany();
	const posts = await prisma.post.findMany();
	return { users, posts };
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const { users, posts } = loaderData;
	return (
		<div className="min-h-screen bg-base-100 flex flex-col items-center justify-center">
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
			<ol className="space-y-4">
				{posts.map((post) => (
					<div
						key={post.id}
						className="card card-border bg-base-200 w-96 shadow-xl"
					>
						<a href={`/post/${post.id}`}>
							<div className="card-body">
								<h2 className="card-title">{post.title}</h2>
								<p>{post.body}</p>
								<div className="card-actions justify-end">
									<button className="btn btn-primary">reply</button>
								</div>
							</div>
						</a>
					</div>
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
