"use client";

import { Button } from "@/components/common/button";
import { useRef } from "react";
import { registerServerAction } from "./_action/register";

const RegisterPage = () => {
	const ref = useRef<HTMLFormElement>(null);

	const registerClientAction = async (formData: FormData) => {
		const actionData = await registerServerAction(formData);

		if (actionData) {
			alert("User Created");
			ref.current?.reset();
		} else {
			alert("Error - User not created");
		}
	};
	return (
		<>
			<div className="text-[4rem]">Register</div>
			<form
				ref={ref}
				className="flex flex-col gap-2 w-full"
				action={registerClientAction}
			>
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
				<input
					className="p-1 rounded"
					type="email"
					placeholder="Email"
					name="email"
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
