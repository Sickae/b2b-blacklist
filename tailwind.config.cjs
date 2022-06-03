module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        back2basics: {
          "primary": "#0b75e0",
          "secondary": "#6330c9",
          "accent": "#c9e4ff",
          "neutral": "#161623",
          "base-100": "#262E3F",
          "info": "#6D89D0",
          "success": "#6EEDAB",
          "warning": "#F5CE6B",
          "error": "#DD3C71",
        },
      },
    ],
  }
}
