import React from 'react';
import {Button} from '@material-ui/core'
function Btn(props){

    return(
    <Button variant="contained" color={props.color} onClick = {props.onClick}>
        {props.title}
    </Button>
    )
}

export default Btn