import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import TickIcon from '@/assets/images/tick.svg';

const Sidebar = ({ texts, onOpenSearchModal, onOpenPrivacyModal, onOpenTermsModal }) => {
    const privacyQuestions = useMemo(() => [
        texts.privacyQ1 || 'What is the Privacy Policy and what does it cover?',
        texts.privacyQ2 || 'What information do we collect?',
        texts.privacyQ3 || 'How do we use your information?',
        texts.privacyQ4 || 'How do we share your information on Meta Products or with integrated partners?',
        texts.privacyQ5 || 'How do we share information with third parties?',
        texts.privacyQ6 || 'How is the cooperation between Meta Companies organized?',
        texts.privacyQ7 || 'How can you manage or delete your information and exercise your rights?',
        texts.privacyQ8 || 'How long do we keep your information?',
        texts.privacyQ9 || 'How do we transmit information?',
        texts.privacyQ10 || 'How do we respond to official requests, comply with applicable laws, and prevent harm?',
        texts.privacyQ11 || 'How will you know when the policy changes?',
        texts.privacyQ12 || 'How to ask Meta questions?',
        texts.privacyQ13 || 'Why and how we process your data'
    ], [texts]);

    const [activePolicy, setActivePolicy] = useState(false);
    const [activeRules, setActiveRules] = useState(false);
    const [activeSettings, setActiveSettings] = useState(false);

    return (
        <div id="left">
            <div id="logo">
                <svg aria-label="Логотип Meta" className="" role="img" viewBox="0 0 500 100">
                    <defs>
                        <linearGradient gradientUnits="userSpaceOnUse" id=":R1eckmkldd6knpapd5aqH1:" x1="124.38" x2="160.838" y1="99" y2="59.326">
                            <stop offset=".427" stopColor="#0278F1"></stop>
                            <stop offset=".917" stopColor="#0180FA"></stop>
                        </linearGradient>
                        <linearGradient gradientUnits="userSpaceOnUse" id=":R1eckmkldd6knpapd5aqH2:" x1="42" x2="-1.666" y1="4.936" y2="61.707">
                            <stop offset=".427" stopColor="#0165E0"></stop>
                            <stop offset=".917" stopColor="#0180FA"></stop>
                        </linearGradient>
                        <linearGradient gradientUnits="userSpaceOnUse" id=":R1eckmkldd6knpapd5aqH3:" x1="27.677" x2="132.943" y1="28.71" y2="71.118">
                            <stop stopColor="#0064E0"></stop>
                            <stop offset=".656" stopColor="#0066E2"></stop>
                            <stop offset="1" stopColor="#0278F1"></stop>
                        </linearGradient>
                    </defs>
                    <path
                        d="M185.508 3.01h18.704l31.803 57.313L267.818 3.01h18.297v94.175h-15.264v-72.18l-27.88 49.977h-14.319l-27.88-49.978v72.18h-15.264V3.01ZM336.281 98.87c-7.066 0-13.286-1.565-18.638-4.674-5.352-3.12-9.527-7.434-12.528-12.952-2.989-5.517-4.483-11.835-4.483-18.973 0-7.214 1.461-13.608 4.385-19.17 2.923-5.561 6.989-9.908 12.187-13.05 5.198-3.13 11.176-4.707 17.923-4.707 6.715 0 12.484 1.587 17.319 4.74 4.847 3.164 8.572 7.598 11.177 13.291 2.615 5.693 3.923 12.371 3.923 20.046v4.171h-51.793c.945 5.737 3.275 10.258 6.989 13.554 3.715 3.295 8.407 4.937 14.078 4.937 4.549 0 8.461-.667 11.747-2.014 3.286-1.347 6.374-3.383 9.253-6.12l8.099 9.886c-8.055 7.357-17.934 11.036-29.638 11.036Zm11.143-55.867c-3.198-3.252-7.385-4.872-12.56-4.872-5.045 0-9.264 1.653-12.66 4.97-3.407 3.318-5.55 7.784-6.451 13.39h37.133c-.451-5.737-2.275-10.237-5.462-13.488ZM386.513 39.467h-14.044V27.03h14.044V6.447h14.715V27.03h21.341v12.437h-21.341v31.552c0 5.244.901 8.988 2.703 11.233 1.803 2.244 4.88 3.36 9.253 3.36 1.935 0 3.572-.076 4.924-.23a97.992 97.992 0 0 0 4.461-.645v12.316c-1.67.493-3.549.898-5.637 1.205-2.099.317-4.286.47-6.583.47-15.89 0-23.836-8.649-23.836-25.957V39.467ZM500 97.185h-14.44v-9.82c-2.571 3.678-5.835 6.513-9.791 8.506-3.968 1.993-8.462 3-13.506 3-6.209 0-11.715-1.588-16.506-4.752-4.803-3.153-8.572-7.51-11.308-13.039-2.748-5.54-4.121-11.879-4.121-19.006 0-7.17 1.395-13.52 4.187-19.038 2.791-5.518 6.648-9.843 11.571-12.985 4.935-3.13 10.594-4.707 16.99-4.707 4.813 0 9.132.93 12.956 2.791a25.708 25.708 0 0 1 9.528 7.905v-9.01H500v70.155Zm-14.715-45.61c-1.571-3.985-4.066-7.138-7.461-9.448-3.396-2.31-7.33-3.46-11.781-3.46-6.308 0-11.319 2.102-15.055 6.317-3.737 4.215-5.605 9.92-5.605 17.09 0 7.215 1.802 12.94 5.396 17.156 3.604 4.215 8.484 6.317 14.66 6.317 4.538 0 8.593-1.16 12.154-3.492 3.549-2.332 6.121-5.475 7.692-9.427V51.575Z"
                        fill="#1C2B33"
                    ></path>
                    <path
                        d="M107.666 0C95.358 0 86.865 4.504 75.195 19.935 64.14 5.361 55.152 0 42.97 0 18.573 0 0 29.768 0 65.408 0 86.847 12.107 99 28.441 99c15.742 0 25.269-13.2 33.445-27.788l9.663-16.66a643.785 643.785 0 0 1 2.853-4.869 746.668 746.668 0 0 1 3.202 5.416l9.663 16.454C99.672 92.72 108.126 99 122.45 99c16.448 0 27.617-13.723 27.617-33.25 0-37.552-19.168-65.75-42.4-65.75ZM57.774 46.496l-9.8 16.25c-9.595 15.976-13.639 19.526-19.67 19.526-6.373 0-11.376-5.325-11.376-17.547 0-24.51 12.062-47.451 26.042-47.451 7.273 0 12.678 3.61 22.062 17.486a547.48 547.48 0 0 0-7.258 11.736Zm64.308 35.776c-6.648 0-11.034-4.233-20.012-19.39l-9.663-16.386c-2.79-4.737-5.402-9.04-7.88-12.945 9.73-14.24 15.591-17.984 23.002-17.984 14.118 0 26.204 20.96 26.204 49.158 0 11.403-4.729 17.547-11.651 17.547Z"
                        fill="#0180FA"
                    ></path>
                    <path d="M145.631 36h-16.759c3.045 7.956 4.861 17.797 4.861 28.725 0 11.403-4.729 17.547-11.651 17.547H122v16.726l.449.002c16.448 0 27.617-13.723 27.617-33.25 0-10.85-1.6-20.917-4.435-29.75Z" fill="url(#:R1eckmkldd6knpapd5aqH1:)"></path>
                    <path d="M42 .016C18.63.776.832 28.908.028 63h16.92C17.483 39.716 28.762 18.315 42 17.31V.017Z" fill="url(#:R1eckmkldd6knpapd5aqH2:)"></path>
                    <path
                        d="m75.195 19.935.007-.009c2.447 3.223 5.264 7.229 9.33 13.62l-.005.005c2.478 3.906 5.09 8.208 7.88 12.945l9.663 16.386c8.978 15.157 13.364 19.39 20.012 19.39.31 0 .617-.012.918-.037v16.76c-.183.003-.367.005-.551.005-14.323 0-22.777-6.281-35.182-27.447L77.604 55.1l-.625-1.065L77 54c-2.386-4.175-7.606-12.685-11.973-19.232l.005-.008-.62-.91C63.153 31.983 61.985 30.313 61 29l-.066.024c-7.006-9.172-11.818-11.75-17.964-11.75-.324 0-.648.012-.97.037V.016c.322-.01.646-.016.97-.016 12.182 0 21.17 5.36 32.225 19.935Z"
                        fill="url(#:R1eckmkldd6knpapd5aqH3:)"
                    ></path>
                </svg>
            </div>
            <h1>{texts.metaVerified || 'Meta Verified'}</h1>
            <div id="action-buttons">
                <div className="action-button main collapsed">
                    <div className="action-button-img">
                        <svg aria-hidden="true" className="x1lliihq x1k90msu x2h7rmj x1qfuztq x198g3q0 xxk0z11 xvy4d1p" fill="currentColor" height="1em" viewBox="0 0 24 24" width="1em">
                            <path
                                clipRule="evenodd"
                                d="m19.007 9.997-6.338-5.704a1 1 0 0 0-1.338 0L4.993 9.997A3 3 0 0 0 4 12.227v6.61c0 .216.07.38.149.48a.432.432 0 0 0 .284.167c.86.14 2.04.29 3.567.391V16a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v3.875a37.895 37.895 0 0 0 3.567-.39.432.432 0 0 0 .284-.168.773.773 0 0 0 .149-.48v-6.61a3 3 0 0 0-.993-2.23zM3.655 8.51l6.338-5.704a3 3 0 0 1 4.014 0l6.338 5.704A5 5 0 0 1 22 12.227v6.61c0 1.292-.836 2.413-2.11 2.621-.94.153-2.208.312-3.833.418-1.125.073-2.057-.836-2.057-1.964V16a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3.912c0 1.128-.932 2.037-2.057 1.964a40.092 40.092 0 0 1-3.832-.418C2.836 21.25 2 20.13 2 18.838v-6.611A5 5 0 0 1 3.655 8.51z"
                                fillRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                    <div className="action-button-text">{texts.metaVerified || 'Meta Verified'}</div>
                    <div className="action-button-arrow"></div>
                </div>
                <div className="action-button collapsed" id="search" onClick={onOpenSearchModal}>
                    <div className="action-button-img">
                        <svg aria-hidden="true" className="x1lliihq x1k90msu x2h7rmj x1qfuztq x198g3q0 xxk0z11 xvy4d1p" fill="currentColor" height="1em" viewBox="0 0 24 24" width="1em">
                            <path clipRule="evenodd" d="M16.618 18.032a9 9 0 1 1 1.414-1.414l3.675 3.675a1 1 0 0 1-1.414 1.414l-3.675-3.675zM18 11a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" fillRule="evenodd"></path>
                        </svg>
                    </div>
                    <div className="action-button-text">{texts.search || 'Search'}</div>
                </div>
                <div
                    aria-controls="PolicyCollapse"
                    aria-expanded={activePolicy}
                    className={`action-button collapsed ${activePolicy ? '' : ''}`}
                    onClick={() => setActivePolicy(!activePolicy)}
                    id="Policy"
                >
                    <div className="action-button-img">
                        <svg aria-hidden="true" className="x1lliihq x1k90msu x2h7rmj x1qfuztq x198g3q0 xxk0z11 xvy4d1p" fill="currentColor" height="1em" viewBox="0 0 24 24" width="1em">
                            <path d="M12 12a2 2 0 0 1 1 3.732V17a1 1 0 1 1-2 0v-1.268A2 2 0 0 1 12 12z"></path>
                            <path
                                clipRule="evenodd"
                                d="M7 6a5 5 0 0 1 10 0v2h.857c1.282 0 2.417.818 2.664 2.076A25.71 25.71 0 0 1 21 15a25.71 25.71 0 0 1-.479 4.924C20.274 21.182 19.14 22 17.857 22H6.143c-1.282 0-2.417-.818-2.664-2.076A25.711 25.711 0 0 1 3 15c0-1.984.236-3.692.479-4.924C3.726 8.818 4.86 8 6.143 8H7V6zm8 0v2H9V6a3 3 0 1 1 6 0zm-8.857 4h11.714a.84.84 0 0 1 .508.157c.107.082.17.182.194.305.223 1.133.441 2.71.441 4.538 0 1.828-.218 3.405-.441 4.538a.488.488 0 0 1-.194.305.84.84 0 0 1-.508.157H6.143a.84.84 0 0 1-.508-.157.489.489 0 0 1-.194-.305A23.712 23.712 0 0 1 5 15c0-1.828.218-3.405.441-4.538a.489.489 0 0 1 .194-.305.84.84 0 0 1 .508-.157z"
                                fillRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                    <div className="action-button-text">{texts.privacyPolicy || 'Privacy Policy'}</div>
                    <div className="action-button-arrow">
                        <svg aria-hidden="true" className="ARROW" fill="currentColor" height="1em" viewBox="0 0 24 24" width="1em" style={{ transform: activePolicy ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                            <path clipRule="evenodd" d="M4.341 7.247a1 1 0 0 1 1.412.095L12 14.482l6.247-7.14a1 1 0 0 1 1.506 1.317l-7 8a1 1 0 0 1-1.506 0l-7-8a1 1 0 0 1 .095-1.412z" fillRule="evenodd"></path>
                        </svg>
                    </div>
                </div>
                <div className={`collapse ${activePolicy ? 'show' : ''}`} id="PolicyCollapse">
                    <div className="action-button-list" style={{ paddingLeft: '20px' }}>
                        {privacyQuestions.map((question, index) => (
                            <div
                                key={index}
                                className="action-button wide"
                                onClick={() => onOpenPrivacyModal(question)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="action-button-text">
                                    <span>{question}</span>
                                </div>
                                <div className="action-button-arrow">
                                    <svg className="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6 xlup9mm x1kky2od" fill="currentColor" height="1em" viewBox="0 0 24 24" width="1em">
                                        <path clipRule="evenodd" d="M7.247 4.341a1 1 0 0 1 1.412-.094l8 7a1 1 0 0 1 0 1.506l-8 7a1 1 0 0 1-1.318-1.506L14.482 12l-7.14-6.247a1 1 0 0 1-.094-1.412z" fillRule="evenodd"></path>
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    aria-controls="RulesCollapse"
                    aria-expanded={activeRules}
                    className="action-button collapsed"
                    onClick={() => setActiveRules(!activeRules)}
                >
                    <div className="action-button-img">
                        <svg aria-hidden="true" className="x1lliihq x1k90msu x2h7rmj x1qfuztq x198g3q0 xxk0z11 xvy4d1p" fill="currentColor" height="1em" viewBox="0 0 24 24" width="1em">
                            <path
                                clipRule="evenodd"
                                d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0 2c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11zm0-13.702c.483 0 .875.391.875.875V17a.875.875 0 0 1-1.75 0v-6.827c0-.484.392-.875.875-.875zm0-1.275c.833 0 1.25-.405 1.25-1.012C13.25 6.405 12.833 6 12 6s-1.25.405-1.25 1.011c0 .607.417 1.012 1.25 1.012z"
                                fillRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                    <div className="action-button-text">{texts.otherRules || 'Other rules and articles'}</div>
                    <div className="action-button-arrow">
                        <svg aria-hidden="true" className="ARROW" fill="currentColor" height="1em" viewBox="0 0 24 24" width="1em" style={{ transform: activeRules ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                            <path clipRule="evenodd" d="M4.341 7.247a1 1 0 0 1 1.412.095L12 14.482l6.247-7.14a1 1 0 0 1 1.506 1.317l-7 8a1 1 0 0 1-1.506 0l-7-8a1 1 0 0 1 .095-1.412z" fillRule="evenodd"></path>
                        </svg>
                    </div>
                </div>
                <div className={`collapse ${activeRules ? 'show' : ''}`} id="RulesCollapse">
                    <div className="action-button-list" style={{ paddingLeft: '20px' }}>
                        <div className="action-button wide" onClick={onOpenTermsModal} style={{ cursor: 'pointer' }}>
                            <div className="action-button-text">
                                <span>{texts.termsOfUse || 'Terms of use'}</span>
                            </div>
                            <div className="action-button-arrow">
                                <svg className="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6 xlup9mm x1kky2od" fill="currentColor" height="1em" viewBox="0 0 24 24" width="1em">
                                    <path clipRule="evenodd" d="M7.247 4.341a1 1 0 0 1 1.412-.094l8 7a1 1 0 0 1 0 1.506l-8 7a1 1 0 0 1-1.318-1.506L14.482 12l-7.14-6.247a1 1 0 0 1-.094-1.412z" fillRule="evenodd"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    aria-controls="SettingCollapse"
                    aria-expanded={activeSettings}
                    className="action-button collapsed"
                    onClick={() => setActiveSettings(!activeSettings)}
                >
                    <div className="action-button-img">
                        <svg aria-hidden="true" className="x1lliihq x1k90msu x2h7rmj x1qfuztq x198g3q0 xxk0z11 xvy4d1p" fill="currentColor" height="1em" viewBox="0 0 24 24" width="1em">
                            <path clipRule="evenodd" d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0zm-2 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" fillRule="evenodd"></path>
                            <path
                                clipRule="evenodd"
                                d="m22.191 9.207-2.224 2.06a8.112 8.112 0 0 1 0 1.466l2.224 2.06a1 1 0 0 1 .187 1.233l-1.702 2.948a1 1 0 0 1-1.162.455l-2.895-.896a7.991 7.991 0 0 1-1.27.735l-.672 2.954a1 1 0 0 1-.975.778H10.3a1 1 0 0 1-.975-.778l-.672-2.954a8 8 0 0 1-1.27-.735l-2.895.896a1 1 0 0 1-1.162-.455l-1.702-2.948a1 1 0 0 1 .187-1.233l2.224-2.06a8.1 8.1 0 0 1 0-1.466L1.81 9.207a1 1 0 0 1-.187-1.233l1.702-2.948a1 1 0 0 1 1.162-.455l2.895.896a7.992 7.992 0 0 1 1.27-.735l.672-2.954A1 1 0 0 1 10.299 1h3.403a1 1 0 0 1 .975.778l.672 2.954a7.99 7.99 0 0 1 1.27.735l2.895-.896a1 1 0 0 1 1.162.455l1.702 2.948a1 1 0 0 1-.187 1.233zm-8.574-3.071.894.412c.335.155.653.34.952.551l.805.57 3.075-.951.903 1.564-2.36 2.186.09.98a6.093 6.093 0 0 1 0 1.104l-.09.98 2.36 2.185-.903 1.565-3.075-.951-.805.57a5.993 5.993 0 0 1-.952.55l-.894.413L12.904 21h-1.807l-.713-3.136-.894-.412a5.993 5.993 0 0 1-.952-.551l-.805-.57-3.075.951-.904-1.565 2.36-2.185-.089-.98a6.102 6.102 0 0 1 0-1.104l.09-.98-2.36-2.186.903-1.564 3.075.951.805-.57c.299-.212.617-.396.952-.55l.894-.413L11.097 3h1.807l.713 3.136z"
                                fillRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                    <div className="action-button-text">{texts.settings || 'Settings'}</div>
                    <div className="action-button-arrow">
                        <svg aria-hidden="true" className="ARROW" fill="currentColor" height="1em" viewBox="0 0 24 24" width="1em" style={{ transform: activeSettings ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                            <path clipRule="evenodd" d="M4.341 7.247a1 1 0 0 1 1.412.095L12 14.482l6.247-7.14a1 1 0 0 1 1.506 1.317l-7 8a1 1 0 0 1-1.506 0l-7-8a1 1 0 0 1 .095-1.412z" fillRule="evenodd"></path>
                        </svg>
                    </div>
                </div>
                <div className={`collapse ${activeSettings ? 'show' : ''}`} id="SettingCollapse">
                    <div className="action-button-list" style={{ paddingLeft: '20px' }}>
                    </div>
                </div>
            </div>
        </div>
    );
};

Sidebar.propTypes = {
    texts: PropTypes.object.isRequired,
    onOpenSearchModal: PropTypes.func,
    onOpenPrivacyModal: PropTypes.func,
    onOpenTermsModal: PropTypes.func
};

export default Sidebar;
