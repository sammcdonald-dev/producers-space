import { useEffect, useRef, useState } from "react";
import { Form, Link } from "react-router";
import EllipsesIcon from "~/icons/ellipses";

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

export default function Post({ post, sessionUserId }: PostProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState(post.title);
	const [body, setBody] = useState(post.body);
	const [link, setLink] = useState(post.link);

	const titleInputRef = useRef<HTMLInputElement>(null);

	const postUserId = post.userId;

	// Focus the title input when entering edit mode
	useEffect(() => {
		if (isEditing && titleInputRef.current) {
			titleInputRef.current.focus();
		}
	}, [isEditing]);

	return (
		<div
			key={post.id}
			className="card card-border border-base-300 bg-base-200 mx-auto w-sm md:w-lg lg:w-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
		>
			{isEditing ? (
				<Form
					action="/editPost"
					method="put"
					onSubmit={() => setIsEditing(false)}
				>
					<input type="hidden" name="postId" value={post.id} />
					<div className="card-body">
						<input
							// ref={titleInputRef}
							autoFocus={true}
							className={`card-title ${isEditing ? "input-focused" : ""}`}
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							name="title"
						/>
						<textarea
							className=""
							value={body}
							onChange={(e) => setBody(e.target.value)}
							name="body"
						/>
						<div className="card-actions justify-end">
							<button type="submit" className="btn btn-primary">
								save
							</button>
							<button
								className="btn text-white bg-black"
								onClick={() => setIsEditing(false)}
							>
								cancel
							</button>
						</div>
					</div>
				</Form>
			) : (
				// href={`/post/${post.id}`}
				<a>
					<div className="card-body">
						<div className="flex justify-between card-actions">
							<Link to={`/user/${post.user.username}`}>
								<h3 className=" underline-offset-2 underline text-black/40 hover:text-black/80 dark:text-white/40 hover:dark:text-white/80">
									{post.user.username}
								</h3>
							</Link>
							{sessionUserId === post.userId && (
								<Form action="/deletePost" method="post">
									<input type="hidden" name="postId" value={post.id} />
									<div className="dropdown dropdown-end">
										<EllipsesIcon className="size-6 -m-1" tabIndex={0} />
										<ul
											tabIndex={0}
											className="dropdown-content menu bg-base-100 rounded-box z-1 w-24 shadow-sm"
										>
											<li>
												<button onClick={() => setIsEditing(true)}>edit</button>
											</li>
											<li>
												<button type="submit" className=" text-red-500">
													delete
												</button>
											</li>
										</ul>
									</div>
								</Form>
							)}
						</div>
						<Link to={`/${post.id}`}>
							<h2 className="card-title hover:underline">{post.title}</h2>
						</Link>

						<p className="line-clamp-5">{post.body}</p>
						<div className="card-actions justify-end">
							<button className="btn btn-primary">reply</button>
						</div>
					</div>
				</a>
			)}
		</div>
	);
}
