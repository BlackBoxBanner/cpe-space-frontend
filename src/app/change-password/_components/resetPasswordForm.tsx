"use client";

import { Input, Password } from "@/app/auth/_component/input";
import { Button } from "@/components/common/button";
import RightArrow from "@/components/icon/rightArrow";
import { changePassword } from "@/libs/utils/auth/changePassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const ResetPasswordSchema = z
	.object({
		password: z.string().refine((data) => data.length > 8),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

type ResetPasswordProps = z.infer<typeof ResetPasswordSchema>;

const ResetPasswordForm = ({
	resKey,
	studentid,
}: {
	resKey: string;
	studentid: string;
}) => {
	const [page, setPage] = useState(0);

	const { control, handleSubmit, setError } = useForm<ResetPasswordProps>({
		resolver: zodResolver(ResetPasswordSchema),
	});

	const onSubmitHandler = async (data: ResetPasswordProps) => {
		if (data.password !== data.confirmPassword) {
			return setError("confirmPassword", { message: "Passwords do not match" });
		}
		console.log({ studentid });

		const res = await changePassword({
			publicKey: resKey,
			studentid,
			password: data.password,
		});

		if (res.error) {
			return setError("confirmPassword", {
				message: "Invalid student ID or password",
			});
		} else {
			alert("Password changed successfully");
		}
	};

	return (
		<>
			<form
				className="relative flex justify-center items-center w-full"
				onSubmit={handleSubmit(onSubmitHandler)}
			>
				<IsPage page={page} triggerPage={0}>
					<div className="w-full relative">
						<Controller
							control={control}
							name="password"
							render={({
								field: { ...field },
								fieldState: { error, isDirty },
							}) => (
								<>
									<div className="relative">
										<Password
											placeholder="New Password"
											error={!!error}
											id="password"
											type="password"
											{...field}
										/>
									</div>
									<div className="absolute -bottom-24 right-0">
										<Button
											buttonStyle={{ size: "circle", color: "orange" }}
											onClick={() => setPage((e) => e + 1)}
											type="button"
											disabled={isDirty && field.value.length < 8}
										>
											<RightArrow />
										</Button>
									</div>
								</>
							)}
						/>
					</div>
				</IsPage>
				<IsPage page={page} triggerPage={1}>
					<div className="w-full relative flex flex-col gap-8">
						<Controller
							control={control}
							name="confirmPassword"
							render={({ field: { ...field }, fieldState: { error } }) => (
								<>
									<div className="relative">
										<Password
											placeholder="Repeat password"
											error={!!error}
											id="confirmPassword"
											type="password"
											{...field}
										/>
									</div>
									<div className="w-full">
										<Button
											buttonStyle={{ size: "lg", color: "orange" }}
											type="submit"
										>
											Save
										</Button>
									</div>
								</>
							)}
						/>
					</div>
				</IsPage>
			</form>
		</>
	);
};

export default ResetPasswordForm;

const IsPage = ({
	page,
	triggerPage,
	children,
}: {
	page: number;
	triggerPage: number;
	children: React.ReactNode;
}) => {
	return page === triggerPage ? <>{children}</> : null;
};
