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
	return { users };
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const { users } = loaderData;
	return (
		<div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
			<h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
				Superblog
			</h1>
			<ol className="list-decimal list-inside font-[family-name:var(--font-geist-sans)] text-[#333333]">
				{users.map((user) => (
					<li key={user.id} className="mb-2">
						{user.username}
					</li>
				))}
			</ol>
		</div>
	);
}
