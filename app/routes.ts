import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("login", "routes/auth/login.tsx"),
	route("join", "routes/auth/join.tsx"),
	route("logout", "routes/auth/logout.tsx"),
	route("newPost", "routes/actions/newPost.tsx"),
	route("editPost", "routes/actions/editPost.tsx"),
	route("deletePost", "routes/actions/deletePost.tsx"),
] satisfies RouteConfig;
