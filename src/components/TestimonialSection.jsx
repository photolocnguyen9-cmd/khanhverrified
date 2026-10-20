import { useState } from 'react';
import PropTypes from 'prop-types';
import Video1 from '@/assets/images/f1video.mp4';
import Video2 from '@/assets/images/f2video.mp4';
import Video3 from '@/assets/images/f3video.mp4';
import Video4 from '@/assets/images/f4video.mp4';
import TickIcon from '@/assets/images/tick.svg';

const TestimonialSection = ({ texts }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            quote: texts.testimonial1 || '"Being Meta Verified has elevated my credibility with my audience. For new followers or potential partners viewing my profile, it shows that I am established and serious about my work."',
            video: Video1,
            user: '@kimalban',
            follow: '68K+ followers',
            link: 'https://www.instagram.com/kimalban/'
        },
        {
            quote: texts.testimonial2 || '"Meta Verified helped me build my credibility as a creator."',
            video: Video2,
            user: '@sssourabh',
            follow: '90k+ followers',
            link: 'https://www.instagram.com/sssourabh/'
        },
        {
            quote: texts.testimonial3 || '"I like how Meta Verified added an extra layer of security to help protect me from impersonation."',
            video: Video3,
            user: '@lizzlovestech',
            follow: '94K+ followers',
            link: 'https://www.instagram.com/lizzlovestech/'
        },
        {
            quote: texts.testimonial4 || '"Meta Verified helped my account stand out from impersonators, which helped me secure more paying clients."',
            video: Video4,
            user: '@inversionista_gal',
            follow: '4K+ followers',
            link: 'https://www.instagram.com/inversionista_gal/'
        }
    ];

    const current = testimonials[currentIndex];

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    return (
        <div className="mv-testimonial">
            <div className="mv-quote" id="mvQuote">
                {current.quote}
            </div>

            <div className="mv-profile">
                <video
                    src={current.video}
                    className="mv-avatar"
                    id="mvAvatar"
                    autoPlay
                    loop
                    muted
                    playsInline
                />

                <div className="mv-name">
                    <a id="mvUser" className="mv-user-link" href={current.link} target="_blank" rel="noopener">
                        {current.user}
                    </a>
                    <img src={TickIcon} width="18" alt="tick" style={{ verticalAlign: 'middle' }} />
                </div>

                <div className="mv-follow" id="mvFollow">
                    {current.follow}
                </div>
            </div>

            <div className="mv-controls">
                <button className="mv-btn" id="mvPrev" onClick={handlePrev}>
                    ‹
                </button>

                <div className="mv-dots" id="mvDots">
                    {testimonials.map((_, i) => (
                        <div key={i} className={`mv-dot ${i === currentIndex ? 'active' : ''}`}></div>
                    ))}
                </div>

                <button className="mv-btn" id="mvNext" onClick={handleNext}>
                    ›
                </button>
            </div>
        </div>
    );
};

TestimonialSection.propTypes = {
    texts: PropTypes.object.isRequired
};

export default TestimonialSection;

