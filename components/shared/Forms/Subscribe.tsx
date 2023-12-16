import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Subscribe = () => {
	return (
		<div className="flex flex-col gap-[12px] mt-[30px]">
			<p className="text-base-2 dark:text-white">
				Join our newsletter to stay up to date on features and releases.
			</p>
			<div className="flex w-full max-w-sm items-center space-x-2">
				<Input
					type="email"
					placeholder="Enter your email"
					className="auth-input__field"
				/>
				<Button type="submit" className="btn-primary">
					Subscribe
				</Button>
			</div>
			<p className="text-base-3 dark:text-white">
				By subscribing you agree to with our Privacy Policy and provide
				consent to receive updates from our company.
			</p>
		</div>
	);
};

export default Subscribe;
