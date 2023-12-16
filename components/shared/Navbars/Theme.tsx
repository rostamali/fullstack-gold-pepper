'use client';
import { useTheme } from '@/context/ThemeProvider';
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarTrigger,
} from '@/components/ui/menubar';
import { themes } from '@/constants';
import { FiSun, FiMoon } from 'react-icons/fi';

const Theme = () => {
	const { mode, setMode } = useTheme();

	return (
		<Menubar className="px-0 border-none bg-transparent">
			<MenubarMenu>
				<MenubarTrigger className="lg:text-[18px] text-[22px] text-primary-orange-dark">
					{mode === 'light' ? <FiSun /> : <FiMoon />}
				</MenubarTrigger>
				<MenubarContent className="absolute right-[-35px] min-w-[100px] border border-primary-dark-200 border-opacity-20 dark:border-primary-dark-100 bg-dark__200-light__white">
					{themes.map((theme, index) => (
						<MenubarItem
							key={index}
							onClick={() => {
								setMode(theme.value);
								if (theme.value !== 'system') {
									localStorage.theme = theme.value;
								} else {
									localStorage.removeItem('theme');
								}
							}}
							className="hover:bg-primary-dark-200 hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-20"
						>
							<p
								className={`flex items-center gap-[6px] !text-base-2 ${
									mode === theme.value
										? '!text-primary-orange-dark'
										: '!text-primary-black-light dark:!text-white'
								}`}
							>
								<theme.icon />
								{theme.label}
							</p>
						</MenubarItem>
					))}
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	);
};

export default Theme;
