import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RecoilRoot } from "recoil";
import App from "./App";
import { store } from "./state";

const rootElement = document.getElementById("root");

const root = createRoot(rootElement!); // createRoot(container!) if you use TypeScript

root.render(
	<Provider store={store}>
		<RecoilRoot>
			<App />
		</RecoilRoot>
	</Provider>,
);
