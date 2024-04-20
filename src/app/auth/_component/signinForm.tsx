"use client";

import { Button } from "@/components/common/button";
import { Input } from "@/app/auth/_component/input";
import RightArrow from "@/components/icon/rightArrow";
import { useState } from "react";
import { signinNext } from "@/libs/utils/auth/signin";
import { Controller, useForm } from "react-hook-form";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

type SigninFormProps = {
	rsaKey: string;
};

const SigninSchema = zod.object({
	studentid: zod.string().min(11).max(11),
	password: zod.string(),
});

type SigninProps = zod.infer<typeof SigninSchema>;

export const SigninForm = ({ rsaKey }: SigninFormProps) => {
	const [page, setPage] = useState(0);

	const routers = useRouter();

	const { control, handleSubmit, setError } = useForm<SigninProps>({
		resolver: zodResolver(SigninSchema),
		defaultValues: {
			studentid: "",
		},
	});

	const onSignInSubmit = async (data: SigninProps) => {
		const signinRes = await signinNext({
			studentid: data.studentid,
			password: data.password,
			publicKey: rsaKey,
		});
		if (signinRes.error) {
			return setError("password", {
				message: "Invalid student ID or password",
			});
		}

		routers.push("/");
	};

	return (
		<form
			className="relative flex justify-center items-center"
			onSubmit={handleSubmit(onSignInSubmit)}
		>
			<IsPage page={page} triggerPage={0}>
				<div className="w-full relative">
					<Controller
						control={control}
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
						control={control}
						name="password"
						render={({ field, fieldState: { error } }) => (
							<>
								<Input
									placeholder="Password"
									type="password"
									id="password"
									error={!!error}
									{...field}
								/>
							</>
						)}
					/>
					<Button buttonStyle={{ size: "lg" }} type="submit">
						Log in
					</Button>
				</div>
			</IsPage>
		</form>
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
