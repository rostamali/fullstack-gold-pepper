import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ForgotPassword = () => {
	return (
		<form className="auth-form__input-space">
			<div className="auth-input__group">
				<Label htmlFor="email" className="auth-input__label">
					Email address
				</Label>
				<Input type="email" id="email" className="auth-input__field" />
				<span className="form__error">We couldn't find your email</span>
			</div>

			<div className="auth-input__group">
				<Button className="auth-form__btn">Continue</Button>
			</div>
		</form>
	);
};

export default ForgotPassword;
