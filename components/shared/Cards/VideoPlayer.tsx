'use client';
import { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
type VideoPlayerProps = {
	url: string;
	className: string;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, className }) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const playerRef = useRef<ReactPlayer>(null);

	const handleMouseEnter = () => {
		if (!isPlaying && playerRef.current) {
			setIsPlaying(true);
			playerRef.current.seekTo(0);
		}
	};
	const handleMouseLeave = () => {
		if (isPlaying && playerRef.current) {
			setIsPlaying(false);
			playerRef.current.seekTo(0);
		}
	};

	return (
		<div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<ReactPlayer
				className={`${
					className.length > 0
						? className
						: '!h-[220px] !w-[100%] border bg-white border-admin-gray-dark rounded-md cursor-pointer'
				}`}
				url={`/files/uploads/${url}`}
				controls={true}
				ref={playerRef}
				playing={isPlaying}
				volume={0.01}
			/>
		</div>
	);
};

export default VideoPlayer;
