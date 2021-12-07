import { useState } from "react";

import localStorageHelper from "./local-storage-helper";

import AuthContext from "./auth-context";

const tokenKey = "auth-project-token";

const calculateRemainingTime = (expirationTime) => {
	const currentTime = new Date().getTime();
	const adjustedExpirationTime = new Date(expirationTime).getTime();

	const remainingDuration = adjustedExpirationTime - currentTime;

	return remainingDuration;
};

const AuthProvider = (props) => {
	const [token, setToken] = useState(() => {
		return localStorageHelper.get(tokenKey);
	});

	const logoutHandler = () => {
		setToken(null);
		localStorageHelper.remove(tokenKey);
	};

	const loginHandler = (token, expirationTime) => {
		setToken(token);
		localStorageHelper.set(tokenKey, token);

		const remainingTime = calculateRemainingTime(expirationTime);

		setTimeout(logoutHandler, remainingTime);
	};

	return (
		<AuthContext.Provider
			value={{
				token,
				isLoggedIn: !!token,
				login: loginHandler,
				logout: logoutHandler,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
