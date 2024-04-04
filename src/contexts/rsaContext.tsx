"use client";

import { createContext, useContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

type RSAContextType = {
	rsaKey: string;
	setRsaKey: Dispatch<SetStateAction<string>>;
};
const RSAContext = createContext<RSAContextType>({
	rsaKey: "",
	setRsaKey: () => {},
});

type RSAProviderProps = { children: ReactNode } & Pick<
	RSAContextType,
	"rsaKey"
>;

export const RSAProvider = ({
	children,
	rsaKey: rsaKeyParams,
}: RSAProviderProps) => {
	const [rsaKey, setRsaKey] = useState(rsaKeyParams);

	return (
		<RSAContext.Provider value={{ rsaKey, setRsaKey }}>
			{children}
		</RSAContext.Provider>
	);
};

export const useRsaPublicKey = () => {
	const context = useContext(RSAContext);
	if (context === undefined) {
		throw new Error("useRSA must be used within a RSAProvider");
	}
	return context;
};
