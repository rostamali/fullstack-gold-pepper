import { useCallback, useEffect, useRef, useState } from 'react';
import type EditorJS from '@editorjs/editorjs';

interface EditorProps {}

const Editor: React.FC<EditorProps> = () => {
	const ref = useRef<EditorJS>();
	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => {
		if (typeof window !== 'undefined') {
			setIsMounted(true);
		}
	}, []);

	const initializeEditor = useCallback(async () => {
		const EditorJS = (await import('@editorjs/editorjs')).default;
		const Header = (await import('@editorjs/header')).default;
		const Embed = (await import('@editorjs/embed')).default as any;
		const Table = (await import('@editorjs/table')).default;
		const List = (await import('@editorjs/list')).default;
		const Code = (await import('@editorjs/code')).default;
		const LinkTool = (await import('@editorjs/link')).default;
		const InlineCode = (await import('@editorjs/inline-code')).default;
		const ImageTool = (await import('@editorjs/image')).default;

		if (!ref.current) {
			const editor = new EditorJS({
				holder: 'editor',
				onReady() {
					ref.current = editor;
				},
				placeholder: 'Type here to write your post...',
				inlineToolbar: true,
				data: { blocks: [] },
				tools: {
					header: Header,
					list: List,
					code: Code,
					inlineCode: InlineCode,
					table: Table,
					embed: Embed,
					// linkTool: {
					// 	class: LinkTool,
					// 	config: {
					// 		endpoint: '/api/link',
					// 	},
					// },
				},
			});
		}
	}, []);
	useEffect(() => {
		const init = async () => {
			await initializeEditor();
			setTimeout(() => {});
		};

		if (isMounted) {
			init();

			return () => {};
		}
	}, [isMounted, initializeEditor]);
	return <div id="editor" className="min-h-[500px] border"></div>;
};

export default Editor;
