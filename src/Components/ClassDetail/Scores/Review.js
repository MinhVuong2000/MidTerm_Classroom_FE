import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

export default function ReviewScore({after_sent}) {
    const afterSent=() =>{
        after_sent(true);
    }
    return (
        <div className="card">
            <table border="1"  >
                <div style={{ margin: "20px" }}>
                    <div>
                        <tr>
                            <div>
                                Bài giữa kỳ: 9
                                <br />
                                <div style={{ marginLeft: "40px" }}>
                                    <TextField
                                        id="expectation_grade"
                                        label="Điểm kỳ vọng "
                                        sx={{ width: 'auto', marginTop: "10px" }}
                                        variant="standard"
                                        focused
                                    />
                                    <br />
                                    <TextField
                                        sx={{ width: '600px', marginTop: "15px" }}
                                        label="Giải thích"
                                        id="explanation_message"
                                        variant="standard"
                                        multiline
                                        focused />
                                </div>
                            </div>
                        </tr>
                        <br />

                        <tr>
                            <div>
                                Bài cuối kỳ: 10
                                <br />
                                <div style={{ marginLeft: "40px" }}>
                                    <TextField
                                        id="expectation_grade"
                                        label="Điểm kỳ vọng "
                                        sx={{ width: 'auto', marginTop: "10px" }}
                                        variant="standard"
                                        focused
                                    />
                                    <br />
                                    <TextField
                                        sx={{ width: '600px', marginTop: "15px" }}
                                        label="Giải thích"
                                        id="explanation_message"
                                        variant="standard"
                                        multiline
                                        focused />
                                </div>
                            </div>
                        </tr>
                        <br />
                    </div>


                    <Button variant="contained" endIcon={<SendIcon />}
                    onClick={()=>afterSent()}>
                        Gửi
                    </Button>
                </div>
            </table>
        </div>

    );
}