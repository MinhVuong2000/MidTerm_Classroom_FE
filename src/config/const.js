// const DOMAIN_API = 'http://localhost:3000/';
// const DOMAIN_FE = 'http://localhost:3001/';
const DOMAIN_API = 'https://classroom-clon-api-midterm.herokuapp.com/';//backend
const DOMAIN_FE = 'https://classroom-midterm-fe.herokuapp.com/';//frontend
const EXISTED_CLASS_TITLE = "Name {} is existed";
const EXISTED_CLASS_DESC = 'Please enter another name!';
const NOT_NULL_CLASS_TITLE = 'Name can not empty';
const NOT_NULL_CLASS_DESC = `Please enter class's name!`;
const ADD_SUCCESS_TITLE = 'Add Successfully';
const ADD_SUCCESS_DESC = "You added new class its name is {} successfully!";

module.exports = {
    DOMAIN_API, 
    DOMAIN_FE,
    EXISTED_CLASS_TITLE,
    EXISTED_CLASS_DESC,
    NOT_NULL_CLASS_TITLE,
    NOT_NULL_CLASS_DESC,
    ADD_SUCCESS_TITLE,
    ADD_SUCCESS_DESC
}
