import './login.css';
import logo_banner from '../../assets/img/logo_banner.webp';
import { useState } from 'react';

function Login() {
    // State management
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setIsError(false);

        try {
            const response = await fetch("https://ceilling.onrender.com/api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                setMessage('Login Successful! Welcome back.');
                setIsError(false);

                // Optional: Redirect to dashboard after success
                setTimeout(() => {
                    window.location.href = '/upload';
                }, 100);
            } else {
                setMessage(data.message || 'Invalid email or password');
                setIsError(true);
            }
        } catch (err) {
            setMessage('Unable to connect to server. Please try again later.');
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="login">
            <div className="">
                <div className="pb-5 pt-5 mt-5">
                    <div className="row justify-content-center">
                        <div className="login-container m-auto">
                            {/* Image Section - Visible only on large screens */}
                            <div className="image-section d-none d-lg-block">
                                <img
                                    src={logo_banner}
                                    alt="Shambhavi Enterprises Interior Works"
                                />
                                <div className="image-overlay">
                                    <div className="image-content">
                                        <h2>Gypsum 'N' Gypsum</h2>
                                        <p>
                                            Professional interior, ceiling, and painting solutions
                                            delivered with precision, trust, and premium quality.
                                        </p>
                                        <div className="image-badge">
                                            <i className="fas fa-phone-alt"></i>
                                            +91 92466 09090
                                        </div>
                                        <div className="image-badge mt-2">
                                            <i className="far fa-envelope"></i>
                                            gypsumngypsum4u@gmail.com
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Form Section */}
                            <div className="form-section">
                                

                                <div className="form-header">
                                    <h1>Welcome Back</h1>
                                    <p>
                                        Sign in to manage your projects, track updates,
                                        and connect with Shambhavi Enterprises.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    {/* Email */}
                                    <div className="form-group">
                                        <label className="form-label">Email Address</label>
                                        <div className="input-container">
                                            <input
                                                type="email"
                                                className="form-input"
                                                placeholder="Enter your email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
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
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
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

                                    {/* Success / Error Message */}
                                    {message && (
                                        <div
                                            className={`text-center mt-3 mb-3 fw-semibold ${
                                                isError ? 'text-danger' : 'text-success'
                                            }`}
                                        >
                                            {message}
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="submit-btn"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            'Signing In...'
                                        ) : (
                                            <>
                                                <i className="fas fa-sign-in-alt"></i> Sign In
                                            </>
                                        )}
                                    </button>
                                </form>

                                {/* Contact Footer */}
                                <div className="form-footer mt-4 text-center">
                                    <p>
                                        Need help? Call us at <br />
                                        <div className="small fw-semibold pt-3">+91 92466 09090</div>
                                        {/* or email
                                        <div className="small fw-semibold">
                                            sreisai.shambhavi.enterprises@gmail.com
                                        </div> */}
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