import { Theme } from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

export const useAppStyles = makeStyles((theme: Theme) => ({
    root: {
        display: "flex",
    },
    rounded: {
        borderRadius: "0.7rem",
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
        margin: "auto",
        maxWidth: "50rem",
        minWidth: "35rem",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        //backgroundColor: theme.palette.background.default,
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    slider: {
        margin: "auto 1rem",
        width: "80%",
    },
    footer: {
        position: "fixed",
        width: "100%",
        bottom: 0,
        left: 0,
        background: blueGrey[200],
        height: "90px",
        zIndex: 9999,
        display: "grid",
        gridTemplateColumns: "80px 2fr 4fr 1fr",
        gridGap: "1rem",
    },
    dFlex: {
        display: "flex",
    },
    dInlineFlex: {
        display: "inline-flex",
    },
    textCenter: {
        textAlign: "center",
    },
    panel: {
        margin: "auto",
        width: "66%",
    },
    blackText: {
        color: "black",
    },
}));
