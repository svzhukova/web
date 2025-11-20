import React from 'react';
import hatha from './hatha.png';
import vinyasa from './vinyasa.png';
import online1 from './online.png';
import online2 from './online2.png';
import animal from './animal.png';
import animal2 from './animal2.png';

const Sections = () => {
  return (
    <div>
      {/* Текстовый раздел с картинками как на главной */}
      <section id="sections" className="section-section">
        <h2>Секции</h2>
        <div className="about-content">
          
          {/* Первый блок: картинка слева, текст справа */}
          <div className="about-block image-left">
            <div className="about-image">
              <img src={hatha} alt="История йоги" />
            </div>
            <div className="about-text">
              <p className="regular-font">
                <span className="playfair-font">Йога</span>— это древняя система практик, которая возникла более 5000 лет назад в Индии. 
                Она объединяет тело, ум и дух, помогая людям достичь гармонии и внутреннего спокойствия 
                и понимания своего места в мире.
              </p>
            </div>
          </div>
          
          {/* Второй блок: текст слева, картинка справа */}
          <div className="about-block image-right">
            <div className="about-text">
              <p className="about-quote playfair-font">
                Йога — это не только то, что происходит на коврике, но то каким человеком ты становишься за его пределами.
              </p>
            </div>
            <div className="about-image">
              <img src={vinyasa} alt="Йога за пределами коврика" className="larger-image" />
            </div>
          </div>
          
          {/* Второй блок: текст слева, картинка справа */}
          <div className="about-block image-right">
            <div className="about-text">
              <p className="about-quote playfair-font">
                Йога — это не только то, что происходит на коврике, но то каким человеком ты становишься за его пределами.
              </p>
            </div>
            <div className="about-image">
              <img src={online} alt="Йога за пределами коврика" className="larger-image" />
            </div>
          </div>

          {/* Третий блок: картинка слева, текст справа */}
          <div className="about-block image-left">
            <div className="about-image">
              <img src={animal} alt="Пространство Serine Oasis" />
            </div>
            <div className="about-text">
              <p className="regular-font">
                <span className="playfair-font">Serine Oasis</span> — это пространство, где в гармоничной атмосфере 
                и под внимательным руководством наших опытных наставников каждый сможет исследовать 
                возможности своего тела и разума. Мы стремимся помочь вам интегрировать йогу в повседневную 
                жизнь, наполняя ее осознанностью и смыслом.
              </p>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
};

export default Sections;