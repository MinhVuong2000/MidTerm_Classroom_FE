import * as React from 'react';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { DOMAIN_API } from '../../../config/const';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';

export default function ReviewScore({socket, after_sent, rowAssign, idclass}) {
    const [listComment, setListComment] = React.useState([]);
    const [detailReview, setDetailReview] = React.useState([]);
    const [gradeExpect, setGradeExpect] = React.useState();
    const [explain, setExplain] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [contentComment, setContentComment] = React.useState('');
    const [gradeAfterReview, setGradeAfterReview] = React.useState(null);
    let actoken = localStorage.getItem('access_token');
    useEffect(() => {
        //Lay danh sach cac comment trong review dialog
        fetch(DOMAIN_API + `classes/detail/${idclass}/assignments/getlistcomment`, {
            method: "POST",
            headers: new Headers({
                "x-access-token": actoken,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                id_class: idclass,
                id_assignment: rowAssign.idAssignment,
            })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("Get list comment: ", result);
                    setListComment(result);
                    //setIsLoaded(true);
                },
                (error) => {
                    console.log("Error getListComment in Review");

                }
            )
        //Lay review's detail
        fetch(DOMAIN_API + `classes/detail/${idclass}/assignments/getdetailreview`, {
            method: "POST",
            headers: new Headers({
                "x-access-token": actoken,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                id_class: idclass,
                id_assignment: rowAssign.idAssignment,
            })
        })
            .then(res => res.json())
            .then(
                (result2) => {
                    console.log("Review's detail", result2);
                    if(result2.review){
                        setDetailReview(result2.review);
                        setGradeExpect(result2.review.expect_grade);
                        setExplain(result2.review.explain);
                    }
                    else{
                        setDetailReview(result2);
                    }
                    
                    //setIsLoaded(true);
                },
                (error) => {
                    console.log("Error get review's detail");

                }
            )
            //Get user's infor in this class
            fetch(DOMAIN_API + `classes/detail/${idclass}/userinfor`, {
                method: "POST",
                headers: new Headers({
                    "x-access-token": actoken,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    id_class: idclass,
                    id_assignment: rowAssign.idAssignment,
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
            //Get grade after review
            fetch(DOMAIN_API + `classes/detail/${idclass}/assignments/getgradeafter`, {
                method: "POST",
                headers: new Headers({
                    "x-access-token": actoken,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    id_class: idclass,
                    id_assignment: rowAssign.idAssignment,
                })
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log("Get grade after review: ", result);
                        setGradeAfterReview(result);
                        //setIsLoaded(true);
                    },
                    (error) => {
                        console.log("Error grade after review");

                    }
                )
    }, [])
    const afterSent=() =>{
        let flag = true;
        const gradeInp = gradeExpect;
        const explainInp = explain;
        if(gradeInp == ''){
            window.alert('??i???m kh??ng ???????c r???ng');
            flag=false;
        }
        if(explainInp == ''){
            window.alert('B???n ch??a nh???p gi???i th??ch');
            flag=false;
        }
        let realGrade = parseFloat(gradeInp);
        if(isNaN(gradeInp)){
            window.alert("??i???m b???n nh???p kh??ng ph???i l?? s???");
            flag=false;
        }
        if(realGrade > 10 || realGrade < 0){
            window.alert("??i???m b???n nh???p ph???i thu???c kho???ng [0,10]");
            flag=false;
        }
        if(flag == true){
            //Lay review's detail
            fetch(DOMAIN_API + `classes/detail/${idclass}/assignments/addreview`, {
                method: "POST",
                headers: new Headers({
                    "x-access-token": actoken,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    id_class: idclass,
                    id_assignment: rowAssign.idAssignment,
                    current: rowAssign.gradeAssignment,
                    expect: realGrade,
                    explain: explain
                })
            })
            .then(res => res.json())
            .then(
                (result) => {
                    socket.emit('sendfromStudentReview', {
                        access_token: actoken,
                        id_class: idclass,
                        id_assignment: rowAssign.idAssignment
                    });

                    console.log("Post Review: ", result);
                    setDetailReview(result.review);
                    //setIsLoaded(true);
                },
                (error) => {
                    console.log("Error get review's detail");

                }
            )
        }
    }
    function handleChangeGrade(event) {
        setGradeExpect(event.target.value);
    }
    function handleChangeExplain(event) {
        setExplain(event.target.value);
    }
    function handleChangeComment(event) {
        setContentComment(event.target.value);
    }
    function submitComment() {
        let flag = true;
        if(contentComment == ''){
            window.alert('B???n ch??a nh???p b??nh lu???n');
            flag=false;
        }
        if(flag == true){
            //Submit comment v?? thay ?????i commentList
            fetch(DOMAIN_API + `classes/detail/${idclass}/assignments/submitcomment`, {
                method: "POST",
                headers: new Headers({
                    "x-access-token": actoken,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    id_class: idclass,
                    id_assignment: rowAssign.idAssignment,
                    contentComment: contentComment,
                    id_review: detailReview.id
                })
            })
            .then(res => res.json())
            .then(
                (result) => {
                    socket.emit('sendComment', {
                        access_token: actoken,
                        id_review: detailReview.id,
                    })
                    console.log("Submit comment: ", result);
                    setContentComment('')
                    setListComment(result);
                    //setIsLoaded(true);
                },
                (error) => {
                    console.log("Error get review's detail");

                }
            )
        }
    }
    if(detailReview.length == 0){
        return(
            <div className="card">
            <table border="1"  >
                <div style={{ margin: "20px" }}>
                    <div>
                        <tr>
                            <div>
                                {rowAssign.nameAssignment}: {rowAssign.gradeAssignment} ??i???m
                                <br />
                                <div style={{ marginLeft: "40px" }}>
                                    <TextField
                                        onChange={handleChangeGrade}
                                        id="expectation_grade"
                                        label="??i???m k??? v???ng "
                                        value = {gradeExpect}
                                        sx={{ width: 'auto', marginTop: "10px" }}
                                        variant="standard"
                                        focused
                                    />
                                    <br />
                                    <TextField
                                        onChange={handleChangeExplain}
                                        value={explain}
                                        sx={{ width: '450px', marginTop: "15px" }}
                                        label="Gi???i th??ch"
                                        id="explanation_message"
                                        variant="standard"
                                        multiline
                                        focused />
                                </div>
                            </div>
                        </tr>
                    </div>
                    <br/>
                    <Button variant="contained" endIcon={<SendIcon />}
                    onClick={()=>afterSent()}>
                        G???i
                    </Button>
                </div>
            </table>
            </div>
        )
    }
    return (
        <div className="card">
            <table border="1"  >
                <div style={{ margin: "20px" }}>
                    <div style={{fontWeight:"bold", fontSize:"24px"}}>
                    Ph??c kh???o
                    </div>
                    <br/>
                    <div>
                        <tr>
                            <th>
                            <div>
                            {rowAssign.nameAssignment}: {rowAssign.gradeAssignment} ??i???m
                                <br />
                                <div width='50%' style={{ marginLeft: "40px" }}>
                                    <TextField
                                        id="expectation_grade"
                                        label="??i???m k??? v???ng "
                                        value={gradeExpect}
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
                                        value={explain}
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
                                    Ph???n h???i c???a gi??o vi??n
                                    </div>
                                    <div width='50%'style={{ marginLeft: "40px" }}>
                                        <TextField
                                            id="expectation_grade"
                                            label="??i???m sau ph??c kh???o "
                                            sx={{ width: 'auto', marginTop: "10px" }}
                                            variant="standard"
                                            value={gradeAfterReview}
                                            focused
                                            color="success"
                                            InputProps={{
                                                readOnly: true,
                                              }}
                                        />
                                        <br />
                                        

                                        <div style={{ marginLeft: "40px" }}>

                                        </div>
                                    </div>

                                </div>
                            </th>
                        </tr>
                        <br />
                        <tr>
                            <div style={{fontWeight:"bold", color:"green"}}>
                                B??nh lu???n
                            </div>
                        </tr>
                        <br/>
                        <tr>
                        {listComment.length > 0 && listComment.map(onecomment =>
                        <tr>
                            <br/>
                            <Stack direction="row" spacing={2}>
                            <Avatar sx={{ bgcolor: deepOrange[500] }}>Ava</Avatar>
                            <TextField
                                id="inpcomment"
                                label={`${onecomment.student.full_name} - ${onecomment.create_time}`}
                                sx={{ width: '800px', marginTop: "10px" }}
                                value={onecomment.content}
                                color="info"
                                variant="standard"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            </Stack>
                            <br/>
                        </tr>)}
                        </tr>
                        
                        {gradeAfterReview==null && 
                            <tr>
                                
                             
                                    <div className="col-8" width='75%' style={{ marginLeft: "55px" }}>
                                        <TextField
                                            id="inpcomment"
                                            label={username}
                                            sx={{ width: '800px', marginTop: "10px" }}
                                            variant="standard"
                                            value={contentComment}
                                            focused
                                            color="info"
                                            onChange={handleChangeComment}
                                        />
                                    </div>
                                    <div  className="col-4" style={{marginTop:"20px", marginLeft: "55px" }} >
                                    <Button variant="contained" endIcon={<SendIcon />}
                                    onClick={()=>submitComment()}>
                                        G???i
                                    </Button>
                                    </div>
                                
                            
                                
                            </tr>
                        }
                    </div>
                </div>
            </table>
        </div>

    );
}