import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';


const onClick = (purpose) => {
    const link = document.createElement("a");
    link.download = `${purpose}_template.xlsx`;
    link.href = `/files/${purpose}_template.xlsx`;
    link.click();
}

export default function DownloadButton({ purpose }) {
    return (
        // <Button style={{width:"120px"}} onClick={()=> {onClick(purpose)}} variant="contained">
        //     <DownloadIcon/>Download template
        // </Button>
        <Button  variant='outlined' component="label" onClick={() => { onClick(purpose) }}
        endIcon={<DownloadIcon />}>
                    Download template
        </Button>
    )
}
