import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Landing from "../landing/landing";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Producers Space" },
		{ name: "description", content: "Welcome to Producers Space" },
	];
}

export default function Index() {
	return <Landing />;
}
