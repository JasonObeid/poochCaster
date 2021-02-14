import { Theme } from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

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
    slider: {
        margin: "auto 1rem",
    },
    footer: {
        position: "fixed",
        width: "100%",
        bottom: 0,
        left: 0,
        background: blueGrey[200],
        height: "80px",
        zIndex: 9999,
        display: "grid",
        gridTemplateColumns: "80px 2fr 4fr 1fr",
        gridGap: "1rem",
    },
    dFlex: {
        display: "flex",
    },
}));
