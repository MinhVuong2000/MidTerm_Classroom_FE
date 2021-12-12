import { useState} from 'react';
import {Navigate} from 'react-router-dom';
import * as XLSX from 'xlsx';
import Button from '@mui/material/Button';
import UploadIcon from '@mui/icons-material/Upload';
import { DOMAIN_API, DOMAIN_FE } from '../../../config/const';


export default function StudentListImport({setStudents, students_ids, id_class}){
    const [respond, setResponse] = useState(null);
    
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
            console.log(dataParse);
            let addStudents = []
            for (let i=1; i<dataParse.length; i++) {
                if (students_ids==null || students_ids.length===0 || !(students_ids.includes(dataParse[i][0].toString()))){
                    addStudents.push({
                        full_name_user: dataParse[i][1],
                        id_uni_student: typeof(dataParse[i][0])==="string"?dataParse[i][0]:dataParse[i][0].toString()
                    })
                }
            }
            const actoken = localStorage.getItem('access_token');
            const url = DOMAIN_API + `classes/detail/${id_class}/add-students`;
            const requestOptions = {
            method: 'POST',
            headers: new Headers({
                "x-access-token": actoken,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                new_students: addStudents,
                id_class: id_class
            })
            };
            fetch(url, requestOptions)
            .then(res => res.json())
            .then((result) => {
                setStudents(result);
            })
            .catch(error => console.log('Form submit error', error))
            setStudents(addStudents);
        }
        reader.onerror = function(ex) {
            console.log(ex);
        };
        reader.readAsBinaryString(f)
        return null;
    }

    return (
        <Button variant='outlined' component="label">
            <UploadIcon/>Upload File
            <input type="file" accept=".csv, .xlsx" id='upload_student_list' hidden 
                onChange={e => handleUpload(e)}
            />
        </Button>
    )
}