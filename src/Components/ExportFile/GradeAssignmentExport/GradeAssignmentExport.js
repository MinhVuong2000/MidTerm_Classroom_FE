import React from 'react'
import Button from '@mui/material/Button';
import { CSVLink } from 'react-csv'

export const ExportReactCSV = ({csvData, fileName}) => {
    const listStudent = csvData.listStudentGrade;
    const listAssignment = csvData.listAssignment;
    let custs = []
    console.log("List Student ",listStudent[0].username);
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
        <Button variant="warning">
            <CSVLink data={custs} filename={fileName}>Export</CSVLink>
        </Button>
    )
}