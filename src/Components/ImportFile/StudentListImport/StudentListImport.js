import * as XLSX from 'xlsx';
import Button from '@mui/material/Button';
import UploadIcon from '@mui/icons-material/Upload';


export default function StudentListImport({setStudents}){

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
            for (let i=1; i<dataParse.length; i++) {
                dataParse[i] = {
                    full_name: dataParse[i][1],
                    id_uni: dataParse[i][0]
                }
            }
            setStudents(dataParse.slice(1));
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