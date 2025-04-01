import { redirect, type ActionFunctionArgs } from "react-router";
import { deletePost } from "~/models/post.server";

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const postId = formData.get("postId");
	//check if postId is a string
	if (!postId || typeof postId !== "string") {
		throw new Error("invalid postId");
	}

	await deletePost(postId);
};

export const loader = async () => redirect("/");
