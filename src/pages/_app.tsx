import { RSAProvider } from "@/contexts/rsaContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { axios } from "@/lib/axiosInstance";
import { ReturnResponse } from "@/types/ResponseType";
import { util } from "node-forge";
import { useEffect, useState } from "react";
import { NextPageContext } from "next";

export default function App({
	Component,
	pageProps,
	publicKey,
}: AppProps & { publicKey: string }) {
	return (
		<RSAProvider rsaKey={publicKey}>
			<Component {...pageProps} />
		</RSAProvider>
	);
}

App.getInitialProps = async (ctx: NextPageContext) => {
	const rsaPublicKey = await axios.get<ReturnResponse<string>>(
		"/api/config/rsa-key"
	);

	if (rsaPublicKey.data.error) {
		return undefined;
	}

	const publicKey = util.decode64(rsaPublicKey.data.data);
	return { publicKey };
};
