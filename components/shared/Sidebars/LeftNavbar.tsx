import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { HiMiniBars3 } from 'react-icons/hi2';
type LeftNavbarProps = {
	content: React.ReactNode;
	contentClass: string;
	trigger: React.ReactNode | null;
};

const LeftNavbar: React.FC<LeftNavbarProps> = ({
	content,
	contentClass,
	trigger,
}) => {
	return (
		<div className="left">
			<Sheet>
				<SheetTrigger asChild>
					{trigger ? (
						trigger
					) : (
						<Button className="text-[28px] text-primary-black-dark dark:text-white lg:hidden block p-0">
							<HiMiniBars3 />
						</Button>
					)}
				</SheetTrigger>
				<SheetContent
					side="left"
					className={`${
						contentClass.length > 0
							? contentClass
							: 'bg-dark__200-light__white data-[state=open]:bg-secondary border-r border-r-primary-dark-100 xm:w-[280px] w-[260px] dark:border-opacity-100 border-opacity-10'
					}`}
				>
					{content}
				</SheetContent>
			</Sheet>
		</div>
	);
};

export default LeftNavbar;
