import { useRef, useState } from "react";
import { Form } from "react-router";
import GearIcon from "~/icons/gear";

type UserData = {
	user: {
		id: string;
		username: string;
		email: string;
		bio: string;
		image: string | null;
		createdAt: Date;
		longestStreak: number;
		currentStreak: number;
	};
	sessionUserId: string | null;
};

export default function Profile({ user, sessionUserId }: UserData) {
	const userDate = user.createdAt.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	const [isEditing, setIsEditing] = useState(false);
	const [username, setUsername] = useState(user.username);
	const [userImage, setUserImage] = useState(user.image);
	const [bio, setBio] = useState(user.bio);
	const userInputRef = useRef(null);

	return (
		<div className="flex flex-col gap-4 m-4">
			{isEditing ? (
				<Form
					action="/editProfile"
					method="put"
					onSubmit={() => setIsEditing(false)}
				>
					<input className="hidden" value={user.id} name="userId" />
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
								<input
									ref={userInputRef}
									className={`card-title ${isEditing ? "input-focused" : ""}`}
									value={username}
									name="username"
									onChange={(e) => setUsername(e.target.value)}
								/>
								{user.id === sessionUserId && (
									<div className="dropdown dropdown-end">
										<GearIcon
											tabIndex={0}
											className="size-6 my-auto"
											role="button"
										/>
										<ul
											tabIndex={0}
											className="menu menu-sm dropdown-content text-sm bg-base-100 w-22 rounded-box z-1 mt-1 flex p-2 shadow"
										>
											<li className="flex">
												<button type="submit">save</button>
											</li>
											<li>
												<button onClick={() => setIsEditing(false)}>
													cancel
												</button>
											</li>
										</ul>
									</div>
								)}
							</div>
							<p>joined: {userDate}</p>
							<p>longest streak: {user.longestStreak}</p>
						</div>
					</div>
					<div className="flex gap-2">
						<textarea
							className=""
							value={bio}
							name="bio"
							onChange={(e) => setBio(e.target.value)}
						/>
					</div>
				</Form>
			) : (
				<>
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
								<h1 className="text-xl">{user.username}</h1>
								{user.id === sessionUserId && (
									<div className="dropdown dropdown-end">
										<GearIcon
											tabIndex={0}
											className="size-6 my-auto"
											role="button"
										/>
										<ul
											tabIndex={0}
											className="menu menu-sm dropdown-content text-sm bg-base-100 w-26 rounded-box z-1 mt-1 flex p-2 shadow"
										>
											<li className="flex">
												<button
													className=" flex"
													onClick={() => setIsEditing(true)}
												>
													edit profile
												</button>
											</li>
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
				</>
			)}
		</div>
	);
}
