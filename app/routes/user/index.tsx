import { useOutletContext } from "react-router";
import Post from "~/components/postCard";

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
			<ol className="space-y-4">
				{posts.map((post: PostType) => (
					<Post key={post.id} post={post} sessionUserId={sessionUserId} /> // Assuming Post component is imported
				))}
			</ol>
		</div>
	);
}
