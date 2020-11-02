import React from "react";
import { useStyles } from "./style";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import {Box} from "@material-ui/core";

export default function RecipeReviewCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        title= {props.email}
        subheader="14:30 PM, September 14, 2016"
      />
      <Box style={{ float: "left", width: "49%" }}>
        <CardContent>
            <Typography
              variant="body2"
              style={{ padding: "8px" }}
            >
              First Name: {props.firstname}
            </Typography>
          <Typography
            variant="body2"
            style={{ padding: "8px" }}
          >
            Last Name : {props.lastname}
          </Typography>
        </CardContent>
      </Box>
      <Box style={{ float: "right", width: "49%" }}>
        <CardContent>
        <Typography
              variant="body2"
              style={{ padding: "8px" }}
        >
              Last Login: {props.lastlogin}
            </Typography>
        <Typography
          variant="body2"
          style={{ padding: "8px" }}
        >
          Description: This impressive paella is a perfect party dish
        </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
