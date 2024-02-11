// import { ReactDOM } from "react-dom";

import { Mchd } from "./Mchd";
import { Provider } from "./context";

window.initMchd = ({ selector, data }) => {
    const root = window.ReactDOM.createRoot(document.getElementById(selector));

    // todo: add userRole here
    // todo: import getData to test

    root.render(
        <Provider value={data}>
            <Mchd />
        </Provider>
    );
};
