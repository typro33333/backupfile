import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    listStyle: "none",
    margin: 0,
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function Tags(props) {
  const classes = useStyles();
  return (
    <Box component="ul" className={classes.root}>
      {props.data.map((data,i) => {
        return (
          <li key={i}>
            <Chip color="primary" label={`#${data.description}`} className={classes.chip} />
          </li>
        );
      })}
    </Box>
  );
}