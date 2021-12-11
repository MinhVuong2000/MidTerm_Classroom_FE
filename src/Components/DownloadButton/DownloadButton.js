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
        <Button onClick={()=> {onClick(purpose)}} variant="contained">
            <DownloadIcon/>Click to download {purpose} template
        </Button>
    )
}
