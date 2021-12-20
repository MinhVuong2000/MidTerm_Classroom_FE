const DOMAIN_API = 'http://localhost:3000/';
const DOMAIN_FE = 'http://localhost:3001/';
// const DOMAIN_API = 'https://classroom-clon-api-midterm.herokuapp.com/';//backend
// const DOMAIN_FE = 'https://classroom-assigment-fe.herokuapp.com/';//frontend
const EXISTED_CLASS_TITLE = "Name {} is existed";
const EXISTED_CLASS_DESC = 'Please enter another name!';
const NOT_NULL_CLASS_TITLE = 'Name can not empty';
const NOT_NULL_CLASS_DESC = `Please enter class's name!`;
const ADD_SUCCESS_TITLE = 'Add Successfully';
const ADD_SUCCESS_DESC = "You added new class its name is {} successfully!";
const ERROR_PERMISSIONS_TITLE = "Không có quyền";
const ERROR_PERMISSIONS_DESC = "Chỉ có giảng viên lớp học mới có quyền thêm, xoá, sửa";
const NOT_NULL_VALUE_ADD_ASSIGNMENT_TITLE = 'Tên hoặc điểm số để thêm mới bài tập bị trống';
const NOT_NULL_VALUE_ADD_ASSIGNMENT_DESC = 'Hãy nhập giá trị vào nhé';
const ERROR_TYPE_POINT_TITLE = "Sai định dạng"
const ERROR_TYPE_POINT_DESC = "Điểm phải là con số dương"
const ENTER_ID_UNI_TITLE = "Chưa nhập mã số nhà trường cung cấp"
const ENTER_ID_UNI_DESC = "Bạn cần nhập mã số do nhà trường cung cấp để có thể xem chi tiết lớp học! Trang sẽ chuyển sang profile để chỉnh sửa nhé."
const ENTER_PASSWORD_TITLE = "Password trống"
const ENTER_PASSWORD_DESC = "Bạn cần nhập password mới trước khi muốn thay đổi!"
const ENTER_MSSV_TITLE = "Mã số do trường cung cấp trống"
const ENTER_MSSV_DESC = "Bạn cần nhập Mã số do trường cung cấp trước khi muốn cập nhật!"
const EXISTED_MSSV_TITLE = "Mã số nhà trường cung cấp bị trùng"
const EXISTED_MSSV_DESC = "Đã có người nhập mã số này. Bạn có nhầm lẫn không?"

const googleClientID = '1091140274470-msvgch2pntvkv0pltbq5osuqpgk3to3e.apps.googleusercontent.com';
const googleClientSecret = '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';

module.exports = {
    DOMAIN_API, DOMAIN_FE,
    EXISTED_CLASS_TITLE, EXISTED_CLASS_DESC,
    NOT_NULL_CLASS_TITLE, NOT_NULL_CLASS_DESC,
    ADD_SUCCESS_TITLE, ADD_SUCCESS_DESC,
    ERROR_PERMISSIONS_TITLE, ERROR_PERMISSIONS_DESC,
    NOT_NULL_VALUE_ADD_ASSIGNMENT_TITLE, NOT_NULL_VALUE_ADD_ASSIGNMENT_DESC,
    ERROR_TYPE_POINT_TITLE, ERROR_TYPE_POINT_DESC,
    ENTER_ID_UNI_TITLE, ENTER_ID_UNI_DESC,
    ENTER_PASSWORD_TITLE, ENTER_PASSWORD_DESC,
    ENTER_MSSV_TITLE, ENTER_MSSV_DESC,
    EXISTED_MSSV_TITLE, EXISTED_MSSV_DESC,
    googleClientID,
    googleClientSecret
}
