import { Alert, Grid, IconButton } from '@mui/material';
import * as React from 'react'

// lib

import Snackbar from '@mui/material/Snackbar';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from "react";
import { DOMAIN_API, DOMAIN_FE } from '../../../config/const';

// project imports

import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/system';
//API

//component

import DetailClass from './DetailClass'
import DeleteIcon from '@mui/icons-material/Delete';
//route 
import { useNavigate } from "react-router-dom";




const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon' , email: "example@gmail.com" },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei' ,email: "example@gmail.com"},
    { id: 3, lastName: 'Lannister', firstName: 'Jaime',email: "example@gmail.com" },
    { id: 4, lastName: 'Stark', firstName: 'Arya',email: "example@gmail.com" },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys',email: "example@gmail.com" },
    { id: 6, lastName: 'Lannister', firstName: 'Jaime' ,email: "example@gmail.com"},
    { id: 7, lastName: 'Stark', firstName: 'Arya',email: "example@gmail.com" },
    { id: 8, lastName: 'Targaryen', firstName: 'Daenerys',email: "example@gmail.com" },
];

export default function ListClass() {
    
    const [openDetailClass, setOpenDetailClass] = React.useState(false);
    const [dataDetail, setDataDetail] = React.useState([]);
    const [listClassInfo, setListClassInfo] = React.useState([]);
    let actoken = localStorage.getItem('access_token');

    const columns = [
        {
            field: 'class_name',
            headerName: 'Classname',
            flex: 2,
        },

        {
            field: 'description',
            headerName: 'Description',
            flex: 3,
        },
        {
            field: 'code',
            headerName: 'Code',
            flex: 1,
        },
        {
            field: 'create_time',
            headerName: 'Create time',
            flex: 2,
        },
        {
            field: 'actions',
            headerName: 'Action',
            flex: 1,

            editable: false,
            sortable: false,
            renderCell: (params) =>
                <>
                    <Tooltip title="Xem chi tiết">
                        <IconButton aria-label="edit">
                            <InfoIcon
                                onClick={() => {
                                    setOpenDetailClass(true)
                                    setDataDetail(params.row)
                                }} />
                        </IconButton>
                    </Tooltip>


                </>
        },
    ];
    useEffect(() => {
        fetch(DOMAIN_API + `admins/manage-classes`, {
            method: "POST",
            headers: new Headers({
                "x-access-token": actoken,
                'Content-Type': 'application/json'
            }),
        })
            .then(res => res.json())
            .then(
                (result2) => {
                    console.log("List class information", result2);
                    if(result2){
                        setListClassInfo(result2);
                    }
                    
                    //setIsLoaded(true);
                },
                (error) => {
                    console.log("Error List classes information");
    
                }
            )
    }, []);
    return (
        <div style={{ paddingTop: "20px" }}>

            <div className='container' style={{ height: 500, width: '100%' }}>
               
                <DataGrid rows={listClassInfo} columns={columns} />


            </div>


            <DetailClass
                data={dataDetail}
                isOpen={openDetailClass}
                isClose={(value) => setOpenDetailClass(value)}
            />
        </div>

    );
}
