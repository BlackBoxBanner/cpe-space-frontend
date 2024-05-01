import { axios } from "@/libs/axiosInstance";
import { cn } from "@dookdiks/utils";
import ResetPasswordForm from "../_components/resetPasswordForm";
import { getResKey } from "@/libs/utils/encryption/publicKey";
import { UserSchema } from "@/types/zodSchema";
import { z } from "zod";

const ChangePasswordPage = async ({ params }: { params: { slug: string } }) => {
	const { slug } = params;

	const getParams = async () => {
		try {
			const res = await axios.get(`/api/auth/change-password/${slug}`);

			return res.data.data as z.infer<typeof UserSchema>;
		} catch (_) {
			console.error("Invalid Link");
		}
	};

	const user = await getParams();

	if (!user) throw new Error("Invalid Link");

	const resKey = await getResKey();

	return (
		<>
			<div
				className={cn(
					"w-[41rem] text-[3.75rem] font-semibold flex items-center min-h-52"
				)}
			>
				Reset password
			</div>
			<div className={cn("relative flex justify-center items-center w-full")}>
				<ResetPasswordForm
					studentid={user.studentid}
					resKey={resKey.publicKey}
				/>
			</div>
		</>
	);
};

export default ChangePasswordPage;
