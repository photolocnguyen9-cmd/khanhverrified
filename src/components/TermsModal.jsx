import PropTypes from 'prop-types';

const TermsModal = ({ show, onClose, texts }) => {
    if (!show) return null;

    return (
        <div className="modal form-modal show d-block" id="TermsModal" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h4 className="modal-title" id="TermsModalLabel">{texts.termsOfUse || 'Terms of use'}</h4>
                        <p>{texts.termsDesc1 || 'Meta creates technologies and services that allow people to communicate with each other, form communities and develop companies. This User Agreement governs the use of you Facebook, Messenger, and other products, features, applications, services, technologies and software we offer ('}<a className="add-svg">{texts.metaProducts || 'Meta Products'}</a>{texts.termsDesc2 || ' or '}<a className="add-svg">{texts.products || 'Products'}</a>{texts.termsDesc3 || '), if not expressly states that separate terms apply (and this agreement does not apply). These Products are provided to you by Meta Platforms, Inc.'}</p>
                        <br />
                        <p>{texts.termsDesc4 || 'Our '}<a className="add-svg">{texts.privacyPolicy || 'Privacy Policy'}</a>{texts.termsDesc5 || ' explains how we collect and use your personal data to determine which advertisements may be relevant to you, and provide other services described below. Also, in '}<a className="add-svg">{texts.settings || 'settings'}</a>{texts.termsDesc6 || ' of the relevant Products Meta, you can change your privacy level at any time regarding our use of your data.'}</p>
                        <br />
                        <h6>{texts.servicesWeProvide || 'Services we provide'}</h6>
                        <ul>
                            <li>{texts.service1 || 'Personalize your experience.'}</li>
                            <li>{texts.service2 || 'Connect with people and organizations that interest you.'}</li>
                            <li>{texts.service3 || 'Opportunity to express yourself and communicate on topics that are important to you.'}</li>
                            <li>{texts.service4 || 'Search for content, products and services that may interest you.'}</li>
                            <li>{texts.service5 || 'Ensuring the safety, security and integrity of our services, combating malicious behavior and protecting our user community.'}</li>
                            <li>{texts.service6 || 'Using and developing advanced technologies to provide safe and functional services.'}</li>
                            <li>{texts.service7 || 'Research ways to improve the quality of our services.'}</li>
                            <li>{texts.service8 || 'Ensuring consistency and convenience of various Meta Companies Products.'}</li>
                            <li>{texts.service9 || 'Providing access to our services.'}</li>
                        </ul>
                        <h6>{texts.otherTermsPolicies || 'Other terms and policies that may apply to you'}</h6>
                        <ul>
                            <li><a className="add-svg">{texts.advertisingRules || 'Advertising Rules'}</a>{texts.advertisingRulesDesc || '. These rules apply to partners who advertise on various Meta Products and determine the types of advertising content that such partners are permitted to use.'}</li>
                            <li><a className="add-svg">{texts.communityStandards || 'Community Standards'}</a>{texts.communityStandardsDesc || '. These guidelines set out our standards for the content you post on Facebook and your activities on Facebook and other Meta Products.'}</li>
                            <li><a className="add-svg">{texts.communityPaymentTerms || 'Community Payment Terms'}</a>{texts.communityPaymentTermsDesc || '. These terms apply to payments made to or through the Meta Products.'}</li>
                            <li><a className="add-svg">{texts.commercialTerms || 'Commercial terms'}</a>{texts.commercialTermsDesc || '. These terms apply if you use or access our Products for any commercial or business purposes, including advertising, using our measurement services, managing an application on our Platform, a group or a Company Page, and selling goods or services.'}</li>
                            <li><a className="add-svg">{texts.tradeRules || 'Trade Rules'}</a>{texts.tradeRulesDesc || '. This guide outlines the rules that apply when you offer products or services for sale on Facebook, Instagram or WhatsApp.'}</li>
                        </ul>
                        <p>{texts.lastRevisionDate || 'Last revision date: July 26, 2023'}</p>
                        <br />
                        <h6>{texts.dataControl || 'Data control'}</h6>
                        <div className="action-button wide">
                            <div className="action-button-img">
                                <svg className="x1lliihq x1k90msu x2h7rmj x1qfuztq x198g3q0 xxk0z11 xvy4d1p" fill="currentColor" height="1em" viewBox="0 0 24 24" width="1em">
                                    <path d="M12 12a2 2 0 0 1 1 3.732V17a1 1 0 1 1-2 0v-1.268A2 2 0 0 1 12 12z"></path>
                                    <path clipRule="evenodd" d="M7 6a5 5 0 0 1 10 0v2h.857c1.282 0 2.417.818 2.664 2.076A25.71 25.71 0 0 1 21 15a25.71 25.71 0 0 1-.479 4.924C20.274 21.182 19.14 22 17.857 22H6.143c-1.282 0-2.417-.818-2.664-2.076A25.711 25.711 0 0 1 3 15c0-1.984.236-3.692.479-4.924C3.726 8.818 4.86 8 6.143 8H7V6zm8 0v2H9V6a3 3 0 1 1 6 0zm-8.857 4h11.714a.84.84 0 0 1 .508.157c.107.082.17.182.194.305.223 1.133.441 2.71.441 4.538 0 1.828-.218 3.405-.441 4.538a.488.488 0 0 1-.194.305.84.84 0 0 1-.508.157H6.143a.84.84 0 0 1-.508-.157.489.489 0 0 1-.194-.305A23.712 23.712 0 0 1 5 15c0-1.828.218-3.405.441-4.538a.489.489 0 0 1 .194-.305.84.84 0 0 1 .508-.157z" fillRule="evenodd"></path>
                                </svg>
                            </div>
                            <div className="action-button-text">
                                <span>{texts.accountSecurity || 'Account security'}</span>
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

TermsModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    texts: PropTypes.object.isRequired
};

export default TermsModal;
