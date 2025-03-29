import { NavLink } from "react-router";

export default function Navbar() {
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
	return (
		<div className="navbar bg-base-100 shadow-sm">
			<div className="navbar-start">
				{/* <div className="dropdown">
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
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content bg-base-100 z-1 mt-3 w-52 p-2 shadow"
					>
						<li>
							<a>Homepage</a>
						</li>
						<li>
							<a>Portfolio</a>
						</li>
						<li>
							<a>About</a>
						</li>
					</ul>
				</div> */}
				<div className="drawer">
					<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
					<div className="drawer-content flex flex-col">
						{/* Page content here */}
						<label htmlFor="my-drawer-2" className="drawer-button">
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
					<div className="drawer-side">
						<label
							htmlFor="my-drawer-2"
							aria-label="close sidebar"
							className="drawer-overlay"
						></label>
						<input
							type="text"
							placeholder="Search"
							className="input input-bordered w-24 md:w-auto"
						/>
						<ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
							{/* Sidebar content here */}
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
											<NavLink to={`/category/${category}`}>
												# {category}
											</NavLink>
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
			</div>
			<div className="navbar-center">
				<a className="" href="/">
					<img src="Logo.png" className="w-18 rounded-full" />
				</a>
			</div>
			<div className="flex gap-2 navbar-end">
				{/* <input
					type="text"
					placeholder="Search"
					className="input input-bordered w-24 md:w-auto"
				/> */}
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
						className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
					>
						<li>
							<a className="justify-between">
								Profile
								<span className="badge">New</span>
							</a>
						</li>
						<li>
							<a>Settings</a>
						</li>
						<li>
							<a>Logout</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
