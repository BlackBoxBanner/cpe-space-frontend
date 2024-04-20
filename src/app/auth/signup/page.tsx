import { cn } from "@dookdiks/utils";
import { SignupForm } from "@/app/auth/_component/signupForm";
import { getResKey } from "@/libs/utils/encryption/publicKey";

const SignUpPage = async () => {
	const rsaKey = await getResKey();

	return (
		<>
			<SignupForm rsaKey={rsaKey.publicKey} />
		</>
	);
};

export default SignUpPage;
