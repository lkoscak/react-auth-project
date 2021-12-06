import { useContext } from "react";

import AuthContext from "../store/auth-context";

const useAuthContext = () => {
	const authContext = useContext(AuthContext);
	return authContext;
};

export default useAuthContext;
