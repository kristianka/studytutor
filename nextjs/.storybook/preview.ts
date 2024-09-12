import type { Preview } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import withAppRouterContext from '../src/app/provider/withAppRouterContext';

import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      decorators: [withAppRouterContext],
    },

  },

  decorators: [withThemeByClassName({
      themes: {
          // nameOfTheme: 'classNameForTheme',
          light: 'light',
          dark: 'dark',
      },
      defaultTheme: 'light',
  })],

  tags: ['autodocs']
};

export default preview;
