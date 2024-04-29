import { Button, Link } from "@/components/common/button";
import { axios } from "@/libs/axiosInstance";
import { signout } from "@/libs/utils/auth/signout";
import { cn } from "@dookdiks/utils";
import { redirect } from "next/navigation";

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

	const signOutFormAction = async (formData: FormData) => {
		"use server";
		await signout();
		redirect("/");
	};
	return (
		<main className={cn("")}>
			<form action={formAction}>
				<input type="text" name="studentid" />
				<button type="submit">sent</button>
			</form>
			<form action={signOutFormAction}>
				<Button type="submit">Signout</Button>
			</form>
		</main>
	);
}
