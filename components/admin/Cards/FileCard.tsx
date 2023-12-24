import Image from 'next/image';
import { FiFile } from 'react-icons/fi';
import ReactPlayer from 'react-player';

type FileCardType = {
	file: FileType;
};

const FileCard: React.FC<FileCardType> = ({ file }) => {
	return (
		<div className="file-card">
			{file.fileType === 'image' && (
				<div className="bg-white rounded-md overflow-hidden border border-admin-gray-dark border-opacity-50 relative group cursor-pointer">
					<Image
						src={`/files/uploads/${file?.url}`}
						alt={file?.title}
						priority={true}
						width={1240}
						height={750}
						className="h-[220px] object-cover rounded-md"
					/>
					<div className="absolute duration-150 opacity-0 top-0 left-0 w-full h-full bg-primary-black-thin bg-opacity-50 group-hover:opacity-[1]"></div>
				</div>
			)}
			{file.fileType === 'video' && (
				<ReactPlayer
					className="!h-[220px] !w-[100%] border bg-white border-admin-gray-dark rounded-md cursor-pointer"
					url={`/files/uploads/${file.url}`}
					controls={false}
				/>
			)}
			{file.fileType === 'application' && (
				<div className="h-[220px] border border-admin-gray-dark rounded-md bg-white flex flex-col gap-[10px] items-center justify-center text-center p-[25px] cursor-pointer">
					<FiFile className="text-[50px] text-primary-dark-100" />
					<p className="text-base-3">{file.title}</p>
				</div>
			)}
		</div>
	);
};

export default FileCard;
