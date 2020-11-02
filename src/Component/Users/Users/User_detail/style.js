import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
export const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 10000
    },
    media: {
      height: 0,
      paddingTop: "56.25%" // 16:9
    },
    avatar: {
      backgroundColor: red[500]
    },
    container: {
        maxHeight: 640,
    },
    color:{
        color:"secondary"
    }
}));

export const columnhead = [{
    id: 'Name',
    label: 'Name',
    minWidth: 170,
  },
  {
    id: 'Sim',
    label: 'Sim',
    minWidth: 170,
  },
  {
    id: 'Channel_Name',
    label: 'Channel Name',
    minWidth: 200,
  },
  {
    id: 'Country',
    label: 'Country',
    minWidth: 170,
    align:'center'
  }
]