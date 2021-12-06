import { useState } from "react";

import AuthContext from "./auth-context";

const AuthProvider = (props) => {
	const [token, setToken] = useState(null);

	const loginHandler = (token) => {
		setToken(token);
	};

	const logoutHandler = () => {
		setToken(null);
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
