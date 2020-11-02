import { withStyles , makeStyles} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
export const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);

  export const useStyles = makeStyles((theme) => ({
    root: {
      width: '80%',
    },
    appbar:{
      background:"white",
      borderRadius:"3px"
    },
    container: {
      maxHeight: 440,
    },
    button: {
      margin: theme.spacing(1),
    },
    btn:{
      paddingBottom:"10px"
    },
    widthbtn:{
        minWidth:"120px",
        minHeight:"40px"
    },
    text:{
      minHeight:"40px",
      fullWidth:false,
      marginTop:"8px"
    },
    formControl: {
      minWidth:"90px",
    },
    box:{
        paddingTop:"16px"
    },
    container_of_urlsim: {
      maxHeight: 440,
    },
  }));