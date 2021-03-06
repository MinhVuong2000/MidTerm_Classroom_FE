import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { Navigate, BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import Classroom from "../../Classroom/Classroom";
import "./Assignment.css"
import {
  DOMAIN_API,
  ERROR_PERMISSIONS_TITLE,
  ERROR_PERMISSIONS_DESC,
  NOT_NULL_VALUE_ADD_ASSIGNMENT_TITLE,
  NOT_NULL_VALUE_ADD_ASSIGNMENT_DESC,
  ERROR_TYPE_POINT_TITLE,
  ERROR_TYPE_POINT_DESC,
} from '../../../config/const';
import AlertDialog from '../../AlertDialog/AlertDialog';
import OneAssignment from './OneAssignment/OneAssignment';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function isNumericPositive(val) {
  return /[1-9][0-9]*/.test(val);
}

export default function Assignments({ idclass, assignments, data_structure, grade_structure }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [assignmentNameAdded, setAssignmentNameAdded] = useState('');
  const [assignmentPointAdded, setAssignmentPointAdded] = useState('');
  const [assignmentNameEdit, setAssignmentNameEdit] = useState('');
  const [assignmentPointEdit, setAssignmentPointEdit] = useState('');
  const [openErrorPermission, setOpenErrorPermission] = useState(false);
  const [openNotValueAdd, setOpenNotValueAdd] = useState(false);
  const [openNotTypePoint, setOpenNotTypePoint] = useState(false);
  const [idAssignmentEdit, setIdAssignmentEdit] = useState(-1);
  const [isEditName, setIsEditName] = useState(false);
  const [isEditPoint, setIsEditPoint] = useState(false);

  let actoken = localStorage.getItem('access_token');


  const [characters, updateCharacters] = useState();
  async function handleOnDragEnd(result) {
    if (!result.destination) return;
    const list_items = Array.from(characters);
    const [reorderedItem] = list_items.splice(result.source.index, 1);
    list_items.splice(result.destination.index, 0, reorderedItem);
    updateCharacters(list_items);
    const url = DOMAIN_API + `classes/detail/${idclass}/assignments/updateorder`;
    const requestOptions = {
      method: 'POST',
      headers: new Headers({
        "x-access-token": actoken,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        idclass: idclass, source: characters[result.source.index].orders,
        destination: characters[result.destination.index].orders
      })
    };
    fetch(url, requestOptions)
      .then(res => res.json())
      .then((result) => {
        if (result == '400' || result == '401')
          setItems(result)
        else {
          if (result == '403') {
            setOpenErrorPermission(() => { return true; })
          }
          else {
            result.sort((firstItem, secondItem) => firstItem.orders - secondItem.orders);
            setItems(result);
            updateCharacters(result);
            data_structure([...result]);
            setAssignmentNameAdded('');
            setAssignmentPointAdded('');
            fetch(DOMAIN_API + `classes/detail/${idclass}/assignments/getgradeboard`, {
              method: "POST",
              headers: new Headers({
                  "x-access-token": actoken,
                  'Content-Type': 'application/json'
              }),
              body: JSON.stringify({
                  id_class: idclass,
              })
            })
                .then(res => res.json())
                .then(
                    (result3) => {
                        console.log("Thay doi vi tri assignment:", result3);
                        grade_structure(result3);
                        //setIsLoaded(true);
                    },
                    (error) => {
                        console.log("Error getGradeBoard");
                        setIsLoaded(true);
                        setError(error);
                    }
                )
          }
        }
      })
      .catch(error => console.log('Form submit error', error))
  }


  function HandleAdd() {
    console.log(assignmentNameAdded, assignmentPointAdded)
    if (assignmentNameAdded === "" || assignmentPointAdded === '') {
      setOpenNotValueAdd(() => { return true });
      return;
    }
    if (!isNumericPositive(assignmentPointAdded)) {
      setOpenNotTypePoint(() => { return true });
      return;
    }
    const url = DOMAIN_API + `classes/detail/${idclass}/assignments`;
    const requestOptions = {
      method: 'POST',
      headers: new Headers({
        "x-access-token": actoken,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({ name: assignmentNameAdded, point: assignmentPointAdded })
    };
    fetch(url, requestOptions)
      .then(res => res.json())
      .then((result) => {
        if (result == '400' || result == '401')
          setItems(result)
        else {
          if (result == '403') {
            setOpenErrorPermission(() => { return true; })
          }
          else {
            setItems(result);
            updateCharacters(result);
            data_structure([...result]);
            setAssignmentNameAdded('');
            setAssignmentPointAdded('');
            fetch(DOMAIN_API + `classes/detail/${idclass}/assignments/getgradeboard`, {
              method: "POST",
              headers: new Headers({
                  "x-access-token": actoken,
                  'Content-Type': 'application/json'
              }),
              body: JSON.stringify({
                  id_class: idclass,
              })
            })
                .then(res => res.json())
                .then(
                    (result3) => {
                        console.log("Them assignment: ", result3);
                        grade_structure(result3);
                        //setIsLoaded(true);
                    },
                    (error) => {
                        console.log("Error getGradeBoard");
                        setIsLoaded(true);
                        setError(error);
                    }
                )
          }
        }
      })
      .catch(error => console.log('Form submit error', error))
  }

  async function handleDelete(id_assignment) {
    const url = DOMAIN_API + `classes/detail/${idclass}/assignments/detail/${id_assignment}`;
    const requestOptions = {
      method: 'DELETE',
      headers: new Headers({
        "x-access-token": actoken
      })
    };
    await fetch(url, requestOptions)
      .then(res => res.json())
      .then((result) => {
        console.log("result fetch delete assignment", result)
        if (result == '400' || result == '401')
          setItems(result)
        else if (result == '403') {
          setOpenErrorPermission(() => { return true; })
        }
        else {
          const new_items = []
          for (let i = 0; i < items.length; i++) {
            if (items[i].id != id_assignment) {
              new_items.push(items[i]);
            }
          }
          setItems(new_items);
          updateCharacters(new_items);
          data_structure([...new_items]);
          setAssignmentNameAdded('');
          setAssignmentPointAdded('');
          fetch(DOMAIN_API + `classes/detail/${idclass}/assignments/getgradeboard`, {
            method: "POST",
            headers: new Headers({
                "x-access-token": actoken,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                id_class: idclass,
            })
          })
              .then(res => res.json())
              .then(
                  (result3) => {
                      console.log("Xoa assignment:", result3);
                      grade_structure(result3);
                      //setIsLoaded(true);
                  },
                  (error) => {
                      console.log("Error getGradeBoard");
                      setIsLoaded(true);
                      setError(error);
                  }
              )
        }
      })
      .catch(error => console.log('Form submit error', error))
  }
  async function handleEdit(id_assignment, name, point) {
    //Neu = tuc la ho da chinh sua xong v?? muon save --> g???i api update (name, point)
    if (id_assignment == idAssignmentEdit) {
      let newname = '', newpoint;
      if (isEditName) {
        newname = assignmentNameEdit;
      }
      else {
        newname = name;
      }
      if (isEditPoint) {
        newpoint = assignmentPointEdit;
      }
      else {
        newpoint = point;
      }
      console.log("newname va new point: ", newname, newpoint);
      const url = DOMAIN_API + `classes/detail/${idclass}/assignments/edit`;
      const requestOptions = {
        method: 'POST',
        headers: new Headers({
          "x-access-token": actoken,
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({ idclass: idclass, idassignment: id_assignment, name: newname, point: newpoint })
      };
      await fetch(url, requestOptions)
        .then(res => res.json())
        .then((result) => {
          console.log("result fetch edit assignment", result)
          if (result == '400' || result == '401')
            setItems(result)
          else if (result == '403') {
            setOpenErrorPermission(() => { return true; })
          }
          else {
            setItems(result);
            updateCharacters(result);
            data_structure([...result]);
            setAssignmentNameEdit('');
            setAssignmentPointEdit('');
            setIsEditName(false);
            setIsEditPoint(false);
            setIdAssignmentEdit();
            fetch(DOMAIN_API + `classes/detail/${idclass}/assignments/getgradeboard`, {
              method: "POST",
              headers: new Headers({
                  "x-access-token": actoken,
                  'Content-Type': 'application/json'
              }),
              body: JSON.stringify({
                  id_class: idclass,
              })
            })
                .then(res => res.json())
                .then(
                    (result3) => {
                        console.log("Chinh sua ten assignment:", result3);
                        grade_structure(result3);
                        //setIsLoaded(true);
                    },
                    (error) => {
                        console.log("Error getGradeBoard");
                        setIsLoaded(true);
                        setError(error);
                    }
                )
          }
        })
        .catch(error => console.log('Form edit error', error))

    }
    else {
      //Luc nay gia su idedit = 4, nhung user nhan vao so 5 thi id_ass = 5, id_edit = 4 => vao che do edit
      console.log("Sau khi vao else thi id_assigment: ", id_assignment);
      setIdAssignmentEdit(id_assignment);
      setAssignmentNameEdit(name);
      setAssignmentPointEdit(point);
      setIsEditName(false);
      setIsEditPoint(false);
      console.log("sau khi set editId: ", idAssignmentEdit);
    }
    if (isEditName) {

    }


  }
  useEffect(() => {
    fetch(DOMAIN_API + `classes/detail/${idclass}/assignments`, {
      method: "GET",
      headers: new Headers({
        "x-access-token": actoken
      })
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log('items:', items);
          console.log("result:", result);
          result.sort((firstItem, secondItem) => firstItem.orders - secondItem.orders);
          setItems(result);

          updateCharacters(result)
          setIsLoaded(true);
        },
        (error) => {
          console.log("Error");
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    //console.log("kiem tra item []",items)
    if (items == '401') {
      return (
        <div>
          <Navigate to="/login" />
        </div>
      )
    }
    else if (items == '400') {
      return (
        <div>
          <Navigate to="/logout" />
        </div>
      )
    }
    else {
      if (items.length == 0) {
        return <div> <div className="container">Kh??ng c?? b???t k?? b??i t???p n??o cho l???p n??y! </div>
          {openErrorPermission && <AlertDialog title={ERROR_PERMISSIONS_TITLE} msg={ERROR_PERMISSIONS_DESC} callback={() => { setOpenErrorPermission(() => { return false }) }} />}
          {openNotValueAdd && <AlertDialog title={NOT_NULL_VALUE_ADD_ASSIGNMENT_TITLE} msg={NOT_NULL_VALUE_ADD_ASSIGNMENT_DESC} callback={() => { setOpenNotValueAdd(() => { return false }) }} />}
          {openNotTypePoint && <AlertDialog title={ERROR_TYPE_POINT_TITLE} msg={ERROR_TYPE_POINT_DESC} callback={() => { setOpenNotTypePoint(() => { return false }) }} />}
          <Box component='form' className="container" style={{ paddingTop: "10px" }}>
          <div className="card" style={{padding: "15px"}}>
            <TextField
              required
              autoFocus
              margin="normal"
              id="assignmentName"
              label="T??n b??i t???p mu???n th??m"
              type="text"
              fullWidth
              variant="standard"
              value={assignmentNameAdded}
              onChange={e => setAssignmentNameAdded(e.target.value)} />
            <TextField
              required
              margin="normal"
              id="assignmentPoint"
              label="??i???m s??? c???a b??i t???p mu???n th??m"
              type="text"
              fullWidth
              variant="standard"
              value={assignmentPointAdded}
              onChange={e => setAssignmentPointAdded(e.target.value)} />
            <Button variant="contained" onClick={HandleAdd}>Th??m b??i t???p</Button>
            </div>
          </Box>
        </div>;
      }
      else {
        return (
          <div>
            {openErrorPermission && <AlertDialog title={ERROR_PERMISSIONS_TITLE} msg={ERROR_PERMISSIONS_DESC} callback={() => { setOpenErrorPermission(() => { return false }) }} />}
            {openNotValueAdd && <AlertDialog title={NOT_NULL_VALUE_ADD_ASSIGNMENT_TITLE} msg={NOT_NULL_VALUE_ADD_ASSIGNMENT_DESC} callback={() => { setOpenNotValueAdd(() => { return false }) }} />}
            {openNotTypePoint && <AlertDialog title={ERROR_TYPE_POINT_TITLE} msg={ERROR_TYPE_POINT_DESC} callback={() => { setOpenNotTypePoint(() => { return false }) }} />}
            <Box component='form' className="container" style={{ paddingTop: "10px" }}>
              <div className="card" style={{padding: "15px"}}>
                <TextField
                  required
                  autoFocus
                  margin="normal"
                  id="assignmentName"
                  label="T??n b??i t???p mu???n th??m"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={assignmentNameAdded}
                  onChange={e => setAssignmentNameAdded(e.target.value)} />
                <TextField      
                  required
                  margin="normal"
                  id="assignmentPoint"
                  label="??i???m s??? c???a b??i t???p mu???n th??m"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={assignmentPointAdded}
                  onChange={e => setAssignmentPointAdded(e.target.value)} />
                <Button onClick={HandleAdd}>Th??m b??i t???p</Button>
              </div>
            </Box>
            <Box sx={{
              flexGrow: 1,
              mx: 'auto',
              p: 1,
              m: 1,
              textAlign: 'center',
              borderRadius: 1,
            }}>

            </Box>
            <div className="App">
              <h1>Danh s??ch b??i t???p</h1>
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="characters">
                  {(provided) => (
                    <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                      {characters.map(({ id, point, name, orders }, index) => {
                        return (
                          <Draggable key={id.toString()} draggableId={id.toString()} index={index}>
                            {(provided) => (
                              <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                <Box component='form' style={{width:"500px"}}>
                                  <div >
                                    <TextField
                                      {... `${id == idAssignmentEdit ? 'required' : ''}`}
                                      margin="normal"
                                      id={id}
                                      label="T??n b??i t???p"
                                      type="text"
                                      fullWidth
                                      variant="standard"
                                      InputProps={{
                                        readOnly: id != idAssignmentEdit,
                                      }}
                                      value={`${id != idAssignmentEdit ? name : assignmentNameEdit}`}
                                      onChange={e => { setAssignmentNameEdit(e.target.value); setIsEditName(true) }} />
                                    <TextField
                                      {... `${id == idAssignmentEdit ? 'required' : ''}`}
                                      margin="normal"
                                      id={point}
                                      label="??i???m s???"
                                      type="text"
                                      fullWidth
                                      variant="standard"
                                      InputProps={{
                                        readOnly: id != idAssignmentEdit,
                                      }}
                                      value={`${id != idAssignmentEdit ? point : assignmentPointEdit}`}
                                      onChange={e => { setAssignmentPointEdit(e.target.value); setIsEditPoint(true) }} />
                                  </div>
                                  <div className="row">
                                    <div className="col">
                                      <Button onClick={() => handleDelete(id)} variant="contained" color='error' startIcon={<DeleteIcon />}>
                                        Xo??
                                      </Button>
                                    </div>
                                    <div className="col">
                                      <Button onClick={() => handleEdit(id, name, point)} variant="contained" startIcon={<EditIcon />}>
                                        {`${id != idAssignmentEdit ? 'S???a' : 'L??u'}`}
                                      </Button>
                                    </div>
                                  </div>
                                </Box>


                              </li>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>
        )
      }
    }
  }
}