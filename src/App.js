import useAuthContext from "./hooks/use-auth-context";
import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";

function App() {
	const authCtx = useAuthContext();
	return (
		<Layout>
			<Switch>
				<Route path="/" exact>
					<HomePage />
				</Route>
				{!authCtx.isLoggedIn && (
					<Route path="/auth">
						<AuthPage />
					</Route>
				)}
				<Route path="/profile">
					{authCtx.isLoggedIn && <UserProfile />}
					{!authCtx.isLoggedIn && <Redirect to="/auth"></Redirect>}
				</Route>
				<Route path="*">
					<Redirect to="/"></Redirect>
				</Route>
			</Switch>
		</Layout>
	);
}

export default App;
