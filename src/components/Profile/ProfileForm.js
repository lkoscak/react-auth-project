import { useState } from "react";

import { useHistory } from "react-router";

import useAuthContext from "../../hooks/use-auth-context";
import useHttp from "../../hooks/use-http";

import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
	const history = useHistory();
	const authCtx = useAuthContext();
	const [password, setPassword] = useState("");
	const passwordChangeHandler = (e) => {
		setPassword(e.target.value);
	};
	const [sendRequest, isLoading] = useHttp();
	const submitHandler = (e) => {
		e.preventDefault();
		sendRequest(
			{
				url: "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBxkfE8_d-EeIHWVBUWkIrEloggnCGDrd8",
				method: "POST",
				body: {
					idToken: authCtx.token,
					password,
					returnSecureToken: true,
				},
				headers: {
					"Content-Type": "application/json",
				},
			},
			(_data) => {
				history.replace("/");
			},
			(error) => {
				alert(error);
			}
		);
	};

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<div className={classes.control}>
				<label htmlFor="new-password">New Password</label>
				<input
					type="password"
					id="new-password"
					minLength="6"
					value={password}
					onChange={passwordChangeHandler}
				/>
			</div>
			<div className={classes.action}>
				{isLoading && <p>Sending request...</p>}
				{!isLoading && <button>Change Password</button>}
			</div>
		</form>
	);
};

export default ProfileForm;
