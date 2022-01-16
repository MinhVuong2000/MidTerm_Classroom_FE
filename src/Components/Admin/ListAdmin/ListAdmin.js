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
import AddNewAdmin from './AddNewAdmin'
import DetailAdmin from './DetailAdmin'



import DeleteIcon from '@mui/icons-material/Delete';
//route 
import { useNavigate } from "react-router-dom";


export default function ListAdmin() {
    const [openAddNewAdmin, setOpenAddNewAdmin] = React.useState(false);
    const [openDetailAdmin, setOpenDetailAdmin] = React.useState(false);
    const [dataDetail, setDataDetail] = React.useState([]);
    const [listAdminInfo, setListAdminInfo] = React.useState([]);
    let actoken = localStorage.getItem('access_token');
    
    const [isSuperAdmin, setIsSuperAdmin] = React.useState(null)
    const columns = [
        {
            field: 'username',
            headerName: 'Username',
            flex: 2,
        },

        {
            field: 'full_name',
            headerName: 'Full name',
            flex: 2,
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 2,
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
                                    setOpenDetailAdmin(true)
                                    setDataDetail(params.row)
                                }} />
                        </IconButton>
                    </Tooltip>


                </>
        },
    ];
    useEffect(() => {
        fetch(DOMAIN_API + `admins/manage-admins`, {
            method: "POST",
            headers: new Headers({
                "x-access-token": actoken,
                'Content-Type': 'application/json'
            }),
        })
            .then(res => res.json())
            .then(
                (result2) => {
                    console.log("List admin information", result2);
                    if(result2){
                        setListAdminInfo(result2.list_admin);
                        setIsSuperAdmin(result2.is_super);
                    }
                    
                    //setIsLoaded(true);
                },
                (error) => {
                    console.log("Error List admin information");
    
                }
            )
    }, []);
    
    return (
        <div style={{ paddingTop: "20px" }}>

            <div className='container' style={{ height: 500, width: '100%' }}>
                {isSuperAdmin &&
                <div style={{ paddingBottom: "10px" }}>
                    <Button variant="contained" startIcon={<AddIcon />}
                        onClick={() => {
                            setOpenAddNewAdmin(true)
                        }} >Tạo tài khoản</Button>
                </div>}

                <DataGrid rows={listAdminInfo} columns={columns} />


            </div>

            <AddNewAdmin
                setListAdminInfo = {setListAdminInfo}
                isOpen={openAddNewAdmin}
                isClose={(value) => setOpenAddNewAdmin(value)}
            />

            <DetailAdmin
                data={dataDetail}
                isOpen={openDetailAdmin}
                isClose={(value) => setOpenDetailAdmin(value)}
            />
        </div>

    );
}
