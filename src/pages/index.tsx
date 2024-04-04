import { useRsaPublicKey } from "@/contexts/rsaContext";
import { axios } from "@/lib/axiosInstance";
import { encrypt } from "@/lib/utils/encryption";
import { PostBody, ReturnResponse } from "@/types/ResponseType";
import { Inter } from "next/font/google";
import { FormEvent } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const { rsaKey } = useRsaPublicKey();

	const handlerSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		const encryptedData = encrypt(
			{
				username: formData.get("username"),
				password: formData.get("password"),
			},
			rsaKey
		);

		const res = await axios.post<ReturnResponse<unknown>, any, PostBody>("/", {
			data: encryptedData,
		});

		console.log(res.data.data);
	};
	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
		>
			<form onSubmit={handlerSubmit}>
				<input type="text" name="username" placeholder="Username"></input>
				<input type="password" name="password" placeholder="Password"></input>
				<input type="submit" value="Login"></input>
			</form>
		</main>
	);
}
