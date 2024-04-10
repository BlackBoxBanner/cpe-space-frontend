import { useRsaPublicKey } from "@/contexts/rsaContext";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "@/types/zodSchema";
import zod from "zod";
import { signin } from "@/lib/utils/auth/signin";
import { cn } from "@dookdiks/utils";
import { Button, ErrorMessage, Input } from "@/components/demo";

const SigninSchema = UserSchema.pick({ studentid: true, password: true });
type SigninForm = zod.infer<typeof SigninSchema>;

const DemoSignin = () => {
	const { rsaKey } = useRsaPublicKey();
	const { control, handleSubmit, setError } = useForm<SigninForm>({
		defaultValues: {
			studentid: "64070503000",
			password: "very_secure_password",
		},
		resolver: zodResolver(SigninSchema),
	});

	const onSubmitHandler: SubmitHandler<SigninForm> = async (data, event) => {
		const res = await signin({
			studentid: data.studentid,
			password: data.password,
			publicKey: rsaKey,
		});
		if (res?.error) {
			setError("password", {
				message: res.error.customError
					? res.error.customError
					: JSON.stringify(res.error.zodError),
			});
		}
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmitHandler)}
				className={cn("border rounded border-black p-2")}
			>
				<Controller
					control={control}
					render={({ field, fieldState: { error } }) => {
						return (
							<div>
								<Input
									className={cn("border rounded border-black px-2")}
									{...field}
								/>
								<ErrorMessage>{error ? error.message : ""}</ErrorMessage>
							</div>
						);
					}}
					name={"studentid"}
				/>
				<Controller
					control={control}
					render={({ field, fieldState: { error } }) => {
						return (
							<div>
								<Input
									type={"password"}
									className={cn("border rounded border-black px-2")}
									{...field}
								/>
								<ErrorMessage>{error ? error.message : ""}</ErrorMessage>
							</div>
						);
					}}
					name={"password"}
				/>
				<Button type={"submit"}>Submit</Button>
			</form>
		</>
	);
};

export default DemoSignin;
