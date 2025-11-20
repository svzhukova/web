import React from 'react';
import './AboutSection.css';

import aboutImage1 from '../studio.png';
import aboutImage2 from '../dog.png';
import aboutImage3 from '../studio.png';
import image1 from '../quote.png';
import image2 from '../yog.jpg';
import image3 from '../studio.png';

const AboutSection = () => {
    return (
        <section className="about-us">
            <div className="about-container">

                {/* ВЕРХНИЙ РЯД */}
                <div className="top-row">
                    <div className="about-card title-card">
                        <h1 className="studio-title">Serine Oasis</h1>
                    </div>
                    <div className="about-card">
                        <div className="card-image">
                            <img src={aboutImage1} alt="Студия йоги" />
                        </div>
                    </div>
                    <div className="about-card text-card">
                        <p className="main-text">
                            <strong>Мы выбираем осознанный образ жизни!</strong>
                        </p>
                        <p className="description">
                            Студия йоги с ведущим преподавательским составом в центре Москвы.
                            Здесь вы будете чувствовать себя как дома, ведь мы позаботились
                            о всех деталях до и после занятия.
                        </p>
                        <button
                            className="cta-button"
                            onClick={() => window.location.href = '/schedule'}
                        >
                            Запись на пробное занятие
                        </button>
                    </div>
                </div>

                {/* НИЖНИЙ РЯД */}
                <div className="bottom-row">
                    <div className="about-card">
                        <div className="card-image">
                            <img src={aboutImage2} alt="Йога практика" />
                        </div>
                    </div>
                    <div className="about-card">
                        <div className="card-image">
                            <img src={image1} alt="Цитата дня" />
                        </div>
                    </div>
                    <div className="about-card">
                        <div className="card-image">
                            <img src={image2} alt="Поза йоги" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
