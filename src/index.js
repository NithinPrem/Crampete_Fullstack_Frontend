import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import { store } from "./app/store";
import "./index.css";

export let persistor = persistStore(store);

const root = ReactDOM.createRoot(
	document.getElementById("root")
);

if (process.env.NODE_ENV === "production") {
	disableReactDevTools();
}
root.render(
	<>
		<React.StrictMode>
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<Router basename="/">
						<App />
					</Router>
				</PersistGate>
			</Provider>
		</React.StrictMode>
	</>
);
