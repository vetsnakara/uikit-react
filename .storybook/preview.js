import { initialize, mswLoader } from "msw-storybook-addon";

initialize();

const preview = {
  parameters: {
    layout: "padded",
  },
  decorators: [],
  loaders: [mswLoader],
};

export default preview;
