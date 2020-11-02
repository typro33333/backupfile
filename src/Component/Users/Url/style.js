import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
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
      variant:"contained",
      minWidth:"120px",
      minHeight:"40px"
    },
    root_chip: {
      listStyle: "none",
      padding: theme.spacing(0.5),
      margin: 0
    },
    chip: {
      margin: theme.spacing(0.5)
    },
    text:{
      minHeight:"40px"
    }
  }));