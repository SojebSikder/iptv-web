import React from "react";
// Material ui
import Typography from "@material-ui/core/Typography";
// End material ui
import usePageStyles from "../styles/pageStyle";

export default function Home() {
    const classes = usePageStyles();

    return (
        <div className={classes.content}>
            <div className={classes.toolbar} />
            <Typography paragraph>Home</Typography>
        </div>
    );
}
