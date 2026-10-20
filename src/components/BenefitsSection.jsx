import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Video1 from '@/assets/images/f1video.mp4';
import Video2 from '@/assets/images/f2video.mp4';
import Video3 from '@/assets/images/f3video.mp4';
import Video4 from '@/assets/images/f4video.mp4';

const BenefitsSection = ({ texts }) => {
    const [activeBenefit, setActiveBenefit] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);

    const benefits = [
        {
            title: texts.verifiedBadge || 'Verified badge',
            description: texts.verifiedBadgeDesc || 'The badge means that your profile was verified by Meta based on your activity across Meta technologies, or information or documents that you provided.',
            video: Video1
        },
        {
            title: texts.impersonationProtection || 'Impersonation protection',
            description: texts.impersonationProtectionDesc || 'Protect your brand with proactive impersonation monitoring. Meta will remove accounts that we determine are pretending to be you.',
            video: Video2
        },
        {
            title: texts.enhancedSupport || 'Enhanced support',
            description: texts.enhancedSupportDesc || 'Get 24/7 access to email or chat agent support.',
            video: Video3
        },
        {
            title: texts.upgradedProfile || 'Upgraded profile features',
            description: texts.upgradedProfileDesc || 'Enrich your profile by adding images to your links to help boost engagement.',
            video: Video4
        }
    ];

    useEffect(() => {
        const track = document.getElementById('benefitsTrack');
        if (track) {
            const handleScroll = () => {
                const cards = track.querySelectorAll('.benefit-card');
                let index = 0;
                let min = Infinity;

                cards.forEach((card, i) => {
                    const dist = Math.abs(card.getBoundingClientRect().left - track.getBoundingClientRect().left);
                    if (dist < min) {
                        min = dist;
                        index = i;
                    }
                });

                setCurrentSlide(index);
            };

            track.addEventListener('scroll', handleScroll);
            return () => track.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <div className="benefits-wrap">
            <div className="benefits-head">
                <h2>{texts.creatorToolkit || 'A creator toolkit to take your brand further'}</h2>
                <p>{texts.creatorToolkitDesc || 'Explore key Meta Verified benefits available for Facebook and Instagram. See creator plans and pricing for additional benefits.'}</p>
            </div>

            <div className="benefits-subtitle">{texts.metaVerifiedBenefits || 'Meta Verified benefits'}</div>

            <div className="benefits-desktop">
                <div className="benefits-list" id="benefitsList">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className={`benefit-link ${activeBenefit === index ? 'active' : ''}`}
                            onClick={() => setActiveBenefit(index)}
                        >
                            <h4>{benefit.title}</h4>
                            <p>{benefit.description}</p>
                        </div>
                    ))}
                </div>

                <div className="benefits-preview">
                    <video id="benefitsPreview" src={benefits[activeBenefit].video} autoPlay loop muted playsInline />
                </div>
            </div>

            <div className="benefits-mobile">
                <div className="slider-track" id="benefitsTrack">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="benefit-card">
                            <div className="card-img">
                                <video src={benefit.video} autoPlay loop muted playsInline />
                            </div>
                            <div className="card-title">{benefit.title}</div>
                            <div className="card-text">{benefit.description}</div>
                        </div>
                    ))}
                </div>

                <div className="slider-dots" id="benefitsDots">
                    {benefits.map((_, index) => (
                        <span key={index} className={`s-dot ${currentSlide === index ? 'active' : ''}`}></span>
                    ))}
                </div>
            </div>

            <div className="benefits-line"></div>
        </div>
    );
};

BenefitsSection.propTypes = {
    texts: PropTypes.object.isRequired
};

export default BenefitsSection;
