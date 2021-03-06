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
  for (let i = 0; i < data.grade_structure.length; i++) {
    sum += data.grade_structure[i].point;
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
  if (data.grade_structure === '403') {
    return (
      <Navigate to="/" />
    )
  }
  if (data.grade_structure !== '403') {
    structure = data.grade_structure.map((data) =>
      <tr>
        <td>{data.name} ({Math.round(100 * data.point / sum)}%)</td>
        <td style={{ textAlign: "center" }}>{data.point}</td>
      </tr>
    )
  }


  const seeComment = (datainp) => {
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
  const closeComment = () => {
    setIsOpenComment(!isOpenComment);
    setIdRevewOpen(0);
    setDetailReview([]);
  }

  const submitGrade = () => {
    let flag = true;
    const gradeInp = gradeReview;
    if (gradeInp == '') {
      window.alert('??i???m kh??ng ???????c r???ng');
      flag = false;
    }
    let realGrade = parseFloat(gradeInp);
    if (isNaN(gradeInp)) {
      window.alert("??i???m b???n nh???p kh??ng ph???i l?? s???");
      flag = false;
    }
    if (realGrade > 10 || realGrade < 0) {
      window.alert("??i???m b???n nh???p ph???i thu???c kho???ng [0,10]");
      flag = false;
    }
    if (flag == true) {
      //send notification
      props.socket.emit('sendFinalGradefromTeacher', {
        access_token: actoken,
        id_class: props.idclass,
        id_assignment: detailReview.id_assignment,
        id_student: detailReview.student_id,
      })
      //Lay review's detail
      console.log("Grade trong submit test n??: ", detailReview.id_assignment, realGrade, detailReview.student_id);
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
    if (contentComment == '') {
      window.alert('B???n ch??a nh???p b??nh lu???n');
      flag = false;
    }
    if (flag == true) {
      //send notification
      props.socket.emit('sendComment', {
        access_token: actoken,
        id_review: detailReview.id_review
      })

      //Submit comment v?? thay ?????i commentList
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
  if (props.isTeacher) {
    return (
      <div>
        <Container sx={{ paddingLeft: "10px", paddingRight: "10px", marginLeft: "30px" }}>
          <h1> {data.name}</h1>
          {data.info}
        </Container>
        <br />
        <div className="row" >
          <div className="col-md-3">
            {props.isTeacher &&
              <Container sx={{ paddingLeft: "10px", paddingRight: "10px", marginLeft: "30px" }}>
                <b>Class code: {data.code}</b>
              </Container>}
            <br />
            <Container sx={{ paddingLeft: "10px", paddingRight: "10px", marginLeft: "30px" }}>
              <table border="0" style={{ maxWidth: "400px" }}>
                <tr>
                  <th width="75%">Th??nh ph???n</th>
                  <th width="25%" style={{ textAlign: "center" }}>??i???m</th>
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
                      Ph??c kh???o: {detailReview.name_assignment} <br />
                      ??i???m l??c ?????u: {detailReview.current_grade} - ??i???m k??? v???ng: {detailReview.expect_grade} <br />
                      Gi???i th??ch: {detailReview.explain}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    {data.status == 1 && <Button variant="text">???? x??? l??</Button>}
                    {data.status == -1 && <Button variant="text">Ch??a x??? l??</Button>}
                    <Button variant="text" onClick={() => closeComment()}>????ng b??nh lu???n</Button>

                  </CardActions>

                </Card>
              </Card>
              <Card style={{ paddingLeft: "10px", marginLeft: "25px", marginRight: "25px" }}>
                <table   >
                  <div style={{ margin: "20px" }}>
                    <div style={{ fontWeight: "bold", fontSize: "24px" }}>
                      Ph??c kh???o - Sinh vi??n {detailReview.student_name}
                    </div>
                    <br />
                    <div>
                      <tr>
                        <th>
                          <div>

                            {detailReview.name_assignment}: {detailReview.current_grade} ??i???m
                            <br />
                            <div width='50%' style={{ marginLeft: "40px" }}>
                              <TextField
                                id="expectation_grade"
                                label="??i???m k??? v???ng "
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
                                label="Gi???i th??ch"
                                id="explanation_message"
                                variant="standard"
                                value={detailReview.explain}
                                multiline
                                focused
                                InputProps={{
                                  readOnly: true,
                                }} />
                              <br />
                              <br />

                            </div>
                          </div>
                        </th>
                        <th>
                          <div>
                            <div style={{ fontWeight: "bold", color: "green" }}>
                              Ph???n h???i c???a gi??o vi??n
                            </div>
                            <div width='50%' style={{ marginLeft: "40px" }}>
                              <TextField
                                onChange={handleChangeGrade}
                                id="expectation_grade"
                                label="??i???m sau ph??c kh???o "
                                sx={{ width: 'auto', marginTop: "10px" }}
                                variant="standard"
                                value={gradeReview}
                                focused
                                color="success"

                              />
                              <br /><br />
                              {detailReview.status !== 1 && <Button color="success" variant="contained" endIcon={<SendIcon />}
                                onClick={() => submitGrade()}>
                                G???i
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
                        <div style={{ fontWeight: "bold", color: "green" }}>
                          B??nh lu???n
                        </div>
                      </tr>
                      <br />
                      <tr >
                        {getComment.length > 0 && getComment.map(onecomment =>



                          <tr><br />
                            <Stack direction="row" spacing={2}>
                              <Avatar sx={{ bgcolor: deepOrange[500] }}>Ava</Avatar>
                              <TextField
                                id="inpcomment"
                                label={`${onecomment.student?.full_name} - ${onecomment.create_time}`}
                                sx={{ width: '600px', marginTop: "10px" }}
                                value={onecomment.content}
                                color="info"
                                variant="standard"
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                            </Stack>
                          </tr>

                        )}
                      </tr>

                      {detailReview.status !== 1 &&


                        <tr>
                          <div className="col-8" width='75%' style={{ marginLeft: "55px" }}>
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
                          <div className="col-4" style={{ marginTop: "20px", marginLeft: "55px" }} >
                            <Button variant="contained" endIcon={<SendIcon />}
                              onClick={() => submitComment(detailReview.id_review)}>
                              G???i
                            </Button>
                          </div>
                        </tr>
                      }
                    </div>
                  </div>
                </table>
              </Card>
            </div>
          }
          {!isOpenComment &&
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
                    <Button variant="text">????ng b??i vi???t</Button>
                  </CardActions>

                </Card>
                {data.news.map((data) =>
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
                        Ph??c kh???o: {data.name_assignment} <br />
                        ??i???m l??c ?????u: {data.current_grade} - ??i???m k??? v???ng: {data.expect_grade} <br />
                        Gi???i th??ch: {data.explain}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      {data.status == 1 && <Button variant="text">???? x??? l??</Button>}
                      {data.status == -1 && <Button variant="text">Ch??a x??? l??</Button>}
                      <Button variant="text" onClick={() => seeComment(data)}>Xem b??nh lu???n</Button>

                    </CardActions>

                  </Card>)}
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
                  title='Nguy???n Huy Kh??nh'
                  subheader='14 - 1 - 2022 18:15'
                />

                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    L???p ???????c ngh??? t???t t??? ng??y 21/1/2022
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton>
                    <FavoriteIcon />
                  </IconButton>

                  <IconButton>
                    <ShareIcon />
                  </IconButton>

                </CardActions>

              </Card>
              </Card>
            </div>}
        </div>

      </div>

    )

  }
  else {
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
              <table border="0" style={{ maxWidth: "400px" }}>
                <tr>
                  <th width="75%">Th??nh ph???n</th>
                  <th width="25%" style={{ textAlign: "center" }}>??i???m</th>
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
                  <Button variant="text">????ng b??i vi???t</Button>
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
                  title='Nguy???n Huy Kh??nh'
                  subheader='14 - 1 - 2022 18:15'
                />

                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    L???p n???p b??i ki???m tra
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton>
                    <FavoriteIcon />
                  </IconButton>

                  <IconButton>
                    <ShareIcon />
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
                  title='Nguy???n Huy Kh??nh'
                  subheader='14 - 1 - 2022 18:15'
                />

                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    L???p ???????c ngh??? t???t t??? ng??y 21/1/2022
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton>
                    <FavoriteIcon />
                  </IconButton>

                  <IconButton>
                    <ShareIcon />
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

