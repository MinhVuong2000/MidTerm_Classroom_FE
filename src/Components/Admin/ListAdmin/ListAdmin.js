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

export default function ListAdmin() {
    const [openAddNewAdmin, setOpenAddNewAdmin] = React.useState(false);
    const [openDetailAdmin, setOpenDetailAdmin] = React.useState(false);
    const [dataDetail, setDataDetail] = React.useState([]);


    const columns = [
        {
            field: 'firstName',
            headerName: 'First name',
            flex: 2,
        },

        {
            field: 'lastName',
            headerName: 'Last name',
            flex: 2,
        },
        {
            field: 'email',
            headerName: 'Email',
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

    return (
        <div style={{ paddingTop: "20px" }}>

            <div className='container' style={{ height: 500, width: '100%' }}>
                <div style={{ paddingBottom: "10px" }}>
                    <Button variant="contained" startIcon={<AddIcon />}
                        onClick={() => {
                            setOpenAddNewAdmin(true)
                        }} >Tạo tài khoản</Button>
                </div>

                <DataGrid rows={rows} columns={columns} />


            </div>

            <AddNewAdmin
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
