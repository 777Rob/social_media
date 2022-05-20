import { useMantineTheme } from '@mantine/core';

// How to access theme values
function Demo() {
  const theme = useMantineTheme();
  return <div style={{ background: theme.colors.blue[5] }} />;
}

// TODO: Create theme and override it here choose color pallete and fonts
export const theme = {
  defaultRadius: 0,
  fontFamily: "Greycliff CF, sans-serif",

  colors: {
    // override dark colors to change them for all components
    dark: [
      '#d5d7e0',
      '#acaebf',
      '#8c8fa3',
      '#666980',
      '#4d4f66',
      '#34354a',
      '#2b2c3d',
      '#1d1e30',
      '#0c0d21',
      '#01010a',
    ],

    // Add your color
    'deep-blue': ['#E9EDFC', '#C1CCF6', '#99ABF0' /* ... */],

  },


  headings: {
    fontFamily: "Greycliff CF, sans-serif",
    sizes: {
      h1: { fontSize: 35, fontWeight: "700", borderBottom: "1px solid black", mb: "1px"},
    },
  }
}