import { useEffect, useRef, useState } from "react";
import { Form } from "react-router";
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
	};
	sessionUserId: string;
};

export default function Post({ post, sessionUserId }: PostProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState(post.title);
	const [body, setBody] = useState(post.body);
	const [link, setLink] = useState(post.link);

	const titleInputRef = useRef<HTMLInputElement>(null);

	// Focus the title input when entering edit mode
	useEffect(() => {
		if (isEditing && titleInputRef.current) {
			titleInputRef.current.focus();
		}
	}, [isEditing]);

	return (
		<div key={post.id} className="card card-border bg-base-200 w-96 shadow-lg">
			{isEditing ? (
				<Form
					action="/editPost"
					method="put"
					onSubmit={() => setIsEditing(false)}
				>
					<input type="hidden" name="postId" value={post.id} />
					<div className="card-body">
						<input
							ref={titleInputRef}
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
						{sessionUserId === post.userId && (
							<Form
								action="/deletePost"
								method="post"
								className="flex flex-row justify-between"
							>
								<h2 className="card-title">{post.title}</h2>
								<input type="hidden" name="postId" value={post.id} />
								<div className="dropdown dropdown-end">
									<EllipsesIcon />
									<ul
										tabIndex={0}
										className="dropdown-content menu bg-base-100 rounded-box z-1 w-24 p-2 shadow-sm"
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

						<p>{post.body}</p>
						<div className="card-actions justify-end">
							<button className="btn btn-primary">reply</button>
						</div>
					</div>
				</a>
			)}
		</div>
	);
}
