import { extendTheme } from "@chakra-ui/react";

const theme = {
  components: {
    Button: { baseStyle: { borderRadius: "2px" } },
    Input: {
      sizes: {
        xs: { field: { borderRadius: "2px" } },
        sm: { field: { borderRadius: "2px" } },
        md: { field: { borderRadius: "2px" } },
        lg: { field: { borderRadius: "2px" } },
      },
      defaultProps: {
        variant: "filled",
      },
    },
    ModalContent: { baseStyle: { borderRadius: "2px" } },
  },
  initialColorMode: "system",
  colors: {
    primary: {
      50: "#e1fbf0",
      100: "#c1ebda",
      200: "#9fdec1",
      300: "#7acfaa",
      400: "#57c192",
      500: "#3ea878",
      600: "#2e835e",
      700: "#1e5d42",
      800: "#0e3926",
      900: "#001508",
    },
    gray: {
      50: "#edf3f8",
      100: "#d6d9dc",
      200: "#bcc0c2",
      300: "#a2a6a9",
      400: "#888d91",
      500: "#6f7478",
      600: "#565a5d",
      700: "#3d4143",
      800: "#232729",
      900: "#070e13",
    },
  },
};
export default extendTheme(theme);

// https://smart-swatch.netlify.app/
