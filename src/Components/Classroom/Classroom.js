import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

import Google_Classroom_Logo from '../../static/images/Google_Classroom_Logo.png';


export default function Classroom({title}) {
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
          <Typography variant="body2" color="text.secondary">
            Thông tin chi tiết của khoá học ở chỗ này
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Detail</Button>
          <Button size="small">Edit</Button>
          <Tooltip title="Delete">
            <Button><DeleteIcon /></Button>
          </Tooltip>
        </CardActions>
      </Card>
  );
}