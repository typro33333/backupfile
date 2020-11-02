import React from 'react';
import { Breadcrumbs } from "@material-ui/core";
import { Link } from "@material-ui/core";
export default function(props) {
    return (
        <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Link 
                variant='caption'
                style = 
                {{cursor:"pointer",
                fontSize: "12px",
                textDecoration:"none",
                color:"black"}}
            >
                {props.title}
            </Link>
            <Link
                color="inherit"
                variant='caption'
            >
                {props.title1}
            </Link>
        </Breadcrumbs>
        )
}