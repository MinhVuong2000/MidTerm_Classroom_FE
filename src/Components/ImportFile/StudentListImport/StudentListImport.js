import { useState} from 'react';
import {Navigate} from 'react-router-dom';
import * as XLSX from 'xlsx';
import Button from '@mui/material/Button';
import UploadIcon from '@mui/icons-material/Upload';
import { DOMAIN_API, DOMAIN_FE } from '../../../config/const';


export default function StudentListImport({setStudents, students_ids, id_class}){
    
    const handleUpload = (e) => {
        e.preventDefault();
        let list_student = null;
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
            let newStudents = [];
            let repeatStudents = [];
            if (students_ids==null || students_ids.length===0){
                for (let i=1; i<dataParse.length; i++) {
                    newStudents.push({
                        full_name_user: dataParse[i][1],
                        id_uni_user: typeof(dataParse[i][0])==="string"?dataParse[i][0]:dataParse[i][0].toString()
                    })
                }
            }
            else{
                for (let i=1; i<dataParse.length; i++) {
                    dataParse[i][0] = typeof(dataParse[i][0])==="string" ? dataParse[i][0] : dataParse[i][0].toString();
                    if ((students_ids.includes(dataParse[i][0]))){
                        repeatStudents.push({
                            full_name_user: dataParse[i][1],
                            id_uni_user: typeof(dataParse[i][0])==="string"?dataParse[i][0]:dataParse[i][0].toString()
                        })
                    }
                    else{
                        newStudents.push({
                            full_name_user: dataParse[i][1],
                            id_uni_user: typeof(dataParse[i][0])==="string"?dataParse[i][0]:dataParse[i][0].toString()
                        })
                    }
                }
            }
            console.log('repeatStudent:', repeatStudents)
            console.log('newStudents:', newStudents)
            const actoken = localStorage.getItem('access_token');
            if (repeatStudents.length!==0){
                const url = DOMAIN_API + `classes/detail/${id_class}/update-students-name`;
                const requestOptions = {
                    method: 'PATCH',
                    headers: new Headers({
                        "x-access-token": actoken,
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({
                        repeat_students: repeatStudents,
                        id_class: id_class
                    })
                };
                fetch(url, requestOptions)
                .then(res => res.json())
                .then((result) => {
                    console.log("Result after update", result)
                    // list_student = result;
                    setStudents(result);
                })
                .catch(error => console.log('Form submit error', error))
            }
            if (newStudents.length!==0){
                const url = DOMAIN_API + `classes/detail/${id_class}/add-students`;
                const requestOptions = {
                    method: 'POST',
                    headers: new Headers({
                        "x-access-token": actoken,
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({
                        new_students: newStudents,
                        id_class: id_class
                    })
                };
                fetch(url, requestOptions)
                .then(res => res.json())
                .then((result) => {
                    console.log("Resul after add new student:", result)
                    // list_student = result;
                    setStudents(result);
                })
                .catch(error => console.log('Form submit error', error))
            }
        }
        reader.onerror = function(ex) {
            console.log(ex);
        };
        reader.readAsBinaryString(f);
        // console.log('list_student', list_student);
        // setStudents(list_student);
        return null;
    }

    return (
        <Button style={{width:"190px"}} variant='outlined' component="label">
        <div className="row">
            <div className=" d-flex justify-content-center">
        <UploadIcon  />
        </div>
        <div className=" d-flex justify-content-center">
        Upload File
        </div>
        <input type="file" accept=".csv, .xlsx" hidden 
            onChange={e => handleUpload(e)}
        />
        </div>
    </Button>
    )
}