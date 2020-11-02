import React from 'react';
import { Link } from "@material-ui/core";
import { Breadcrumbs } from "@material-ui/core";


export default function(props) {
    return (
        <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Link 
            style={{color:"black"}} 
            variant='caption'
            href="/Sim">
                {props.title}
            </Link>
            <Link 
            style={{color:"black"}} 
            variant='caption' 
            href={props.href}>
                {props.title1}
            </Link>
            <Link
            color = "textPrimary"
            variant='caption'
            >
                {props.title2}
            </Link>
        </Breadcrumbs>
        )
}