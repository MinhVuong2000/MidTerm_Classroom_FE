import React from 'react'
import Button from '@mui/material/Button';
import { CSVLink } from 'react-csv'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export const ExportReactCSV = ({csvData, fileName}) => {
    const listStudent = csvData.listStudentGrade;
    const listAssignment = csvData.listAssignment;
    let custs = []
    for (let i = 0; i < listStudent.length; i++) {
        let student = listStudent[i];
        let temp = {};
        temp['Tên học sinh'] = student.username;
        for(let j = 0; j < listAssignment.length; j++){
            let headerName = listAssignment[j].name + ' (' + listAssignment[j].point + ' điểm)';
            if(student.assignmentGrade[j].gradeAssignment == null){
                temp[headerName] = ''
            }
            else{
                temp[headerName] = student.assignmentGrade[j].gradeAssignment.toString();
            }
            
        }
        custs.push(temp);
      
    }

    return (
        <Button  style={{width:"200px"}}  variant='outlined' component="label" endIcon={<ExitToAppIcon />}>
            <CSVLink style={{ textDecoration: "none"}} data={custs} filename={fileName}>Xuất bảng điểm</CSVLink>
        </Button>
    )
}