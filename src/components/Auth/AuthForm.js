import { useState, useRef } from "react";

import useAuthContext from "../../hooks/use-auth-context";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
	const authCtx = useAuthContext();

	const emailInputRef = useRef(null);
	const passwordInputRef = useRef(null);

	const [isLogin, setIsLogin] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

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

		setIsLoading(true);

		fetch(url, {
			method: "POST",
			body: JSON.stringify({
				email: enteredEmail,
				password: enteredPassword,
				returnSecureToken: true,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					return res.json().then((data) => {
						const { message: errorMessage = null } = data?.error;
						throw new Error(errorMessage);
					});
				}
			})
			.then((data) => {
				authCtx.login(data?.idToken);
			})
			.catch((error) => {
				alert(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
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
