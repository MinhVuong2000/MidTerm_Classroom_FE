import * as React from 'react';
import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
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
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { DOMAIN_API } from '../../../config/const';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { Navigate } from 'react-router-dom';


export default function News(props) {
  const [isOpenComment, setIsOpenComment] = React.useState(false);
  const [idRevewOpen, setIdRevewOpen] = React.useState(0);
  const [getComment, setGetComment] = React.useState([]);
  const [detailReview, setDetailReview] = React.useState([]);
  const [contentComment, setContentComment] = React.useState('');
  const [gradeReview, setGradeReview] = React.useState();
  const [username, setUsername] = React.useState('');

  console.log("props ne:   ", props.data);
  let actoken = localStorage.getItem('access_token');
  const data = props.data;
  let sum = 0;
  for( let i = 0; i< data.grade_structure.length; i++){
    sum+=data.grade_structure[i].point;
  }
  useEffect(() => {
    //Get user's infor in this class
    fetch(DOMAIN_API + `classes/detail/${props.idclass}/userinfor`, {
      method: "POST",
      headers: new Headers({
          "x-access-token": actoken,
          'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
          id_class: props.idclass,
      })
  })
      .then(res => res.json())
      .then(
          (result) => {
              console.log("Get user full name: ", result);
              setUsername(result);
              //setIsLoaded(true);
          },
          (error) => {
              console.log("Error getListComment in Review");

          }
      )
  }, [])

  let structure = [];
  console.log("Structure: ", data.grade_structure.length)
  if(data.grade_structure === '403'){
    return (
      <Navigate to="/"/>
  )
  }
  if(data.grade_structure !== '403'){
    structure = data.grade_structure.map((data)=>
      <tr>
        <td>{data.name} ({Math.round(100*data.point/sum)}%)</td>
        <td style={{textAlign :"center"}}>{data.point}</td>
      </tr>
    )
  }
  
  
  const seeComment=(datainp) =>{
      setIsOpenComment(!isOpenComment);
      setIdRevewOpen(datainp.id_review);
      setDetailReview(datainp);
      //Get grade after review
    fetch(DOMAIN_API + `classes/detail/${props.idclass}/assignments/teachergradeafter`, {
        method: "POST",
        headers: new Headers({
            "x-access-token": actoken,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            id_class: props.idclass,
            id_assignment: datainp.id_assignment,
            id_review: datainp.id_review,
        })
    })
        .then(res => res.json())
        .then(
            (result) => {
                console.log("Get grade after review teacher news: ", result);
                setGradeReview(result);
                //setIsLoaded(true);
            },
            (error) => {
                console.log("Error grade after review teacher news:");

            }
        )
        
      fetch(DOMAIN_API + `classes/detail/${props.idclass}/assignments/teacherlistcomment`, {
          method: "POST",
          headers: new Headers({
              "x-access-token": actoken,
              'Content-Type': 'application/json'
          }),
          body: JSON.stringify({
              id_assignment: datainp.id_assignment,
              id_review: datainp.id_review,
          })
      })
          .then(res => res.json())
          .then(
              (result) => {
                  console.log("Get list comment teacher news: ", result);
                  setGetComment(result);
                  //setIsLoaded(true);
              },
              (error) => {
                  console.log("Error getListComment in Teacher News");

              }
          )
    }
    const closeComment=() =>{
      setIsOpenComment(!isOpenComment);
      setIdRevewOpen(0);
      setDetailReview([]);
    }

    const submitGrade=() =>{
      let flag = true;
      const gradeInp = gradeReview;
      if(gradeInp == ''){
          window.alert('Điểm không được rỗng');
          flag=false;
      }
      let realGrade = parseFloat(gradeInp);
      if(isNaN(gradeInp)){
          window.alert("Điểm bạn nhập không phải là số");
          flag=false;
      }
      if(realGrade > 10 || realGrade < 0){
          window.alert("Điểm bạn nhập phải thuộc khoảng [0,10]");
          flag=false;
      }
      if(flag == true){
        //send notification
        props.socket.emit('sendFinalGradefromTeacher', {
          access_token: actoken,
          id_class: props.idclass,
          id_assignment: detailReview.id_assignment,
          id_student: detailReview.student_id,
        })
         //Lay review's detail
        console.log("Grade trong submit test nè: ", detailReview.id_assignment, realGrade, detailReview.student_id);
        fetch(DOMAIN_API + `classes/detail/${props.idclass}/assignments/teachersubmitgrade`, {
            method: "POST",
            headers: new Headers({
                "x-access-token": actoken,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                id_class: props.idclass,
                id_assignment: detailReview.id_assignment,
                teacher_grade: realGrade,
                student_id: detailReview.student_id,
                id_review: detailReview.id_review,
            })
        })
          .then(res => res.json())
          .then(
              (result) => {
                  console.log("Grade after review: ", result);
                  setGradeReview(result);
                  detailReview.status = 1;
                  //setIsLoaded(true);
              },
              (error) => {
                  console.log("Error get grade after teacher review");

              }
          )
      }
    }
    function handleChangeGrade(event) {
      setGradeReview(event.target.value);
    }
    function submitComment() {
      let flag = true;
      if(contentComment == ''){
          window.alert('Bạn chưa nhập bình luận');
          flag=false;
      }
      if(flag == true){
        //send notification
        props.socket.emit('sendComment', {
          access_token: actoken, 
          id_review: detailReview.id_review
        })

        //Submit comment và thay đổi commentList
      fetch(DOMAIN_API + `classes/detail/${props.idclass}/assignments/submitcomment`, {
        method: "POST",
        headers: new Headers({
            "x-access-token": actoken,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            contentComment: contentComment,
            id_review: detailReview.id_review
        })
    })
        .then(res => res.json())
        .then(
            (result) => {
                console.log("Submit comment: ", result);
                setContentComment('')
                setGetComment(result);
                //setIsLoaded(true);
            },
            (error) => {
                console.log("Error get review's detail");

            }
        )
      }
  }
  function handleChangeComment(event) {
    setContentComment(event.target.value);
}
  if(props.isTeacher){
    return (
      <div>
        <Container sx={{ paddingLeft: "10px", paddingRight: "10px", marginLeft: "30px" }}>
          <h1> {data.name}</h1>
          {data.info}
        </Container>
        <br />
        <div className="row" >
          <div className="col-md-3">
            <Container sx={{ paddingLeft: "10px", paddingRight: "10px", marginLeft: "30px" }}>
              <table border="0"style={{maxWidth: "400px"}}>
                <tr>
                  <th width="75%">Thành phần</th>
                  <th width="25%"style={{textAlign :"center"}}>Điểm</th>
                </tr>
                {structure}
                
              </table>
            </Container>
          </div>
          {isOpenComment && 
          <div className="col-md-8" >
            <Card style={{ paddingLeft: "10px", marginLeft: "25px", marginRight: "25px", backgroundColor: "	#DDDDDD" }}>
              
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
                    title={detailReview.student_name}
                    subheader={detailReview.time}
                  />
  
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Phúc khảo: {detailReview.name_assignment} <br/>
                      Điểm lúc đầu: {detailReview.current_grade} - Điểm kỳ vọng: {detailReview.expect_grade} <br/>
                      Giải thích: {detailReview.explain}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    {data.status == 1 && <Button variant="text">Đã xử lý</Button>}
                    {data.status == -1 && <Button variant="text">Chưa xử lý</Button>}
                    <Button variant="text" onClick={()=>closeComment()}>Đóng bình luận</Button>
  
                  </CardActions>
  
                </Card>
            </Card>
            <Card style={{ paddingLeft: "10px", marginLeft: "25px", marginRight: "25px"}}>
            <table   >
                <div style={{ margin: "20px" }}>
                    <div style={{fontWeight:"bold", fontSize:"24px"}}>
                    Phúc khảo - Sinh viên {detailReview.student_name}
                    </div>
                    <br/>
                    <div>
                        <tr>
                            <th>
                            <div>
                              
                            {detailReview.name_assignment}: {detailReview.current_grade} điểm
                                <br />
                                <div width='50%' style={{ marginLeft: "40px" }}>
                                    <TextField
                                        id="expectation_grade"
                                        label="Điểm kỳ vọng "
                                        value={detailReview.expect_grade}
                                        sx={{ width: 'auto', marginTop: "10px" }}
                                        variant="standard"
                                        focused
                                        InputProps={{
                                            readOnly: true,
                                          }}
                                    />
                                    <br />
                                    <TextField
                                        sx={{ width: '450px', marginTop: "15px" }}
                                        label="Giải thích"
                                        id="explanation_message"
                                        variant="standard"
                                        value={detailReview.explain}
                                        multiline
                                        focused
                                        InputProps={{
                                            readOnly: true,
                                          }} />
                                    <br/>
                                    <br/>

                                </div>
                            </div>
                            </th>
                            <th>
                            <div>
                                    <div style={{fontWeight:"bold", color:"green"}}>
                                    Phản hồi của giáo viên
                                    </div>
                                    <div width='50%'style={{ marginLeft: "40px" }}>
                                        <TextField
                                            onChange={handleChangeGrade}
                                            id="expectation_grade"
                                            label="Điểm sau phúc khảo "
                                            sx={{ width: 'auto', marginTop: "10px" }}
                                            variant="standard"
                                            value={gradeReview}
                                            focused
                                            color="success"
                                            
                                        />
                                        <br /><br />
                                        {detailReview.status!==1 && <Button variant="contained" endIcon={<SendIcon />}
                                        onClick={()=>submitGrade()}>
                                            Gửi
                                        </Button>
                                        }

                                        <div style={{ marginLeft: "40px" }}>

                                        </div>
                                    </div>

                                </div>
                            </th>
                        </tr>
                        <br />
                        <tr>
                            <div style={{fontWeight:"bold", color:"green"}}>
                                Bình luận
                            </div>
                        </tr>
                        <br/>
                        <tr >
                        {getComment.length > 0 && getComment.map(onecomment =>
                        
                          <Card sx={{ maxWidth: 1000, marginLeft: "80px", margin: 'auto', marginBottom: '10px', marginTop: "10px" }}>
                            <CardHeader
                              avatar={
                                <Avatar sx={{ bgcolor: red[600] }} aria-label="recipe">
                                  Ava
                                </Avatar>
                              }
                              title={`${onecomment.student.full_name} - ${onecomment.create_time}`}
                              subheader={onecomment.content}
                            />
                          </Card>
                        )}
                        </tr>
                        
                        {detailReview.status!==1 && 
                          <tr>
                              <th>
                              <div>
                                  <div width='75%' style={{ marginLeft: "40px" }}>
                                      <TextField
                                          id="inpcomment"
                                          label={username}
                                          sx={{ width: '600px', marginTop: "10px" }}
                                          variant="standard"
                                          value={contentComment}
                                          focused
                                          color="info"
                                          onChange={handleChangeComment}
                                      />
                                  </div>
                              </div>
                              </th>
                              <th>
                              <Button variant="contained" endIcon={<SendIcon />}
                                  onClick={()=>submitComment(detailReview.id_review)}>
                                      Gửi
                                  </Button>
                              </th>
                          </tr>
                        }
                    </div>
                </div>
            </table>
            </Card>
        </div>
          }
          {!isOpenComment&&
          <div className="col-md-8" >
            <Card style={{ paddingLeft: "10px", marginLeft: "25px", marginRight: "25px", backgroundColor: "	#DDDDDD" }}>
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
                  title={username}
                />

                <CardContent>
                  <TextField
                      id="inpcomment"
                      sx={{ width: '600px', marginTop: "10px" }}
                      variant="standard"
                      value=''
                      focused
                      color="info"
                  />
                </CardContent>
                <CardActions disableSpacing>
                <Button variant="text">Đăng bài viết</Button>
                </CardActions>

              </Card>
              { data.news.map((data) =>
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
                    title={data.student_name}
                    subheader={data.time}
                  />
  
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Phúc khảo: {data.name_assignment} <br/>
                      Điểm lúc đầu: {data.current_grade} - Điểm kỳ vọng: {data.expect_grade} <br/>
                      Giải thích: {data.explain}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    {data.status == 1 && <Button variant="text">Đã xử lý</Button>}
                    {data.status == -1 && <Button variant="text">Chưa xử lý</Button>}
                    <Button variant="text" onClick={()=>seeComment(data)}>Xem bình luận</Button>
  
                  </CardActions>
  
                </Card>)}
            </Card>
          </div>}
        </div>
                  
      </div>
  
    )

  }
  else{
    return (
      <div>
        <Container sx={{ paddingLeft: "10px", paddingRight: "10px", marginLeft: "30px" }}>
          <h1> {data.name}</h1>
          {data.info}
        </Container>
        <br />
        <div className="row" >
          <div className="col-md-3">
            <Container sx={{ paddingLeft: "10px", paddingRight: "10px", marginLeft: "30px" }}>
              <table border="0"style={{maxWidth: "400px"}}>
                <tr>
                  <th width="75%">Thành phần</th>
                  <th width="25%"style={{textAlign :"center"}}>Điểm</th>
                </tr>
                {structure}
                
              </table>
            </Container>
          </div>
  
          <div className="col-md-8" >
            <Card style={{ paddingLeft: "10px", marginLeft: "25px", marginRight: "25px", backgroundColor: "	#DDDDDD" }}>
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
                    title={username}
                  />

                  <CardContent>
                    <TextField
                        id="inpcomment"
                        sx={{ width: '600px', marginTop: "10px" }}
                        variant="standard"
                        value=''
                        focused
                        color="info"
                    />
                  </CardContent>
                  <CardActions disableSpacing>
                  <Button variant="text">Đăng bài viết</Button>
                  </CardActions>

                </Card>

                <Card sx={{ maxWidth: 750, margin: 'auto', marginBottom: '20px', marginTop: "20px" }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[600] }} aria-label="recipe">
                        HK
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title= 'Nguyễn Huy Khánh'
                    subheader='14 - 1 - 2022 18:15'
                  />
  
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Lớp nộp bài kiểm tra
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                  <IconButton>
                      <FavoriteIcon/>
                    </IconButton>

                    <IconButton>
                      <ShareIcon/>
                    </IconButton>
                    
                  </CardActions>
  
                </Card>
                <Card sx={{ maxWidth: 750, margin: 'auto', marginBottom: '20px', marginTop: "20px" }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[600] }} aria-label="recipe">
                        HK
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title= 'Nguyễn Huy Khánh'
                    subheader='14 - 1 - 2022 18:15'
                  />
  
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Lớp được nghỉ tết từ ngày 21/1/2022
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                  <IconButton>
                      <FavoriteIcon/>
                    </IconButton>

                    <IconButton>
                      <ShareIcon/>
                    </IconButton>
                    
                  </CardActions>
  
                </Card>
            </Card>
          </div>
        </div>
      </div>
  
    )
  }
  
}

