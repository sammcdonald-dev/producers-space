import { Outlet, useLoaderData } from "react-router";
import GearIcon from "~/icons/gear";
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
		include: {
			user: {
				select: {
					id: true,
					username: true,
				},
			},
		},
	});
	console.log("User Posts:", posts);

	return { user, posts, sessionUserId };
}

type LoaderData = {
	user: {
		id: string;
		username: string;
		email: string;
		bio: string | null;
		image: string | null;
		createdAt: Date;
		longestStreak: number;
		currentStreak: number;
	};
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
	const userDate = user.createdAt.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	const data = { user, posts, sessionUserId };

	return (
		<div className="mx-auto">
			<div className="flex flex-col gap-4 m-4">
				<div className="flex flex-row gap-4">
					<img
						src={
							user.image ??
							"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
						}
						className="rounded-full size-18"
					/>
					<div className="w-full">
						<div className="flex justify-between">
							<h1 className="text-xl">{username}</h1>
							{user.id === sessionUserId && (
								<div className="dropdown dropdown-end">
									<GearIcon
										tabIndex={0}
										className="size-6 my-auto"
										role="button"
									/>
									<ul
										tabIndex={0}
										className="menu menu-sm dropdown-content text-sm bg-base-100 w-22 rounded-box z-1 mt-3 flex p-2 shadow"
									>
										<li className="flex">edit profile</li>
									</ul>
								</div>
							)}
						</div>
						<p>joined: {userDate}</p>
						<p>longest streak: {user.longestStreak}</p>
					</div>
				</div>
				<div className="flex gap-2">
					{user.id === sessionUserId && user.bio === null && (
						<p>bio: fill in your bio!</p>
					)}
					<p className="">{user.bio}</p>
				</div>
			</div>
			<Outlet context={data} />
		</div>
	);
}
