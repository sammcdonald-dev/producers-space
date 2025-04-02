import { redirect, type ActionFunctionArgs } from "react-router";
import { updatePost } from "~/models/post.server";
import { getSession } from "~/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
	const session = await getSession(request);
	const userId = session.get("userId");
	const formData = await request.formData();

	// get data
	const postId = formData.get("postId");
	const title = formData.get("title");
	const body = formData.get("body");

	//check if postId is a string
	if (!postId || typeof postId !== "string") {
		throw new Error("invalid postId");
	}
	if (!postId || typeof postId !== "string") {
		throw new Error("Invalid postId");
	}

	// Validate title, body, and link
	if (!title || typeof title !== "string") {
		throw new Error("Invalid title");
	}
	if (!body || typeof body !== "string") {
		throw new Error("Invalid body");
	}

	await updatePost(userId, postId, title, body);
};

export const loader = async () => redirect("/");
