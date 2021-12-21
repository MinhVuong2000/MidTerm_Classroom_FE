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
import { ExportReactCSV } from '../../ExportFile/GradeAssignmentExport/GradeAssignmentExport';
import Edit from './Edit';
/*<DownloadButton purpose='grade_assignment'/>
  <GradeAssignmentImport setStudents={setStudents} students_ids={students.map(student=>student.id_uni)} id_class={idclass} id_assignment={4}/>*/

function createData(board, isteacher) {
    console.log('grade board sau khi change: ', board)
    if(isteacher){
        if(board !=null){
            let listStudent = board.listStudentGrade;
            let listtemp = []
            for (let i = 0; i < listStudent.length; i++){
                let tempStu = {};
                tempStu.name = listStudent[i].username;
                tempStu.idUserStudent = listStudent[i].id_uni_user;
                tempStu.listGrade = [];
                for(let j = 0; j<listStudent[i].assignmentGrade.length; j++){
                    tempStu.listGrade.push(listStudent[i].assignmentGrade[j])
                }
                listtemp.push(tempStu);
            }
            console.log("List temp trong create data: ", listtemp);
            return listtemp;
        }
        else{
            console.log("Board bi null: ", board);
            return null;
        }
        
    }
    else{
        return board;
    }
    
}

function createListButtonName(board, isteacher) {
    console.log('grade board sau khi change: ', board)
    if(isteacher){
        if(board !=null){
            let lassignment = board.listAssignment;
            let listtemp = []
            for (let i = 0; i < lassignment.length - 1; i++){
                listtemp.push(lassignment[i]);
            }
            return listtemp;
        }
        else{
            console.log("Board bi null: ", board);
            return null;
        }
        
    }
    else{
        return null;
    }
    
}
function createStudentData(gradeboard){
    return gradeboard;
}

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

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, listHeader } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    let headCells = [
        {
            id: 'name',
            numeric: false,
            disablePadding: true,
            label: 'Tên học sinh',
        },
    ];
    listHeader.map((item) => {
        let temp = {};
        temp.id = item.name;
        temp.numeric = false;
        temp.disablePadding = true;
        temp.label = item.name;
        temp.pointStructure = item.point + ' điểm';
        headCells.push(temp);
    });
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
                            <br/>
                            {headCell.pointStructure}
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
    listHeader: PropTypes.array.isRequired,
};



const EnhancedTableToolbar = (props) => {
    const [edit, setEdit]=React.useState(false);
    const { numSelected, selected, classname, afterEdit } = props;
    console.log("data select nè:",selected)
   const [numSelec, setNumSelec]=React.useState(numSelected);

    const handleAfterEdit=(value) =>{
        afterEdit(value);
    }

    const handleClickEdit = (event, a) => {
        //const a = selected;
        //console.log("@@@@@@", a)
        //alert("edit")
        setEdit(true)
    };
    return (
        <div>  {edit ? <Edit rowSelected={selected}  Swi={(value,handleSelected) =>{setEdit(value); handleAfterEdit(handleSelected) }}/> :
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
                    Lớp {classname}
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
}
        </div>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function Scores({idclass, isTeacher, class_name, grade_board, students}) {
    const [rowSelected, setRowSelected]=React.useState([]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [gradeboard, setGradeBoard] = React.useState(grade_board);
    const [listStudent, setListStudent] = React.useState(students);
    const [listShowAssignment, setListShowAssignment] = React.useState([]);
    const rows = createData(gradeboard, isTeacher);
    const listAssignment = createListButtonName(grade_board, isTeacher);
    let actoken = localStorage.access_token;
    useEffect(() => {
        fetch(DOMAIN_API + `classes/detail/${idclass}/assignments/getgradeboard`, {
            method: "POST",
            headers: new Headers({
                "x-access-token": actoken,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                id_class: idclass,
            })
          })
              .then(res => res.json())
              .then(
                  (result3) => {
                      console.log("Thay doi vi tri assignment:", result3);
                      setGradeBoard(result3);
                      setListStudent(result3.listStudentGrade);
                      //setIsLoaded(true);
                  },
                  (error) => {
                      console.log("Error getGradeBoard in import grade assignment");
                     
                  }
              )
        //Lay danh sach cac assignment in state showGrade
        fetch(DOMAIN_API + `classes/detail/${idclass}/assignments/getlistshowgrade`, {
            method: "POST",
            headers: new Headers({
                "x-access-token": actoken,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                id_class: idclass,
            })
          })
              .then(res => res.json())
              .then(
                  (result) => {
                      console.log("Danh sach cac assignment show grade", result);
                      setListShowAssignment(result);
                      //setIsLoaded(true);
                  },
                  (error) => {
                      console.log("Error Danh sach cac assignment show grade");
                     
                  }
              )
    }, [])


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);;
            setSelected(newSelecteds);
            setRowSelected(rows);
            return;
        }
        setSelected([]);
        setRowSelected([]);
    };

    const handleClick = (event, name, row) => {
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


        const rowselectedIndex = rowSelected.indexOf(row);
        let newRowSelected = [];

        if (rowselectedIndex === -1) {
            newRowSelected = newRowSelected.concat(rowSelected, row);
        } else if (rowselectedIndex === 0) {
            newRowSelected = newRowSelected.concat(rowSelected.slice(1));
        } else if (rowselectedIndex === rowSelected.length - 1) {
            newRowSelected = newRowSelected.concat(rowSelected.slice(0, -1));
        } else if (rowselectedIndex > 0) {
            newRowSelected = newRowSelected.concat(
                rowSelected.slice(0, rowselectedIndex),
                rowSelected.slice(rowselectedIndex + 1),
            );
        }

        setRowSelected(newRowSelected);
    };

    const handleChangeStateShow = (event, idAssign) => {
        if(listShowAssignment.includes(idAssign)){
            console.log("List co include: ", listShowAssignment)
            
            fetch(DOMAIN_API + `classes/detail/${idclass}/assignments/updateshowstate`, {
                method: "POST",
                headers: new Headers({
                    "x-access-token": actoken,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    id_class: idclass,
                    id_assignment: idAssign,
                    statechange: false
                })
              })
                  .then(res => res.json())
                  .then(
                      (result) => {
                          console.log("Danh sach cac assignment updateshowstate", result);
                          setListShowAssignment(result);
                          //setIsLoaded(true);
                      },
                      (error) => {
                          console.log("Error Danh sach cac assignment updateshowstate");
                         
                      }
                  )
        }
        else{
            fetch(DOMAIN_API + `classes/detail/${idclass}/assignments/updateshowstate`, {
                method: "POST",
                headers: new Headers({
                    "x-access-token": actoken,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    id_class: idclass,
                    id_assignment: idAssign,
                    statechange: true
                })
              })
                  .then(res => res.json())
                  .then(
                      (result) => {
                          console.log("Danh sach cac assignment updateshowstate", result);
                          setListShowAssignment(result);
                          //setIsLoaded(true);
                      },
                      (error) => {
                          console.log("Error Danh sach cac assignment updateshowstate");
                         
                      }
                  )
        }
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

    const handleAfterEdit=(value)=>{
        if(value===0)
        {
            setSelected([]);
            setRowSelected([]);
        }
    }

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    if(isTeacher){
        
        return (
            <Box sx={{ width: '100%' }}>
                {rows==null &&
                <div className="col-md-4 center">
                    Không có bài tập hoặc thành viên nào trong lớp học!
                </div>}
                {rows &&
                <div className="col-md-4 center">
                    <DownloadButton purpose='grade_assignment'/>
                </div>}
                
                {rows && 
                <div>
                    {listAssignment.map(row =>
                        <GradeAssignmentImport setGradeBoard={setGradeBoard} students_ids={listStudent.map(student=>student.id_uni_user)} id_class={idclass} id_assignment={row.idAssignment} name = {row.name}/>
                    )}
                    
                </div>
                }

                {rows &&
                <div className="col-md-4 center">
                    <ExportReactCSV csvData={gradeboard} fileName={'GradeBoard'} />
                </div>}

                {rows && 
                <div className="row">
                    {listAssignment.map(row =>
                        <Button onClick={(event) => handleChangeStateShow(event, row.idAssignment)} variant="contained" >
                            {row.name}: 
                            {`${listShowAssignment.includes(row.idAssignment) ? ' Đã public điểm' : ' Chưa public điểm'}`}
                        </Button>
                    )}
                    
                </div>
                }

                {rows && 
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length} selected={rowSelected} classname = {class_name}  afterEdit={(value)=>handleAfterEdit(value)}  />
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
                                listHeader = {gradeboard.listAssignment}
                            />
                            <TableBody>
                                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                     rows.slice().sort(getComparator(order, orderBy)) */}
                                {stableSort(rows, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.name);
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        let listTableCell = [];
                                        listTableCell.push(<TableCell
                                                                component="th"
                                                                id={labelId}
                                                                scope="row"
                                                                padding="none"
                                                            >
                                                                {row.name}
                                                            </TableCell>);
                                        for (let i = 0; i < row.listGrade.length; i++){
                                            //let point = row.listGrade[i];
                                            let point = row.listGrade[i].gradeAssignment;
                                            listTableCell.push(<TableCell align="left">{point}</TableCell>);
                                        }
                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, row.name, row)}
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
                                                {listTableCell}
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
                
                </Paper>}
                {/* <FormControlLabel
                    control={<Switch checked={dense} onChange={handleChangeDense} />}
                    label="Dense padding"
                /> */}
            </Box>
        );
    }
    else{
        //Xử lý UI show điểm ở đây
        //Rows có dạng: [{nameAssignment: "name1", gradeAssignment: point1}, {nameAssignment: "name2", gradeAssignment: point2}]
        return(
            <Grid container spacing={1}  >
                {rows.map(row =>
                    <Grid item xs={6}>
                        <ListItem>
                            <ListItemText>{row.nameAssignment}: {row.gradeAssignment}</ListItemText>
                        </ListItem>
                    </Grid>
                )}
            </Grid>
        );
    }
    
}
