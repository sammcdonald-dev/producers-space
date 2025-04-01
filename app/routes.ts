import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("login", "routes/login.tsx"),
	route("join", "routes/join.tsx"),
	route("logout", "routes/logout.tsx"),
	route("newPost", "routes/newPost.tsx"),
	route("editPost", "routes/editPost.tsx"),
	route("deletePost", "routes/deletePost.tsx"),
] satisfies RouteConfig;
