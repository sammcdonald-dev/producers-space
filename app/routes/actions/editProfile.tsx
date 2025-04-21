import { redirect, type ActionFunctionArgs } from "react-router";
import { updateUser } from "~/models/user.server";
import { getSession } from "~/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
	const session = await getSession(request);
	const userId = session.get("userId");
	const formData = await request.formData();

	const username = formData.get("username");
	const bio = formData.get("bio");

	if (!username || typeof username !== "string") {
		throw new Error("invalid username");
	}
	if (!bio || typeof bio !== "string") {
		throw new Error("Invalid bio");
	}

	await updateUser(userId, username, bio);

	return redirect(`/user/${username}`);
};
