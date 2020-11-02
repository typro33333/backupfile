import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import Logo from '../../../../Assest/logo-shoppee.png';
import {Box} from '@material-ui/core';
import {Link} from '@material-ui/core';
//import EditIcon from '@material-ui/icons/Edit';
//import IconButton from '@material-ui/core/IconButton';

export default function RecipeReviewCard(props) {
  const DetailShops = props.DetailShops;
  return (
    <Grid item xs={12} >
    {DetailShops.map(shop =>(
        <Card key = {shop.id}>
            <CardHeader
                avatar={<Avatar aria-label="recipe" src={Logo} />}
                title= {shop.name}
                subheader="14:30 PM, September 14, 2016"
            />
            <Box style={{ float: "left", width: "48%" }}>
                <CardContent>
                    <Typography
                    variant="body2"
                    style={{ padding: "8px" }}
                    >
                    Country:{props.firstname}
                    </Typography>
                <Typography
                    variant="body2"
                    style={{ padding: "8px" }}
                >
                    Channel : {shop.channel_id}
                </Typography>
                </CardContent>
            </Box>
            <Box style={{ float: "right", width: "48%" }}>
                <CardContent>
                <Typography
                    style={{ padding: "8px" }}
                >
                    Sim Number : {shop.sim_number}
                </Typography>
                <Typography
                    variant="body1"
                    style={{ padding: "8px" }}
                >
                <Link href = {shop.correspond_apicall}>Detail</Link>
                </Typography>
                </CardContent>
            </Box>
        </Card>
        ))}
      </Grid>
  );
}
