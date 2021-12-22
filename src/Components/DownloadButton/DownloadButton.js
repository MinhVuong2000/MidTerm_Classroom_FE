import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';


const onClick = (purpose) => {
    const link = document.createElement("a");
    link.download = `${purpose}_template.xlsx`;
    link.href = `/files/${purpose}_template.xlsx`;
    link.click();
}

export default function DownloadButton({purpose}){
    return (
         // <Button style={{width:"120px"}} onClick={()=> {onClick(purpose)}} variant="contained">
        //     <DownloadIcon/>Download template
        // </Button>
        <Button style={{width:"190px", marginBottom:"10px"}} variant='outlined' component="label" onClick={()=> {onClick(purpose)}} variant="contained">
        <div className="row">
            <div className=" d-flex justify-content-center">
        <DownloadIcon  />
        </div>
        <div className=" d-flex justify-content-center">
        Download template
        </div>
        </div>
    </Button>
    )
}
