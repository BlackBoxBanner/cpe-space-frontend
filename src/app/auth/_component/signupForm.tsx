"use client";

import { Button } from "@/components/common/button";
import { Input } from "@/app/auth/_component/input";
import RightArrow from "@/components/icon/rightArrow";
import { useState } from "react";
import { cn } from "@dookdiks/utils";
import { Controller, useForm } from "react-hook-form";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkPassword } from "@/libs/utils/auth/checkPassword";
import { getUserByStudentId } from "@/libs/utils/users/get";
import { changePassword } from "@/libs/utils/auth/changePassword";
import { useRouter } from "next/navigation";

type SignupFormProps = {
	rsaKey: string;
};

const SigninSchema = zod.object({
	studentid: zod.string().min(11).max(11),
	password: zod.string(),
});

type SigninProps = zod.infer<typeof SigninSchema>;

const ChangePasswordSchema = zod.object({
	newPassword: zod.string(),
	repetePassword: zod.string(),
});

type ChangePasswordProps = zod.infer<typeof ChangePasswordSchema>;

export const SignupForm = ({ rsaKey }: SignupFormProps) => {
	const [page, setPage] = useState(0);
	const router = useRouter();

	const {
		control: signInControl,
		handleSubmit: signInHandleSubmit,
		setError: signInSetError,
		getValues: signInGetValues,
	} = useForm<SigninProps>({
		resolver: zodResolver(SigninSchema),
		defaultValues: {
			studentid: "",
		},
	});

	const {
		control: changePasswordControl,
		handleSubmit: changePasswordHandleSubmit,
		setError: changePasswordSetError,
	} = useForm<ChangePasswordProps>({
		resolver: zodResolver(ChangePasswordSchema),
	});

	const onSignInSubmit = async (data: SigninProps) => {
		const signinRes = await checkPassword({
			studentid: data.studentid,
			password: data.password,
			publicKey: rsaKey,
		});
		if (signinRes.error) {
			return signInSetError("password", {
				message: "Invalid student ID or password",
			});
		}

		const user = await getUserByStudentId(data.studentid);

		if (user.error) {
			return signInSetError("password", {
				message: "Invalid student ID or password",
			});
		}

		if (user.data.touched) {
			return signInSetError("password", {
				message: "Invalid student ID or password",
			});
		}

		setPage((e) => e + 1);
	};

	const onChangePasswordSubmit = async (data: ChangePasswordProps) => {
		const { newPassword, repetePassword } = data;

		if (newPassword !== repetePassword) {
			return changePasswordSetError("repetePassword", {
				message: "Password does not match",
			});
		}

		const changePasswordRes = await changePassword({
			password: newPassword,
			studentid: signInGetValues("studentid"),
			publicKey: rsaKey,
		});

		if (changePasswordRes.error) {
			return changePasswordSetError("newPassword", {
				message: "Invalid student ID or password",
			});
		}

		router.push("/auth/signin");
	};

	return (
		<>
			<div
				className={cn(
					"w-[41rem] text-[3.75rem] font-semibold flex justify-center items-start flex-col min-h-52 gap-2"
				)}
			>
				<div>{0 <= page || page >= 1 ? "Sign up" : "Change password"}</div>
				<Progress total={4} active={page} />
			</div>
			<div className={cn("relative flex justify-center items-center w-full")}>
				<form
					className={cn(!(page == 0 || page == 1) ? "hidden" : "w-full")}
					onSubmit={signInHandleSubmit(onSignInSubmit)}
				>
					<IsPage page={page} triggerPage={0}>
						<div className="w-full relative">
							<Controller
								control={signInControl}
								name="studentid"
								render={({
									field: { onChange, ...field },
									fieldState: { error },
								}) => (
									<>
										<Input
											placeholder="Student ID"
											error={!!error}
											id="studentid"
											onChange={(e) =>
												onChange(
													isNaN(Number(e.target.value)) ? "" : e.target.value
												)
											}
											{...field}
										/>
										<div className="absolute -bottom-24 right-0">
											<Button
												buttonStyle={{ size: "circle", color: "orange" }}
												onClick={() => setPage((e) => e + 1)}
												type="button"
												disabled={field.value.length !== 11}
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
						<div className="w-full flex flex-col gap-8">
							<Controller
								control={signInControl}
								name="password"
								render={({ field, fieldState: { error } }) => (
									<>
										<Input
											placeholder="Password"
											id="password"
											type="password"
											error={!!error}
											{...field}
										/>
									</>
								)}
							/>
							<div className="absolute -bottom-4 right-0">
								<Button
									buttonStyle={{ size: "circle", color: "orange" }}
									type="submit"
								>
									<RightArrow />
								</Button>
							</div>
						</div>
					</IsPage>
				</form>
				<form
					className={cn(!(page == 2 || page == 3) ? "hidden" : "w-full")}
					onSubmit={changePasswordHandleSubmit(onChangePasswordSubmit)}
				>
					<IsPage page={page} triggerPage={2}>
						<div className="w-full relative">
							<Controller
								control={changePasswordControl}
								name="newPassword"
								render={({ field, fieldState: { error } }) => (
									<>
										<Input
											placeholder="New password"
											error={!!error}
											id="newPassword"
											{...field}
										/>
										<div className="absolute -bottom-24 right-0">
											<Button
												buttonStyle={{ size: "circle", color: "orange" }}
												onClick={() => setPage((e) => e + 1)}
												type="button"
											>
												<RightArrow />
											</Button>
										</div>
									</>
								)}
							/>
						</div>
					</IsPage>
					<IsPage page={page} triggerPage={3}>
						<div className="w-full flex flex-col gap-8">
							<Controller
								control={changePasswordControl}
								name="repetePassword"
								render={({ field, fieldState: { error } }) => (
									<>
										<Input
											placeholder="Repeat password"
											id="repetePassword"
											type="password"
											error={!!error}
											{...field}
										/>
									</>
								)}
							/>
							<Button buttonStyle={{ size: "lg" }} type="submit">
								Change password
							</Button>
						</div>
					</IsPage>
				</form>
			</div>
		</>
	);
};

type IsPageProps = {
	page: number;
	triggerPage: number;
	children: React.ReactNode;
};

const IsPage = ({ children, page, triggerPage }: IsPageProps) => {
	return page === triggerPage ? <>{children}</> : null;
};

type ProgressBarProps = {
	active: boolean;
};

const ProgressBar = ({ active }: ProgressBarProps) => {
	return (
		<div
			className={cn("h-4 w-8 bg-[#fff] rounded-full ease-in-out duration-700", {
				"w-20 bg-liberty": active,
			})}
		></div>
	);
};

type ProgressProps = {
	total: number;
	active: number;
};

const Progress = ({ active, total }: ProgressProps) => {
	return (
		<>
			<div className={"flex gap-2 w-full max-w-52"}>
				{Array.from({ length: total }).map((_, i) => (
					<ProgressBar key={i} active={i === active} />
				))}
			</div>
		</>
	);
};
