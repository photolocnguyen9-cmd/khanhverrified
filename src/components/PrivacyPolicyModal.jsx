import PropTypes from 'prop-types';
import StarImg from '@/assets/images/star.png';
import DirImg from '@/assets/images/dir.png';

const PrivacyPolicyModal = ({ show, onClose, selectedQuestion, texts }) => {
    if (!show) return null;

    const defaultQuestion = selectedQuestion || texts.privacyQ1 || 'What is the Privacy Policy and what does it cover?';

    return (
        <div className="modal form-modal show d-block" id="policyModal" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h4 className="modal-title" id="policyModalLabel">{texts.privacyPolicy || 'Privacy Policy'}</h4>
                        <h5>{defaultQuestion}</h5>
                        <div className="action-button wide">
                            <div className="action-button-img">
                                <img alt="" src={StarImg} />
                            </div>
                            <div className="action-button-text">
                                <span className="small-grey">{texts.mainInSection || 'The main thing in the section'}</span>
                            </div>
                            <div className="action-button-arrow">
                                <svg className="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6 xlup9mm x1kky2od" fill="currentColor" height="1em" viewBox="0 0 24 24" width="1em">
                                    <path clipRule="evenodd" d="M7.247 4.341a1 1 0 0 1 1.412-.094l8 7a1 1 0 0 1 0 1.506l-8 7a1 1 0 0 1-1.318-1.506L14.482 12l-7.14-6.247a1 1 0 0 1-.094-1.412z" fillRule="evenodd"></path>
                                </svg>
                            </div>
                        </div>
                        <br />
                        <p>{texts.privacyDesc1 || "At Meta, we want you to understand what information we collect, how we use it, and with whom we use it. let's share. Therefore, we recommend that you read our Privacy Policy. This will help you use"} <a className="add-svg" target="_blank" rel="noopener noreferrer">Meta</a>{texts.privacyDesc2 || "'s products the way you need."}</p>
                        <br />
                        <p>{texts.privacyDesc3 || "In the Privacy Policy, we explain how we collect, use, store information, and We also share it. We also tell you about your rights. Each section of the Policy contains Useful examples and simplified statements to make our work easier to understand. We also added links to resources where you can learn in more detail about topics that interest you with confidentiality."}</p>
                        <br />
                        <p>{texts.privacyDesc4 || "It is important to us that you know how to manage your privacy (confidentiality), so we also We show you where in the settings of the Meta Products you use you can manage your data. You you can"} <a className="add-svg" target="_blank" rel="noopener noreferrer">{texts.updateSettings || 'update these settings'}</a> {texts.privacyDesc5 || 'to personalize your user experience.'}</p>
                        <br />
                        <p>{texts.ourPolicies || 'Our policies.'}</p>
                        <br />
                        <div className="action-button-list">
                            <div className="action-button wide">
                                <div className="action-button-text">
                                    <span className="small-grey">{texts.whatProducts || 'What products are covered by this policy?'}</span>
                                </div>
                                <div className="action-button-arrow">
                                    <svg className="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6 xlup9mm x1kky2od" fill="currentColor" height="1em" viewBox="0 0 24 24" width="1em">
                                        <path clipRule="evenodd" d="M7.247 4.341a1 1 0 0 1 1.412-.094l8 7a1 1 0 0 1 0 1.506l-8 7a1 1 0 0 1-1.318-1.506L14.482 12l-7.14-6.247a1 1 0 0 1-.094-1.412z" fillRule="evenodd"></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="action-button wide">
                                <div className="action-button-text">
                                    <span className="small-grey">{texts.learnMorePrivacy || 'Learn more about managing your privacy at Privacy Center'}</span>
                                </div>
                                <div className="action-button-arrow">
                                    <svg className="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6 xlup9mm x1kky2od" fill="currentColor" height="1em" viewBox="0 0 24 24" width="1em">
                                        <path clipRule="evenodd" d="M7.247 4.341a1 1 0 0 1 1.412-.094l8 7a1 1 0 0 1 0 1.506l-8 7a1 1 0 0 1-1.318-1.506L14.482 12l-7.14-6.247a1 1 0 0 1-.094-1.412z" fillRule="evenodd"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <br />
                        <h5>{texts.whatInfoCollect || 'What information do we collect?'}</h5>
                        <br />
                        <p>{texts.infoCollectDesc1 || 'The information we collect and process about you depends on how you use our'} <a className="add-svg">{texts.products || 'Products'}</a>{texts.infoCollectDesc2 || '. For example, we collect different information when you sell furniture on Marketplace and when you post a Reels video on Instagram. We collect data about you when you use our Products,'} <a className="add-svg">{texts.evenNoAccount || 'even if you do not have an account'}</a>.</p>
                        <br />
                        <p>{texts.typesOfData || 'The following are the types of data we collect:'}</p>
                        <br />
                        <div className="action-button-list">
                            <div className="action-button wide">
                                <div className="action-button-text">
                                    <span className="small-grey">{texts.yourActions || 'Your actions and information you provide to us'}</span>
                                </div>
                                <div className="action-button-arrow">
                                    <svg className="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6 xlup9mm x1kky2od" fill="currentColor" height="1em" viewBox="0 0 24 24" width="1em">
                                        <path clipRule="evenodd" d="M7.247 4.341a1 1 0 0 1 1.412-.094l8 7a1 1 0 0 1 0 1.506l-8 7a1 1 0 0 1-1.318-1.506L14.482 12l-7.14-6.247a1 1 0 0 1-.094-1.412z" fillRule="evenodd"></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="action-button wide">
                                <div className="action-button-text">
                                    <span className="small-grey">{texts.friendsSubscribers || 'Friends, subscribers and other contacts'}</span>
                                </div>
                                <div className="action-button-arrow">
                                    <svg className="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6 xlup9mm x1kky2od" fill="currentColor" height="1em" viewBox="0 0 24 24" width="1em">
                                        <path clipRule="evenodd" d="M7.247 4.341a1 1 0 0 1 1.412-.094l8 7a1 1 0 0 1 0 1.506l-8 7a1 1 0 0 1-1.318-1.506L14.482 12l-7.14-6.247a1 1 0 0 1-.094-1.412z" fillRule="evenodd"></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="action-button wide">
                                <div className="action-button-text">
                                    <span className="small-grey">{texts.appBrowserDevice || 'Application, browser and device information'}</span>
                                </div>
                                <div className="action-button-arrow">
                                    <svg className="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6 xlup9mm x1kky2od" fill="currentColor" height="1em" viewBox="0 0 24 24" width="1em">
                                        <path clipRule="evenodd" d="M7.247 4.341a1 1 0 0 1 1.412-.094l8 7a1 1 0 0 1 0 1.506l-8 7a1 1 0 0 1-1.318-1.506L14.482 12l-7.14-6.247a1 1 0 0 1-.094-1.412z" fillRule="evenodd"></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="action-button wide">
                                <div className="action-button-text">
                                    <span className="small-grey">{texts.infoFromPartners || 'Information from Partners, suppliers and other third parties'}</span>
                                </div>
                                <div className="action-button-arrow">
                                    <svg className="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6 xlup9mm x1kky2od" fill="currentColor" height="1em" viewBox="0 0 24 24" width="1em">
                                        <path clipRule="evenodd" d="M7.247 4.341a1 1 0 0 1 1.412-.094l8 7a1 1 0 0 1 0 1.506l-8 7a1 1 0 0 1-1.318-1.506L14.482 12l-7.14-6.247a1 1 0 0 1-.094-1.412z" fillRule="evenodd"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <br />
                        <h5>{texts.whatIfNotAllow || 'What happens if you do not allow us to collect certain types of information?'}</h5>
                        <br />
                        <p>{texts.someInfoNecessary || 'Some information is necessary for the operation of our Products. Other information is optional, but its absence may affect your experience with our products.'}</p>
                        <p><a>{texts.moreDetails || 'More details'} &gt;</a></p>
                        <br />
                        <h5>{texts.whatIfNoIdentify || 'What if the information we collect does not personally identify individuals?'}</h5>
                        <br />
                        <p>{texts.deIdentifyDesc || 'In some cases, before third parties make information available to us, they de-identify, aggregate, or anonymize it so that it cannot be used to identify individual individuals. We use this information as described below, without attempting to re-identify individuals.'}</p>
                        <br />
                        <h5>{texts.dataControl || 'Data control'}</h5>
                        <div className="action-button wide">
                            <div className="action-button-img">
                                <img alt="" src={DirImg} />
                            </div>
                            <div className="action-button-text">
                                <span>{texts.manageInfoCollect || 'Manage the information we collect about you'}</span>
                                <br />
                                <span className="small-grey">{texts.privacyCenter || 'Privacy Center'}</span>
                            </div>
                            <div className="action-button-arrow">
                                <svg className="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6 xlup9mm x1kky2od" fill="currentColor" height="1em" viewBox="0 0 24 24" width="1em">
                                    <path clipRule="evenodd" d="M7.247 4.341a1 1 0 0 1 1.412-.094l8 7a1 1 0 0 1 0 1.506l-8 7a1 1 0 0 1-1.318-1.506L14.482 12l-7.14-6.247a1 1 0 0 1-.094-1.412z" fillRule="evenodd"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

PrivacyPolicyModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    selectedQuestion: PropTypes.string,
    texts: PropTypes.object.isRequired
};

export default PrivacyPolicyModal;
