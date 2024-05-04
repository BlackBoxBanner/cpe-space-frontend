import { axios } from "@/libs/axiosInstance";
import { cn } from "@dookdiks/utils";

export default function Home() {
	const formAction = async (formData: FormData) => {
		"use server";

		const studentid = formData.get("studentid");
		try {
			const token = await axios.post("api/auth/change-password-ticket", {
				data: studentid,
			});
			console.log(token.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<main className={cn("")}>
			<form action={formAction}>
				<input type="text" name="studentid" />
				<button type="submit">sent</button>
			</form>
		</main>
	);
}
