import React from "react";
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import GoogleLogin from 'react-google-login';
import { useHistory } from "react-router";
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
const useStyles = makeStyles((theme) => ({
    submit: {
      margin: theme.spacing(3, 0, 2),
      width: '100%',
      textAlign:"center"
    },
  }));
export default function Buttonn(props){
    const classes = useStyles();
    const [open,setOpen] = React.useState(false);
    const history = useHistory();
    const responseGoogle = async (response) => {
      console.log(response);
      var token = response.tokenId;
      const url = "http://localhost:8000/login/gmail/access-token?google_token_id="+token
      const res = await fetch(url);
      if(res.status === 200){
        const data= await res.json();
        sessionStorage.setItem('user',response.profileObj.email);
        sessionStorage.setItem('image_user',response.profileObj.imageUrl);
        sessionStorage.setItem('token',"Bearer " + data.access_token);
        sessionStorage.setItem('drawer',true);
        history.push({
          pathname:"/sim"
        })
      }
      else if(res.status === 400){
        setOpen(true);
        setTimeout(
          ()=> setOpen(false),5000
        )
    }
  }
    return(
        <div>
          <GoogleLogin 
              clientId = "54331966452-973tc56knqobhq4u6jaa2k1rmofrp6cc.apps.googleusercontent.com"
              onSuccess = {responseGoogle}
              onFailure = {responseGoogle}
              cookiePolicy ={'single_host_origin'}
              render = {renderProps =>(
                <Button
                  fullWidth
                  onClick = {renderProps.onClick}
                  disabled = {renderProps.disabled}
                  variant="contained"
                  color = "secondary"
                  style = {{color:"white"}}
                  className={classes.submit}
                >
                  <span style = {{padding: "6px 24px 0px 0"}}><EmailOutlinedIcon /> </span> 
                  <span>
                    Login With Your Company Gmail
                  </span>
                </Button>
              )}
            />
            {open? <Alert 
            style = {{position:"absolute",top:0,width:"24.3%"}}
            action ={<IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton> }
            variant="filled" 
            severity="error">
              This account doesn't belong to the Epsilo  
            </Alert> : ''}
        </div>
    )
}