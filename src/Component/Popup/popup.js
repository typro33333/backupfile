import React from "react";
import './popup.css';

export default function (props){

    return(
        <div className="wrap" style ={{position:"absolute",top:0,width:"100%",zIndex:999}}>
            <div className="alert alert-danger">{props.title}
                    <button type="button" className="close" aria-label="Close" onClick = {props.onClose}>
                        <span aria-hidden="true">
                            &times;
                        </span>
                    </button>
            </div>
        </div>
    )
}; 
