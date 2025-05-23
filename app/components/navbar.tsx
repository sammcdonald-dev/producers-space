import { Form, NavLink } from "react-router";

type NavbarProps = {
	children: React.ReactNode;
	user?: {
		id: string;
		username: string;
	};
};

export default function Navbar({ children, user }: NavbarProps) {
	const categories = [
		"Music Production",
		"Beat Making",
		"Sound Design",
		"Mixing & Mastering",
		"Music Business",
		"Music Theory",
		"Vocal Production",
		"Sound Engineering",
		"Music Marketing",
	];
	const username = user?.username;
	return (
		<div className="drawer z-20 lg:drawer-open bg-base-100">
			<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col">
				<div className="navbar bg-base-200 sticky top-0 shadow-sm z-10">
					<div className="navbar-start">
						<label htmlFor="my-drawer-2" className="drawer-button lg:hidden">
							<div tabIndex={0} role="button" className="btn btn-ghost">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									{" "}
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h16M4 18h7"
									/>{" "}
								</svg>
							</div>
						</label>
					</div>

					<div className="navbar-center">
						<a className="" href="/">
							<img src="Logo.png" className="w-18 rounded-full lazy" />
						</a>
					</div>
					<div className="flex gap-2 navbar-end">
						{/* <input
						type="text"
						placeholder="Search"
						className="input input-bordered w-24 md:w-auto"
					/> */}
						{username && (
							<li className="text-sm btn-sm bg-base-300 btn">{username}</li>
						)}

						<div className="dropdown dropdown-end">
							<div
								tabIndex={0}
								role="button"
								className="btn btn-ghost btn-circle avatar"
							>
								<div className="w-10 rounded-full">
									<img
										alt="Tailwind CSS Navbar component"
										src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
									/>
								</div>
							</div>
							<ul
								tabIndex={0}
								className="menu menu-sm flex dropdown-content w-28 text-sm bg-base-100 rounded-box z-1 mt-3 p-2 shadow"
							>
								{username ? (
									<div>
										<li>
											<NavLink
												to={`/user/${username}`}
												className={({ isActive, isPending }) =>
													`text-sm flex ${
														isPending
															? "pending"
															: isActive
															? "bg-primary text-white"
															: ""
													}`
												}
											>
												profile
											</NavLink>
										</li>
										<li>
											<Form action="/logout" method="post">
												<button type="submit" className="text-sm text-red-500">
													logout
												</button>
											</Form>
										</li>
									</div>
								) : (
									<div>
										<li className="flex flex-nowrap">
											<Form action="/login" method="get">
												<button type="submit" className="text-sm">
													login
												</button>
											</Form>
										</li>
										<li className="flex flex-nowrap">
											<Form action="/join" method="get">
												<button
													type="submit"
													className="text-sm flex flex-nowrap"
												>
													sign up
												</button>
											</Form>
										</li>
									</div>
								)}
							</ul>
						</div>
					</div>
				</div>
				{/* Page content here */}
				{children}
			</div>
			<div className="drawer-side z-10 lg:shadow-lg">
				<label
					htmlFor="my-drawer-2"
					aria-label="close sidebar"
					className="drawer-overlay"
				></label>

				<ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
					{/* Sidebar content here */}
					<li>
						<input
							type="text"
							placeholder="Search"
							className="input input-bordered w-auto mb-3"
						/>
					</li>
					<li>
						<NavLink
							to="/"
							className={({ isActive, isPending }) =>
								isPending
									? "pending"
									: isActive
									? "bg-primary text-primary-content"
									: ""
							}
						>
							Home
						</NavLink>
					</li>

					<li>
						<a href="/about">Categories</a>
						<ul className="menu-sub">
							{categories.map((category) => (
								<li>
									<NavLink to={`/category/${category}`}># {category}</NavLink>
								</li>
							))}
						</ul>
					</li>
					<li>
						<a href="/about">About</a>
					</li>
				</ul>
			</div>
		</div>
	);
}
