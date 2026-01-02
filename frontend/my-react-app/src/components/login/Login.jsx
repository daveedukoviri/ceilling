import './login.css';
import logo_banner from '../../assets/img/logo_banner.webp';

function Login() {
    return (
        <div id='login'>
            <div className="">
                    <div className="pb-5 pt-5 mt-5">
                <div className="row justify-content-center">

                        <div className="login-container m-auto">
                            {/* Image Section */}
                            <div className="image-section d-none d-lg-block">
                                <img
                                    src={logo_banner}
                                    alt="Shambhavi Enterprises Interior Works"
                                />

                                <div className="image-overlay">
                                    <div className="image-content">
                                        <h2>Shambhavi Enterprises</h2>
                                        <p>
                                            Professional interior, ceiling, and painting solutions
                                            delivered with precision, trust, and premium quality.
                                        </p>

                                        <div className="image-badge">
                                            <i className="fas fa-phone-alt"></i>
                                            +91 92988 03332
                                        </div>

                                        <div className="image-badge mt-2">
                                            <i className="far fa-envelope"></i>
                                            sreisai.shambhavi.enterprises@gmail.com
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Form Section */}
                            <div className="form-section">
                                <div className="form-logo d-none d-lg-block">
                                    <svg viewBox="0 0 36 36">
                                        <rect x="6" y="9" width="10" height="18" rx="1" />
                                        <rect x="20" y="7" width="6" height="20" rx="1" />
                                        <path d="M8,28 L28,28" strokeWidth="2" strokeLinecap="round" />
                                        <path d="M10,31 L26,31" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                    <span>Shambhavi Enterprises</span>
                                </div>

                                <div className="form-header">
                                    <h1>Welcome Back</h1>
                                    <p>
                                        Sign in to manage your projects, track updates,
                                        and connect with Shambhavi Enterprises.
                                    </p>
                                </div>

                                <form>
                                    {/* Email */}
                                    <div className="form-group">
                                        <label className="form-label">Email Address</label>
                                        <div className="input-container">
                                            <input
                                                type="email"
                                                className="form-input"
                                                placeholder="Enter your email"
                                                required
                                            />
                                            <div className="input-icon">
                                                <i className="far fa-envelope"></i>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div className="form-group">
                                        <label className="form-label">Password</label>
                                        <div className="input-container">
                                            <input
                                                type="password"
                                                className="form-input"
                                                placeholder="Enter your password"
                                                required
                                            />
                                            <div className="input-icon">
                                                <i className="fas fa-lock"></i>
                                            </div>
                                            <button type="button" className="password-toggle">
                                                <i className="far fa-eye"></i>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Options */}
                                    <div className="form-options">
                                        <label className="remember-checkbox">
                                            <input type="checkbox" defaultChecked />
                                            <div className="checkbox-custom"></div>
                                            <span>Keep me signed in</span>
                                        </label>

                                        <a href="#" className="forgot-link">
                                            Forgot Password?
                                        </a>
                                    </div>

                                    {/* Submit */}
                                    <button type="submit" className="submit-btn">
                                        <i className="fas fa-sign-in-alt"></i> Sign In
                                    </button>
                                </form>

                                {/* Contact Footer */}
                                <div className="form-footer mt-4 text-center">
                                    <p>
                                        Need help? Call us at <strong>+91 92988 03332</strong><br />
                                        or email <strong>sreisai.shambhavi.enterprises@gmail.com</strong>
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
