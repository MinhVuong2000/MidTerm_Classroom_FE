import signup_image from '../../static/images/signup-image.jpeg';


export default function Register()  {
    return (
        <section class="signup">
            <div class="container">
                <div class="signup-content">
                    <div class="signup-form">
                        <h2 class="form-title">Đăng kí</h2>
                        <form method="POST" class="register-form" id="formRegister">
                            <div class="form-group">
                                <label for="txtUsername"><i class="fa fa-user"></i></label>
                                <input type="text" name="username" id="txtUsername" placeholder="Nhập username"/>
                            </div>
                            <div class="form-group">
                                <label for="txtPassword"><i class="zmdi zmdi-lock"></i></label>
                                <input type="password" name="raw_password" id="txtPassword" placeholder="Nhập mật khẩu"/>
                            </div>
                            <div class="form-group">
                                <label for="txtConfirm"><i class="zmdi zmdi-lock-outline"></i></label>
                                <input type="password" name="re_pass" id="txtConfirm" placeholder="Xác nhận mật khẩu"/>
                            </div>
                            <div class="form-group">
                                <label for="txtName"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="name" id="txtName" placeholder="Tên đầy đủ"/>
                            </div>
                            <div class="form-group">
                                <label for="txtEmail"><i class="zmdi zmdi-email"></i></label>
                                <input type="text" name="email" id="txtEmail" placeholder="Email của bạn (ví dụ:abc@gmail.com)"/>
                            </div>
                            <div class="form-group">
                                <label for="txtAddress"><i class="fa fa-map-marker"></i></label>
                                <input type="text" name="address" id="txtAddress" placeholder="Địa chỉ"/>
                            </div>
                            <div class="form-group">
                                <label for="txtDOB"><i class="fa fa-birthday-cake"></i></label>
                                <input type="text" name="raw_dob" id="txtDOB" placeholder="Ngày sinh"/>
                            </div>
                            <div class="form-group form-button">
                                <input type="submit" name="signup" id="signup" class="form-submit" value="Đăng kí"/>
                            </div>
                        </form>
                    </div>
                    <div class="signup-image">
                        <figure><img src={signup_image} alt="sing up image"/></figure>
                        <a href="/login" class="signup-image-link">Tôi đã có tài khoản rồi</a>
                    </div>
                </div>
            </div>
        </section>
    );
}
