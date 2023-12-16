import Link from 'next/link';

export default function NotFound() {
	return (
		<div className="min-h-screen bg-primary-dark-200 flex flex-col items-center justify-center">
			<div className="sm:w-[400px] w-full flex flex-col items-center justify-center gap-[20px] text-center px-[20px]">
				<div>
					<span className="heading-4 font-spaceGrotesk !text-white text-opacity-40">
						404
					</span>
					<h2 className="heading-2">Page not found</h2>
				</div>
				<p className="text-base-3 !text-white">
					The page you are looking for might be removed or temporally
					unavailable
				</p>
				<Link href="/" className="btn-ghost !h-[45px] !px-[20px]">
					Return Home
				</Link>
			</div>
		</div>
	);
}
