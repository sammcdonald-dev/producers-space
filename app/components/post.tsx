import { useState } from "react";
import { Form } from "react-router";

type PostProps = {
	post: {
		id: string;
		title: string;
		body: string;
		userId: string;
	};
	sessionUserId: string;
};

export default function Post({ post, sessionUserId }: PostProps) {
	const [isEditing, setIsEditing] = useState(false);

	return (
		<div key={post.id} className="card card-border bg-base-200 w-96 shadow-lg">
			{isEditing ? (
				<Form action="/editPost" method="post">
					<div className="card-body">
						<input className="card-title">{post.title}</input>
						<textarea>{post.body}</textarea>
						<div className="card-actions justify-end">
							<button className="btn btn-primary">save</button>
						</div>
					</div>
				</Form>
			) : (
				<a href={`/post/${post.id}`}>
					<div className="card-body">
						<h2 className="card-title">{post.title}</h2>
						{sessionUserId === post.userId && (
							<Form action="/deletePost" method="post">
								<input type="hidden" name="postId" value={post.id} />
								<button
									type="submit"
									className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
								>
									delete
								</button>
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
