import React from "react";

const AuthContext = React.createContext({
	isLoggedIn: false,
	token: null,
	login: (token) => {},
	logout: () => {},
});

export default AuthContext;
