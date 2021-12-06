import { Link } from "react-router-dom";

import useAuthContext from "../../hooks/use-auth-context";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
	const authCtx = useAuthContext();
	return (
		<header className={classes.header}>
			<Link to="/">
				<div className={classes.logo}>React Auth</div>
			</Link>
			<nav>
				<ul>
					{!authCtx.isLoggedIn && (
						<li>
							<Link to="/auth">Login</Link>
						</li>
					)}
					{authCtx.isLoggedIn && (
						<li>
							<Link to="/profile">Profile</Link>
						</li>
					)}
					{authCtx.isLoggedIn && (
						<li>
							<button>Logout</button>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;
