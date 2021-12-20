import { useState} from 'react';
import {Navigate} from 'react-router-dom';
import * as XLSX from 'xlsx';
import Button from '@mui/material/Button';
import UploadIcon from '@mui/icons-material/Upload';
import { DOMAIN_API, DOMAIN_FE } from '../../../config/const';


export default function GradeAssignmentImport({setGradeBoard, students_ids, id_class, id_assignment, name}){
    const [respond, setResponse] = useState(null);
    console.log("list student trong import file grade: ",students_ids);
    const handleUpload = (e) => {
        e.preventDefault();
        const f = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            /* Parse data */
            var data = e.target.result;
            let readedData = XLSX.read(data, {type: 'binary'});
            /* Get first worksheet */
            const wsname = readedData.SheetNames[0];
            const ws = readedData.Sheets[wsname];
            /* Convert array to json */
            let dataParse = XLSX.utils.sheet_to_json(ws, {header:1});
            let add_user_grade = []
            for (let i=1; i<dataParse.length; i++) {
                if (students_ids==null || students_ids.length===0 || (students_ids.includes(dataParse[i][0].toString()))){
                    add_user_grade.push({
                        grade: dataParse[i][1],
                        id_user_uni: typeof(dataParse[i][0])==="string"?dataParse[i][0]:dataParse[i][0].toString()
                    })
                }
            }
            const actoken = localStorage.getItem('access_token');
            const url = DOMAIN_API + `classes/detail/${id_class}/assignments/addgradeassignment`;
            const requestOptions = {
            method: 'POST',
            headers: new Headers({
                "x-access-token": actoken,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                new_user_grade: add_user_grade,
                id_class: id_class,
                id_assignment: id_assignment
            })
            };
            fetch(url, requestOptions)
            .then(res => res.json())
            .then((result) => {
                console.log(result)
                fetch(DOMAIN_API + `classes/detail/${id_class}/assignments/getgradeboard`, {
                    method: "POST",
                    headers: new Headers({
                        "x-access-token": actoken,
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({
                        id_class: id_class,
                    })
                  })
                      .then(res => res.json())
                      .then(
                          (result3) => {
                              console.log("Thay doi vi tri assignment:", result3);
                              setGradeBoard(result3);
                              //setIsLoaded(true);
                          },
                          (error) => {
                              console.log("Error getGradeBoard in import grade assignment");
                             
                          }
                      )
            })
            .catch(error => console.log('Form submit error', error))
            //setStudents(add_user_grade);
        }
        reader.onerror = function(ex) {
            console.log(ex);
        };
        reader.readAsBinaryString(f)
        return null;
    }

    return (
        <Button variant='outlined' component="label">
            <UploadIcon/>Upload File {name}
            <input type="file" accept=".csv, .xlsx" hidden 
                onChange={e => handleUpload(e)}
            />
        </Button>
    )
}