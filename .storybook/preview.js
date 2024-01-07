import { initialize, mswLoader } from "msw-storybook-addon";

const mswOptions = {
  serviceWorker: {
    // ! use relative path to service worker (to work properly in gh-pages)
    // https://github.com/mswjs/msw-storybook-addon/issues/77#issuecomment-1315667130
    url: "mockServiceWorker.js",
  },
};

initialize(mswOptions);

const preview = {
  parameters: {
    layout: "padded",
  },
  decorators: [],
  loaders: [mswLoader],
};

export default preview;
