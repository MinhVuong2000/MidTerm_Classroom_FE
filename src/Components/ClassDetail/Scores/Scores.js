import * as React from 'react';

import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from "react";
import { DOMAIN_API, DOMAIN_FE } from '../../../config/const';
import DownloadButton from '../../DownloadButton/DownloadButton';
import StudentListImport from '../../ImportFile/StudentListImport/StudentListImport';
import GradeAssignmentImport from '../../ImportFile/GradeAssignmentImport/GradeAssignmentImport';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { styled, alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Switch from '@mui/material/Switch';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import EditIcon from '@mui/icons-material/Edit';

import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';


// function generate(element) {
//     return [0, 1, 2].map((value) =>
//         React.cloneElement(element, {
//             key: value,
//         }),
//     );
// }



// const Demo = styled('div')(({ theme }) => ({
//     backgroundColor: theme.palette.background.paper,
// }));

// export default function Member({ idclass, isTeacher, class_name }) {
//     const [error, setError] = useState(null);
//     const [isLoaded, setIsLoaded] = useState(false);
//     const [email, setEmail] = useState('');
//     const [teachers, setTeachers] = useState([]);
//     const [students, setStudents] = useState([]);
//     const [checkTeacher, setCheckTeacher] = useState(false);
//     let actoken = localStorage.access_token;
//     const url = DOMAIN_API + `classes/detail/${idclass}`;
    
//     useEffect(() => {
//         fetch(url, {
//             method: "GET",
//             headers: new Headers({
//                 "x-access-token": actoken
//             })
//         })
//             .then(res => res.json())
//             .then(
//                 (result) => {

//                     if (result != null) {
//                         if (result.message) {
//                             console.log(result.message);
//                             setIsLoaded(true);
//                         }
//                         else {
//                             setIsLoaded(true);
//                             setTeachers(result.list_teacher);
//                             setStudents(result.list_student);
//                             if (result.isTeacher) {
//                                 setCheckTeacher(true);
//                             }
//                         }
//                     }
//                 },
//                 (error) => {
//                     setIsLoaded(true);
//                     setError(error);
//                 }
//             )
//     }, [])
//     if (error) {
//         return <div>Error: {error.message}</div>;
//     } else if (!isLoaded) {
//         return <div>Loading...</div>;
//     } else {
//         console.log('is teacher true ne', checkTeacher);
//         console.log('List student', students);
//         if (checkTeacher) {
//             return (
//                 <div className='container'>
//                     <div className="card" style={{paddingLeft: "10px", paddingRight: "10px"}}>
//                     <DownloadButton purpose='grade_assignment'/>
//                     <GradeAssignmentImport setStudents={setStudents} students_ids={students.map(student=>student.id_uni)} id_class={idclass} id_assignment={4}/>
//                     <div className="row" >
                        
//                         <div style={{marginTop: "10px"}}>
//                         <h3>Danh sách thành viên</h3>
//                         </div>
//                         <Grid container spacing={2}>
                        
//                             <Grid item xs={12} md={6}>
//                                 <Typography sx={{ mt: 2, mb: 2 }} variant="h6" component="div">
//                                     Sinh viên
//                                 </Typography>
//                                 <Demo>
//                                     <List>
//                                         {students.map(std =>
//                                             <ListItem>
//                                                 <ListItemAvatar>
//                                                     <Avatar>
//                                                         Ava
//                                                     </Avatar>
//                                                 </ListItemAvatar>
//                                                 <ListItemText>{std.full_name}</ListItemText>
//                                             </ListItem>
//                                         )}
//                                     </List>
//                                 </Demo>
//                             </Grid>
//                         </Grid>
//                     </div>
//                     </div>
//                 </div>
//             )
//         }
//         else {
//             return (
//                 <div className="row" >
//                     <Grid container spacing={2}>
//                         <Grid item xs={12} md={6}>
//                             <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
//                                 Giảng viên
//                             </Typography>
//                             <Demo>
//                                 <List >
//                                     {teachers.map(teacher =>
//                                         <ListItem>
//                                             <ListItemAvatar>
//                                                 <Avatar>
//                                                     Ava
//                                                 </Avatar>
//                                             </ListItemAvatar>
//                                             <ListItemText>{teacher.full_name}</ListItemText>
//                                         </ListItem>
//                                     )}
//                                 </List>
//                             </Demo>
//                         </Grid>
//                         <Grid item xs={12} md={6}>
//                             <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
//                                 Sinh viên
//                             </Typography>
//                             <Demo>
//                                 <List>
//                                     {students.map(std =>
//                                         <ListItem>
//                                             <ListItemAvatar>
//                                                 <Avatar>
//                                                     Ava
//                                                 </Avatar>
//                                             </ListItemAvatar>
//                                             <ListItemText>{std.full_name}</ListItemText>
//                                         </ListItem>
//                                     )}
//                                 </List>
//                             </Demo>
//                         </Grid>
//                     </Grid>
//                 </div>
//             )
//         }

//     }
// }

function createData(name, thuyettrinh, baitap, giuaky, cuoiky) {
    return {
        name,
        thuyettrinh,
        baitap,
        giuaky,
        cuoiky,
    };
}

const rows = [
    createData('Võ Xuân Đức Thắng', 9, 9, 9, 9),
    createData('Lê Nguyễn Tuyết Chinh', 9, 9, 9, 9),
    createData('Nguyễn Phạm Minh Dượng', 9, 9, 9, 9),
    createData('Lê Dăn Đạt', 9, 9, 9, 9),
    createData('Nguyễn Diễm My', 9, 9, 9, 9),
    createData('Nguyễn Văn A', 10, 8, 9, 7),
    createData('Nguyễn Văn B', 9, 6, 10, 9),
    createData('Nguyễn Văn C', 9, 9, 9, 9),
    createData('Nguyễn Văn D', 9, 9, 9, 9),
    createData('Nguyễn Văn E', 9, 9, 9, 10),
    createData('Nguyễn Văn F', 9, 9, 9, 9),
    createData('Nguyễn Văn G', 9, 9, 9, 9),
    createData('Nguyễn Văn H', 9, 9, 9, 9),
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'thuyettrinh',
        numeric: true,
        disablePadding: false,
        label: 'Thuyết trình',
    },
    {
        id: 'baitap',
        numeric: true,
        disablePadding: false,
        label: 'Bài tập',
    },
    {
        id: 'giuaky',
        numeric: true,
        disablePadding: false,
        label: 'Giữa kỳ',
    },
    {
        id: 'cuoiky',
        numeric: true,
        disablePadding: false,
        label: 'Cuối kỳ',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};



const EnhancedTableToolbar = (props) => {
    const { numSelected, selected } = props;
    const handleClickEdit = (event, a) => {
        //const a = selected;
        console.log("@@@@@@", a)
        //alert(a)
    };
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} học viên được chọn
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Lớp PTUDWNC
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Chỉnh sửa">
                    <IconButton >
                        <EditIcon onClick={(event) => handleClickEdit(event, selected)} />
                    </IconButton>
                </Tooltip>
            ) : (
<div style={{position: "absolute",right:"5px"}} >

                <Tooltip title="Download">
                    <IconButton>
                        <FileDownloadIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Upload">
                    <IconButton>
                        <FileUploadIcon />
                    </IconButton>
                </Tooltip>
                </div>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function Scores() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} selected={selected} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.name)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.thuyettrinh}</TableCell>
                                            <TableCell align="right">{row.baitap}</TableCell>
                                            <TableCell align="right">{row.giuaky}</TableCell>
                                            <TableCell align="right">{row.cuoiky}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                
                <TablePagination
                    
                    rowsPerPageOptions={[10, 20,30]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            
            </Paper>
            {/* <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            /> */}
        </Box>
    );
}
