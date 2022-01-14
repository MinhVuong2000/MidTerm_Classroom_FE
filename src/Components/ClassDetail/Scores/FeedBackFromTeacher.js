import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

export default function ReviewScore({ after_sent }) {
    const afterSent = () => {
        after_sent(true);
    }
    const [feedBack, setFeedBack] = React.useState([
        {
            score: "10",
            mess: "Thầy chấm nhầm"

        },
        {
            score: "10",
            mess: "Thầy chấm nhầm"
        }
    ]);
    return (
        <div className="card">
            <table border="1"  >
                <div style={{ margin: "20px" }}>
                    <div style={{fontWeight:"bold", fontSize:"24px"}}>
                    Phúc khảo
                    </div>
                    <br/>
                    <div>
                        <tr>
                            <div>
                                Bài giữa kỳ: 8
                                <br />
                                <div style={{ marginLeft: "40px" }}>
                                    <TextField
                                        id="expectation_grade"
                                        label="Điểm kỳ vọng "
                                        value="9"
                                        sx={{ width: 'auto', marginTop: "10px" }}
                                        variant="standard"
                                        focused
                                        InputProps={{
                                            readOnly: true,
                                          }}
                                    />
                                    <br />
                                    <TextField
                                        sx={{ width: '600px', marginTop: "15px" }}
                                        label="Giải thích"
                                        id="explanation_message"
                                        variant="standard"
                                        value="Em làm tốt"
                                        multiline
                                        focused
                                        InputProps={{
                                            readOnly: true,
                                          }} />
                                    <br/>
                                    <br/>
                                    <div style={{fontWeight:"bold", color:"green"}}>
                                    Phản hồi
                                    </div>
                                    <div style={{ marginLeft: "40px" }}>
                                        <TextField
                                            id="expectation_grade"
                                            label="Điểm sau phúc khảo "
                                            sx={{ width: 'auto', marginTop: "10px" }}
                                            variant="standard"
                                            value="10"
                                            focused
                                            color="success"
                                            InputProps={{
                                                readOnly: true,
                                              }}
                                        />
                                        <br />
                                        <TextField
                                            sx={{ width: '600px', marginTop: "15px" }}
                                            label="Giải thích"
                                            id="explanation_message"
                                            variant="standard"
                                            value="Thầy chấm nhầm"
                                            multiline
                                            focused
                                            color="success"
                                            InputProps={{
                                                readOnly: true,
                                              }} />

                                        <div style={{ marginLeft: "40px" }}>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </tr>
                        <br />

                        <tr>
                            <div>
                                Bài cuối kỳ: 9
                                <br />
                                <div style={{ marginLeft: "40px" }}>
                                    <TextField
                                        id="expectation_grade"
                                        label="Điểm kỳ vọng "
                                        value="10"
                                        sx={{ width: 'auto', marginTop: "10px" }}
                                        variant="standard"
                                        focused
                                        InputProps={{
                                            readOnly: true,
                                          }}
                                    />
                                    <br />
                                    <TextField
                                        sx={{ width: '600px', marginTop: "15px" }}
                                        label="Giải thích"
                                        id="explanation_message"
                                        variant="standard"
                                        value="Em làm rất tốt"
                                        multiline
                                        focused
                                        InputProps={{
                                            readOnly: true,
                                        }} 
                                    />
                                    <br/>
                                    <br/>
                                    <div style={{fontWeight:"bold", color:"green"}}>
                                    *********** Chưa nhận phản hồi ***********
                                    </div>
                        

                                </div>
                            </div>
                        </tr>
                        <br />

                       
                    </div>

                </div>
            </table>
        </div>

    );
}