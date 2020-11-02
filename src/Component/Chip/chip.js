import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import {Box} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0
  },
  chip: {
    margin: theme.spacing(0.5)
  }
}));

export default function ChipsArray(props) {
  const classes = useStyles();
  const chipData = props.chipData;
  return (
    <Box component ={"ul"} className ={classes.root}>
      {chipData.map((data) => {
        return (
          <li key={data.key}>
            <Chip
            label={data.label}
            onDelete={props.deleted}
            className={classes.chip}
            variant="outlined"
            />
          </li>
        );
      })}
    </Box>
  );
}