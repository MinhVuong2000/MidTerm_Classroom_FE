import signin_image from '../../static/images/signin-image.jpeg';

export default function Login() {
    return (
        <div class="main">
            <div>BC<br/><br/><br/><br/>BR</div>
            <div class="sign-in">
                <div class="container">
                    <div class="signin-content">
                        <div class="signin-image">
                            <figure><img src={signin_image} alt="signin image"/></figure>
                            <a href="/register" class="signup-image-link">Tạo tài khoản mới</a>
                        </div>

                        <div class="signin-form">
                            <h2 class="form-title">Đăng nhập</h2>
                            {/* {{#if err_message}}
                                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                {{err_message}}
                                </div>
                            {{/if}} */}
                            {/* {{#switch after_register}}
                            {{#case 1}}
                            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <p id="after_register">Bạn đã đăng kí thành công</p>
                                </div>
                            {{/case}}
                            {{#case 2}}
                            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <p id="after_register">Bạn đã đặt lại mật khẩu mới thành công</p>
                                </div>
                            {{/case}}
                            {{/switch}} */}
                            <form method="POST" class="register-form" id="login-form" action="">
                                <div class="form-group">
                                    <label for="username"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="text" name="username" id="username" placeholder="Username"/>
                                </div>
                                <div class="form-group">
                                    <label for="password"><i class="zmdi zmdi-lock"></i></label>
                                    <input type="password" name="password" id="password" placeholder="Password"/>
                                </div>
                                <div style="text-align: right;">
                                    <a id="forgot_pass" class="label-agree-term text-danger" href="/reset-password">Quên mật khẩu</a>
                                </div>
                                <div class="form-group form-button">
                                    <input type="submit" name="signin" id="signin" class="form-submit" value="Đăng nhập"/>
                                </div>
                            </form>
                            <div class="social-login">
                                <span class="social-label">Hoặc đăng nhập bằng</span>
                                <ul class="socials">
                                    <li><a href="/auth/google"><i class="display-flex-center zmdi zmdi-google"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }