import { Button } from "@/components/common/button";
import { RegisterProps, register } from "@/libs/utils/auth/register";
import { getResKey } from "@/libs/utils/encryption/publicKey";
import { permanentRedirect, redirect } from "next/navigation";

const RegisterPage = async () => {
	const handleSubmit = async (formData: FormData) => {
		"use server";
		const data: RegisterProps = {
			confirmPassword: formData.get("studentid") as string,
			password: formData.get("studentid") as string,
			studentid: formData.get("studentid") as string,
			program: formData.get("program") as
				| "REGULAR"
				| "INTERNATIONAL"
				| "HEALTH_DATA_SCIENCE"
				| "RESFENTIAL_COLLEGE",
			name: formData.get("name") as string,
			publicKey: (await getResKey()).publicKey,
		};
		const res = await register(data);

		if (!res.error) permanentRedirect("/auth/register");
	};
	return (
		<>
			<div className="text-[4rem]">Register</div>
			<form className="flex flex-col gap-2 w-full" action={handleSubmit}>
				<input
					className="p-1 rounded"
					type="text"
					placeholder="Name"
					name="name"
					required
				/>
				<input
					className="p-1 rounded"
					type="text"
					placeholder="Student ID"
					name="studentid"
					pattern="[0-9]{11}"
					required
				/>
				<select
					className="p-1 rounded"
					name="program"
					required
					defaultValue={"REGULAR"}
				>
					<option value="REGULAR">Regular</option>
					<option value="INTERNATIONAL">International</option>
					<option value="HEALTH_DATA_SCIENCE">Health Data Science</option>
					<option value="RESFENTIAL_COLLEGE">Residential College</option>
				</select>
				<Button type="submit" buttonStyle={{}}>
					Create User
				</Button>
			</form>
		</>
	);
};

export default RegisterPage;
