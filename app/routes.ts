import {
	type RouteConfig,
	index,
	layout,
	route,
} from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("login", "routes/auth/login.tsx"),
	route("join", "routes/auth/join.tsx"),
	route("logout", "routes/auth/logout.tsx"),
	route("newPost", "routes/actions/newPost.tsx"),
	route("editPost", "routes/actions/editPost.tsx"),
	route("deletePost", "routes/actions/deletePost.tsx"),
	route("editProfile", "routes/actions/editProfile.tsx"),

	route(":postId", "routes/post.tsx"),

	layout("routes/user/layout.tsx", [
		route("/user/:username", "routes/user/index.tsx"),
	]),
] satisfies RouteConfig;
