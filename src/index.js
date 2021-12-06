import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import AuthProvider from "./store/auth-provider";

import "./index.css";
import App from "./App";

ReactDOM.render(
	<AuthProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</AuthProvider>,
	document.getElementById("root")
);
