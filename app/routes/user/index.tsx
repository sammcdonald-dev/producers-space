import { useOutletContext } from "react-router";
import Post from "~/components/post";

type ContextType = {
	user: any | null;
	posts: any | null;
	sessionUserId: string | null;
};
type PostType = {
	id: string;
	title: string;
	body: string;
	createdAt: Date;
	updatedAt: Date;
	link: string | null;
	upVotes: number;
	downVotes: number;
	userId: string;
	user: {
		id: any;
		username: any;
	};
};

export default function UserProfile() {
	// Access the parent route's loader data

	// if (!loaderData) {
	// 	return <p>Loading...</p>; // Handle null or undefined loader data
	// }

	const { user, posts, sessionUserId } = useOutletContext<ContextType>();

	return (
		<div>
			<h1>User Profile</h1>
			<h2>Session User ID: {sessionUserId}</h2>
			<ol>
				{posts.map((post: PostType) => (
					<Post key={post.id} post={post} sessionUserId={sessionUserId} /> // Assuming Post component is imported
				))}
			</ol>
		</div>
	);
}
