import { Button } from '@/components/ui/button';
import { FiEye, FiEyeOff } from 'react-icons/fi';
type PasswordToggleProps = {
	showPass: boolean;
	setShowPass: (value: boolean) => void;
};

const PasswordToggle: React.FC<PasswordToggleProps> = ({
	showPass,
	setShowPass,
}) => {
	return (
		<Button
			className="absolute top-[50%] translate-y-[-50%] right-[10px] p-0 text-primary-black-light text-opacity-60 text-[15px]"
			type="button"
			onClick={() => setShowPass(!showPass)}
		>
			{showPass ? <FiEyeOff /> : <FiEye />}
		</Button>
	);
};

export default PasswordToggle;
