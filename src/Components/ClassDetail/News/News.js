import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Container from '@mui/material/Container';




const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support. `;


export default function News(props) {
  console.log("props ne:   ", props.data);
  const data = props.data;
  const list_news = data.news.map((data) =>
    <Card sx={{ maxWidth: 750, margin: 'auto', marginBottom: '20px', marginTop: "20px" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[600] }} aria-label="recipe">
            Ava
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={data.user}
        subheader={data.time}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {data.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

      </CardActions>

    </Card>)

  return (
    <div>
      <Container sx={{ paddingLeft: "10px", paddingRight: "10px", marginLeft: "30px" }}>
        <h1> {data.name}</h1>
        {data.info}
      </Container>
      <br />

      {/* <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 128,
            height: 128,
          },
        }}>
               </Box> */}
      <div className="row" >
        <div className="col-md-3">
          <Container sx={{ paddingLeft: "10px", paddingRight: "10px", marginLeft: "30px" }}>
            <table border="0"style={{maxWidth: "400px"}}>
              <tr>
                <th width="75%">Thành phần</th>
                <th width="25%"style={{textAlign :"center"}}>Điểm</th>
              </tr>
              <tr>
                <td>Điểm bài tập</td>
                <td style={{textAlign :"center"}}>20</td>
              </tr>
              <tr>
                <td>Điểm giữa kỳ</td>
                <td style={{textAlign :"center"}}>30</td>
              </tr>
              <tr>
                <td>Điểm serrrr saasasasa  asasdaf SDALBF  asjdfk  sakjbk sakfbd asfbeksdv</td>
                <td style={{textAlign :"center"}}>10</td>
              </tr>
              <tr>
                <td>Điểm cuối kỳ</td>
                <td style={{textAlign :"center"}}>40</td>
              </tr>
            </table>
          </Container>
        </div>

        <div className="col-md-9" >
          <Card style={{ paddingLeft: "10px", marginLeft: "25px", marginRight: "25px", backgroundColor: "#0099FF" }}>
            {list_news}
          </Card>
        </div>

      </div>







    </div>

  )
}

