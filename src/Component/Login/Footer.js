import React from 'react';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export default function footer(props){
    
    return(
        <div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </div>
    )
}
function Copyright() {

    return (
      <Typography variant="body2" align="center" style={{color:"white"}}>
        {'Copyright © '}
        <Link color="inherit" href="https://epsilo.io/">
          <span style={{textDecorationLine:"underline"}}>Epsilo</span>
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }