import { Theme } from "@material-ui/core";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
const theme = createMuiTheme({
  palette: {
    common: { black: "rgba(0, 0, 0, 1)", white: "#fff" },
    background: { paper: "#fff", default: "rgba(255, 255, 255, 1)" },
    primary: {
      light: "rgba(255, 255, 255, 1)",
      main: "rgba(236, 239, 241, 1)",
      dark: "rgba(186, 189, 190, 1)",
      contrastText: "rgba(0, 0, 0, 1)",
    },
    secondary: {
      light: "rgba(130, 233, 222, 1)",
      main: "rgba(77, 182, 172, 1)",
      dark: "rgba(0, 134, 125, 1)",
      contrastText: "rgba(0, 0, 0, 1)",
    },
    error: { light: "#e57373", main: "#f44336", dark: "#d32f2f", contrastText: "#fff" },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
  },
});
const drawerWidth = 240;

export const useAppStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "1fr 0.1fr",
  },
}));
