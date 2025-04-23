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
		<div
			className="card card-border border-base-300 bg-base-200 mx-auto w-sm 
			md:w-lg lg:w-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
		>
			<Form method="post" className="flex flex-col gap-4 ">
				<div className="card-body">
					<input
						className="card-title"
						name="title"
						ref={titleRef}
						placeholder="title of post"
						required
					/>
					<textarea
						name="body"
						className="h-32"
						ref={bodyRef}
						placeholder="content of post"
						required
					/>
					<button type="submit" className="bg-blue-500 text-white p-2 rounded">
						Create Post
					</button>
				</div>
			</Form>
		</div>
	);
}
