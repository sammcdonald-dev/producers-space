import { useRef } from "react";
import { Form, redirect, useActionData } from "react-router";
import { createComment } from "~/models/comment.server";
import { getPostById } from "~/models/post.server";
import { getSession, getUserId, requireUserId } from "~/session.server";

export const loader = async ({
	request,
	params,
}: {
	request: Request;
	params: { postId: string };
}) => {
	const userId = await getUserId(request);
	const session = await getSession(request);
	const sessionUserId = session.get("userId");

	if (!userId) return redirect("/login");
	return { userId, sessionUserId, postId: params.postId };
};

export const action = async ({
	request,
	params,
}: {
	request: Request;
	params: { postId: string };
}) => {
	const userId = await requireUserId(request);
	if (!userId) {
		return redirect("/login");
	}
	const url = new URL(request.url);
	const pathSegments = url.pathname.split("/").filter(Boolean);
	const postId = pathSegments[pathSegments.length - 2];
	console.log("postId", postId);
	if (!postId) {
		throw new Error("Post ID not found");
	}
	const post = await getPostById(postId);

	const formData = await request.formData();
	const text = formData.get("text");
	if (typeof text !== "string") {
		throw new Error("Invalid form data: text must be a string");
	}

	const comment = await createComment(userId, postId, text);
	return redirect(`/${postId}`);
};

export default function NewComment({}) {
	const actionData = useActionData<typeof action>();
	const bodyRef = useRef<HTMLTextAreaElement>(null);

	return (
		<div
			className="card card-border border-base-300 bg-base-200 mx-auto w-sm 
            md:w-lg lg:w-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
		>
			<Form method="post" className="flex flex-col gap-4 ">
				<div className="card-body">
					<input
						className="card-title"
						name="text"
						placeholder="body of comment"
						required
					/>
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</div>
			</Form>
		</div>
	);
}
