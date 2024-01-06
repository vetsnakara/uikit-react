import { initialize, mswLoader } from "msw-storybook-addon";

const mswOptions = {
  serviceWorker: {
    url: "mockServiceWorker.js", // relative path
    // process.env.NODE_ENV === "production"
    //   ? "mockServiceWorker.js" // relative path
    //   : "/mockServiceWorker.js",
  },
};

// console.log("mswOptions", mswOptions);

initialize(mswOptions);

const preview = {
  parameters: {
    layout: "padded",
  },
  decorators: [],
  loaders: [mswLoader],
};

export default preview;
