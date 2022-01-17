import {useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import AlertDialog from '../AlertDialog/AlertDialog';
import { DOMAIN_API,
        ERROR_PERMISSIONS_TITLE,
        ERROR_PERMISSIONS_DESC} from '../../config/const';

import Google_Classroom_Logo from '../../static/images/Google_Classroom_Logo.png';


export default function Classroom({idclass, title, description, setItems}) {
  const [openErrorPermission, setOpenErrorPermission] = useState(false);
  
  function handleDeleteClass(){
    const url = DOMAIN_API + `classes/detail/${idclass}`;
    const requestOptions = {
      method: "DELETE",
      headers: new Headers({
          "x-access-token": localStorage.getItem('access_token')
      })
    }
    fetch(url, requestOptions)
            .then(res => res.json())
            .then((result) => {
                console.log("result fetch delete class",result)
                if (result=='400' || result=='401')
                    setItems(result)
                else {
                    if (result=='403'){
                        setOpenErrorPermission(()=> {return true;})
                    }
                    else{
                        setItems(result);
                    }
                }
            })
            .catch(error => console.log('Form submit error', error))
  }
  
  return (
      <Card sx={{ maxWidth: 300,
                  bgcolor: 'background.paper',
                  boxShadow: 1,
                  borderRadius: 1,
                  p: 2}}>
        <CardMedia
          component="img"
          margin = 'auto'
          image={Google_Classroom_Logo}
          alt="cover"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{width: "200px", overflow: "hidden",
                                          whiteSpace: "nowrap",textOverflow: "ellipsis"}} >
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small"><Link to={`/classes/${idclass}`} style={{textDecoration: 'none' }}>Chi tiết</Link></Button>
          <Tooltip title="Xóa">
            <Button onClick={handleDeleteClass}><DeleteIcon /></Button>
          </Tooltip>
        </CardActions>
        {openErrorPermission && <AlertDialog title={ERROR_PERMISSIONS_TITLE} msg={ERROR_PERMISSIONS_DESC} callback={() => {setOpenErrorPermission(() => {return false})}}/>}
      </Card>
  );
}