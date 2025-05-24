export default function Comment({ comment }: { comment: any }) {
	return (
		<div
			key={comment.id}
			className="card card-bordered bg-base-100 mb-2 shadow-sm 
					hover:shadow-xl transition-all duration-300 ease-in-out"
		>
			<div className="card-body">
				<h3
					className="underline-offset-2 underline text-black/40 
						hover:text-black/80 dark:text-white/40 hover:dark:text-white/80"
				>
					{comment.user.username}
				</h3>
				<p>{comment.text}</p>
			</div>
		</div>
	);
}
