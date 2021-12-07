import { useState, useRef } from "react";

import { useHistory } from "react-router";

import useHttp from "../../hooks/use-http";

import useAuthContext from "../../hooks/use-auth-context";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
	const authCtx = useAuthContext();

	const history = useHistory();

	const [sendRequest, isLoading] = useHttp();
	const emailInputRef = useRef(null);
	const passwordInputRef = useRef(null);

	const [isLogin, setIsLogin] = useState(true);

	const switchAuthModeHandler = () => {
		setIsLogin((prevState) => !prevState);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		const url =
			(isLogin
				? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
				: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=") +
			"AIzaSyBxkfE8_d-EeIHWVBUWkIrEloggnCGDrd8";

		sendRequest(
			{
				url,
				method: "POST",
				body: {
					email: enteredEmail,
					password: enteredPassword,
					returnSecureToken: true,
				},
				headers: {
					"Content-Type": "application/json",
				},
			},
			(data) => {
				authCtx.login(
					data?.idToken,
					new Date(new Date().getTime() + +data.expiresIn * 1000).toISOString()
				);
				history.replace("/");
			},
			(error) => {
				alert(error);
			}
		);
	};
	return (
		<section className={classes.auth}>
			<h1>{isLogin ? "Login" : "Sign Up"}</h1>
			<form onSubmit={submitHandler}>
				<div className={classes.control}>
					<label htmlFor="email">Your Email</label>
					<input type="email" id="email" required ref={emailInputRef} />
				</div>
				<div className={classes.control}>
					<label htmlFor="password">Your Password</label>
					<input
						type="password"
						id="password"
						required
						ref={passwordInputRef}
					/>
				</div>
				<div className={classes.actions}>
					{!isLoading && (
						<button>{isLogin ? "Login" : "Create Account"}</button>
					)}
					{isLoading && <p>Sending request...</p>}
					<button
						type="button"
						className={classes.toggle}
						onClick={switchAuthModeHandler}
					>
						{isLogin ? "Create new account" : "Login with existing account"}
					</button>
				</div>
			</form>
		</section>
	);
};

export default AuthForm;
