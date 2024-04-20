import { cn } from "@dookdiks/utils";
import { SigninForm } from "@/app/auth/_component/signinForm";
import { getResKey } from "@/libs/utils/encryption/publicKey";

const SignInPage = async () => {
	const rsaKey = await getResKey();

	return (
		<>
			<div
				className={cn(
					"w-[41rem] text-[3.75rem] font-semibold flex items-center min-h-52"
				)}
			>
				Log in
			</div>
			<SigninForm rsaKey={rsaKey.publicKey} />
		</>
	);
};

export default SignInPage;
