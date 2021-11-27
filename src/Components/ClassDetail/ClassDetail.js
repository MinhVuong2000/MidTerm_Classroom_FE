import * as React from 'react';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Navigate, BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
//import { New } from './News/New';

import News from './News/News';
import Member from './Member/Member';
import Scores from './Scores/Scores';
import Assignments from './Assignments/Assignments';
import { DOMAIN_API } from '../../config/const';
import { SentimentNeutralOutlined } from '@mui/icons-material';
export default function ClassDetail() {
    const [value, setValue] = React.useState(0);
    const [error, setError] = useState(null);
    const [enroll, setEnroll] = useState(true);
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [isTeacher, setIsTeacher] = useState(false);
    const [class_name, setClassname] = useState('');
    const [description, setDescription] = useState('');
    const [invitelink, setInviteLink] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [isShowNews, setIsShowNews] = React.useState(true)
    const [isShowMember, setIsShowMember] = React.useState(false)
    const [isShowScores, setIsShowScores] = React.useState(false)
    const [isShowAssignments, setIsShowAssignments] = React.useState(false)

    const {idclass} = useParams();
    let actoken = localStorage.getItem('access_token');
    
    const url = DOMAIN_API+`classes/detail/${idclass}`;
    let linkin='';
    useEffect(() => {
        fetch(url,{
            method: "GET",
            headers: new Headers({
                "x-access-token": actoken
            })
        })
        .then(res => res.json())
        .then(
            (result) => {
                
                if(result != null){
                    if(result.message){
                        console.log(result.message);
                        setEnroll(false);
                        setIsLoaded(true);
                    }
                    else{
                        console.log(result.isTeacher);
                        setIsLoaded(true);
                        setTeachers(result.list_teacher);
                        setStudents(result.list_student);
                        setClassname(result.class_name);
                        linkin = DOMAIN_API + 'classes/inviteclass/' + result.invitelink;
                        if(result.isTeacher){
                            
                            setInviteLink(linkin);
                        }
                        setDescription(result.description);
                        console.log(description);
                    }
                }
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [])
    const handleChange = (event, newValue) => {
        
        if (newValue == "0") {
            setIsShowNews(true);
            setIsShowMember(false);
            setIsShowScores(false);
            setIsShowAssignments(false);
            //console.log("======= news ======== ")
        }
        if (newValue == "1") {
            setIsShowNews(false);
            setIsShowMember(true);
            setIsShowScores(false);
            setIsShowAssignments(false);
           // console.log("======= member ========")
        }
        if (newValue == "2") {
            setIsShowNews(false);
            setIsShowMember(false);
            setIsShowScores(true);
            setIsShowAssignments(false);
            //console.log("====== score =========")
        }
        if (newValue == "3") {
            setIsShowNews(false);
            setIsShowMember(false);
            setIsShowScores(false);
            setIsShowAssignments(true);
            //console.log("====== score =========")
        }
        setValue(newValue);
        
    };

    const mockDataNew ={
        name: class_name,
        info: description,
        invite: linkin,
        news: [
            {
                user: "Khanh Nguyen Huy",
                content: "For the next meeting with Fossil to be effective, please send your feedback for the last session and your wishes for the next session in the form below.",
                time: "Nov 21"   
            },
            {
                user: "Vuong Nguyen",
                content: "For the next meeting with Fossil to be effective, please send your feedback for the last session and your wishes for the next session in the form below.",
                time: "Nov 20"   
            }
        ]
    }

    useEffect(() => {
        handleChange()
    }, []);

    if(localStorage.access_token == null){
        return (
            <div>
                <Navigate to="/login"/>
            </div>
        )
    }
    if(!enroll){
        return <div>You not enroll this class</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    } 
    else 
        if (!isLoaded) {
        return <div>Loading...</div>;
        } 
        else {
            
            return (
                <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <Tabs value={value} onChange={handleChange} centered>
                        <Tab label="Bảng tin" />
                        <Tab label="Danh sách thành viên" />
                        <Tab label="Điểm số" />
                        <Tab label="Bài tập" />
                    </Tabs>
                    <div>
                        {isShowNews && < News data={mockDataNew} />}
                        {isShowMember && < Member idclass = {idclass} isTeacher={isTeacher} class_name = {class_name}/>}
                        {isShowScores && < Scores />}
                        {isShowAssignments && < Assignments idclass = {idclass}/>}
                    </div>
                </Box>
            );
            
        }
}