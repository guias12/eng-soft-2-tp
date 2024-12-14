import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import App from "./components/App/App.tsx";
import store from "./store/index.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
