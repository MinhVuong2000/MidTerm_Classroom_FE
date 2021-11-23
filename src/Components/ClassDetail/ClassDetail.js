import * as React from 'react';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
//import { New } from './News/New';

import News from './News/News';
import Member from './Member/Member';
import Scores from './Scores/Scores';
export default function ClassDetail() {
    const [value, setValue] = React.useState(0);

    const [isShowNews, setIsShowNews] = React.useState(true)
    const [isShowMember, setIsShowMember] = React.useState(false)
    const [isShowScores, setIsShowScores] = React.useState(false)

    const {idclass} = useParams();
    const handleChange = (event, newValue) => {
        
        if (newValue == "0") {
            setIsShowNews(true);
            setIsShowMember(false);
            setIsShowScores(false);
            //console.log("======= news ======== ")
        }
        if (newValue == "1") {
            setIsShowNews(false);
            setIsShowMember(true);
            setIsShowScores(false);
           // console.log("======= member ========")
        }
        if (newValue == "2") {
            setIsShowNews(false);
            setIsShowMember(false);
            setIsShowScores(true);
            //console.log("====== score =========")
        }
        setValue(newValue);
        
    };

    const mockDataNew ={
        name: "Web nâng cao",
        info: "Trường Đại học Khoa học Tự nhiên, Đại học Quốc gia Thành phố Hồ Chí Minh là một trong những trường đại học đào tạo và nghiên cứu khoa học cơ bản & ứng dụng hàng đầu Việt Nam, trực thuộc Đại học Quốc gia Thành phố Hồ Chí Minh, được xếp vào nhóm trường đại học trọng điểm quốc gia Việt Nam",
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

    // const getDataById = async () => {
    //     try {

    //         if (id) {
    //             // const response = await API.findOne(id);
    //             // console.log("aaaa",response)                  
    //             const res_user = await axiosClient.get(`/user/${id}?fields=["$all"]`);
    //             const arr_user = res_user.results.object;

    //             arr_user.birthday = arr_user.birthday.slice(0, 10);
    //             arr_user.posts = arr_user.posts || "0";
    //             arr_user.nickname = arr_user.nickname || "Null";
    //             arr_user.user = arr_user.user || "Null";

    //             console.log("data res_user ne", arr_user)
    //             setInfoUser(arr_user);

    //             //Follower
    //             const res_follower = await axiosClient.get('/user?fields=["$all"]');
    //             const arr_follower = [];
    //             res_follower.results.objects.rows.map((val) => {
    //                 arr_follower.push({
    //                     id: val.id,
    //                     posts: val.posts,
    //                     user: val.user || "test user",
    //                     email: val.email,
    //                     fullname: val.fullname || "test full name",
    //                     phone: val.phone || "",
    //                     image: val.avatar || "langbiang-logo.png",
    //                 });
    //             });
    //             setMockDataFollower(arr_follower);

    //             //Following
    //             const res_following = await axiosClient.get('/user?fields=["$all"]');
    //             const arr_following = [];
    //             res_following.results.objects.rows.map((val) => {
    //                 arr_following.push({
    //                     id: val.id,
    //                     posts: val.posts,
    //                     user: val.user || "test user",
    //                     email: val.email,
    //                     fullname: val.fullname || "test full name",
    //                     phone: val.phone || "",
    //                     image: val.avatar || "langbiang-logo.png",
    //                 });
    //             });
    //             setMockDataFollowing(arr_following);

    //         }
    //     }
    //     catch (error) {

    //     }
    // }

    useEffect(() => {
        handleChange()
    }, []);

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Bảng tin" />
                <Tab label="Danh sách thành viên" />
                <Tab label="Điểm số" />
            </Tabs>
            <div>
                {/* {isShowNews && < News data={mockDataNew} />}
      {isShowMember && < Member data={mockDataMember} />}
      {isShowScores && < Scores data={mockData}Scores />} */}

                {isShowNews && < News data={mockDataNew} />}
                {isShowMember && < Member idclass = {idclass}/>}
                {isShowScores && < Scores />}
            </div>
        </Box>
    );
}