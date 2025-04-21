import { useEffect, useRef } from "react";
import { Form, redirect, useActionData } from "react-router";
import { createPost } from "~/models/post.server";
import { getUserId, requireUserId } from "~/session.server";

export const loader = async ({ request }: { request: Request }) => {
	const userId = await getUserId(request);
	if (!userId) return redirect("/login");
};

export const action = async ({ request }: { request: Request }) => {
	const userId = await requireUserId(request);
	if (!userId) {
		return redirect("/login");
	}
	//console.log("userId", userId);
	const formData = await request.formData();
	const title = formData.get("title");
	const body = formData.get("body");

	if (!title || typeof title !== "string") {
		return { error: "Title is required" };
	}
	if (!body || typeof body !== "string") {
		return { error: "Body is required" };
	}

	const post = await createPost(userId, title, body);
	if (!post) {
		return { error: "Post creation failed" };
	}
	return redirect("/");
};

export default function NewPost({}) {
	const actionData = useActionData<typeof action>();
	const titleRef = useRef<HTMLInputElement>(null);
	const bodyRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (actionData?.error === "Title is required") {
			titleRef.current?.focus();
		} else if (actionData?.error === "Body is required") {
			bodyRef.current?.focus();
		}
	}, [actionData]);

	return (
		<Form method="post" className="flex flex-col gap-4">
			<input name="title" ref={titleRef} placeholder="title of post" required />
			<textarea
				name="body"
				ref={bodyRef}
				placeholder="content of post"
				required
			/>
			<button type="submit" className="bg-blue-500 text-white p-2 rounded">
				Create Post
			</button>
		</Form>
	);
}
