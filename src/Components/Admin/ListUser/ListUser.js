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
import BlockIcon from '@mui/icons-material/Block';
import { red } from '@mui/material/colors';
import LockOpenIcon from '@mui/icons-material/LockOpen';


// project imports

import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/system';
//API


//component

import DetailUser from './DetailUser'



import DeleteIcon from '@mui/icons-material/Delete';
//route 
import { useNavigate } from "react-router-dom";




const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', email: "example@gmail.com", lock: true },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', email: "example@gmail.com", lock: false },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', email: "example@gmail.com", lock: true },
    { id: 4, lastName: 'Stark', firstName: 'Arya', email: "example@gmail.com", lock: false },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', email: "example@gmail.com", lock: false },
    { id: 6, lastName: 'Lannister', firstName: 'Jaime', email: "example@gmail.com", lock: false },
    { id: 7, lastName: 'Stark', firstName: 'Arya', email: "example@gmail.com", lock: false },
    { id: 8, lastName: 'Targaryen', firstName: 'Daenerys', email: "example@gmail.com", lock: false },
];

export default function ListUser() {

    const [openDetailUser, setOpenDetailUser] = React.useState(false);
    const [dataDetail, setDataDetail] = React.useState([]);


    const [state, setState] = React.useState({
        openState: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, openState } = state;
    //Lock
    const [openLockUser, setOpenLockUser] = React.useState({
        id: '',
        open: false
    });
    const handleLockUser = async () => {

        // try {

        //     const res = await ListUserAPI.remove(openLockUser.id)

        //     if (res.code === 200) {
        //         setOpenLockUser({ id: '', open: false });
        //         setState({ ...state, openState: true });
        //     }

        // } catch (error) {

        // }

        setOpenLockUser({ id: '', open: false });
        setState({ ...state, openState: true });

    }
    const actionLock = (
        <React.Fragment>
            <Button color="primary" fontWeight="bold" size="small" onClick={() => handleLockUser()}>
                Khóa
            </Button>
            <Button color="secondary" size="small" onClick={() => setOpenLockUser({ ...openLockUser, open: false })}>
                Thoát
            </Button>

        </React.Fragment>
    );
    const handleClose = () => {
        setState({ ...state, openState: false });
    };

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
                                    setOpenDetailUser(true)
                                    setDataDetail(params.row)
                                }} />
                        </IconButton>
                    </Tooltip>
                    {params.row.lock ?
                        <Tooltip title="Mở tài khoản">
                            <IconButton aria-label="edit">
                                <LockOpenIcon
                                    color="success"
                                    onClick={() => {
                                        setOpenDetailUser(true)
                                        setDataDetail(params.row)
                                    }} />
                            </IconButton>
                        </Tooltip>
                        :
                        <Tooltip title="Khóa tài khoản">
                            <IconButton aria-label="edit">
                                <BlockIcon
                                    sx={{ color: red[500] }}
                                    onClick={() => setOpenLockUser({ id: params.id, open: true, })} />
                            </IconButton>
                        </Tooltip>
                    }


                </>
        },
    ];

    return (
        <div style={{ paddingTop: "20px" }}>

            <div className='container' style={{ height: 500, width: '100%' }}>

                <DataGrid rows={rows} columns={columns} />


            </div>


            <DetailUser
                data={dataDetail}
                isOpen={openDetailUser}
                isClose={(value) => setOpenDetailUser(value)}
            />

            {/* Lock User */}

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={openLockUser.open}
                onClose={() => setOpenLockUser(false)}
                message="Bạn muốn khóa tài khoản này"
                action={actionLock}
            />

            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={state.openState}
                autoHideDuration={1000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="success" variant='filled' sx={{ width: '100%' }}>
                    Success!
                </Alert>
            </Snackbar>
        </div>

    );
}
