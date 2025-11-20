import React from 'react';
import { useNavigate } from 'react-router-dom'; // Добавьте этот импорт
import './Sections.css';
import hatha from './hatha.png';
import vinyasa from './vinyasa.png';
import online from './online.png';
import online2 from './online2.png';
import animal from './animal.png';
import animal2 from './animal2.png';

const Sections = () => {
  const navigate = useNavigate(); // Хук для навигации

  // Функция для перехода на страницу расписания
  const handleScheduleClick = () => {
    navigate('/schedule'); // Переход на страницу расписания
  };

  // Простая функция для прокрутки к элементу
  React.useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="sections-container">
      {/* Хатха-йога */}
      <div id="hatha-yoga" className="section">
        <div className="section-half">
          <img src={hatha} alt="Хатха-йога" className="section-image-full" />
        </div>
        <div className="section-half section-text">
          <h2>Хатха-йога</h2>
          <p>Для начинающих и для тех, кто хочет улучшить физическое состояние.</p>
          <p>Сочетает асаны, дыхательные техники и медитацию.</p>
          <p>Укрепление тела, улучшение гибкости, расслабление ума и снижение стресса</p>
          <button className="try-button" onClick={handleScheduleClick}>Попробовать</button>
        </div>
      </div>

      {/* Виньяса-йога */}
      <div id="vinyasa-yoga" className="section reverse">
        <div className="section-half">
          <img src={vinyasa} alt="Виньяса-йога" className="section-image-full" />
        </div>
        <div className="section-half section-text">
          <h2>Виньяса-йога</h2>
          <p>Для тех, кто хочет более динамичную и <span className="highlight">структурированную</span> практику</p>
          <p>Последовательное выполнение фиксированных асан с синхронизацией дыхания.</p>
          <p>Укрепление тела, повышение выносливости, развитие концентрации и дисциплины.</p>
          <button onClick={handleScheduleClick}>Записаться</button>
        </div>
      </div>

      {/* Онлайн-Йога */}
      <div id="online-yoga" className="section online-layout">
        <div className="online-left-image">
          <img src={online} alt="Онлайн-йога 1" />
        </div>

        <div className="online-text">
          <h2>Онлайн-Йога</h2>
          <p>Для тех, кто ищет удобство и гибкость в практике.</p>
          <p>Занятия, которые можно выполнять в любое время и в любом месте, с доступом к разнообразным стилям и техникам.</p>
          <p>Возможность заниматься онлайн с преподавателем, в группе или смотреть готовые уроки.</p>
          <button onClick={handleScheduleClick}>Записаться</button>
        </div>

        <div className="online-right-image">
          <img src={online2} alt="Онлайн-йога 2" />
        </div>
      </div>

      {/* Йога с Животными */}
      <div id="animal-yoga" className="section animal-layout">
        <div className="animal-text">
          <h2>Йога с Животными</h2>
          <p>Для тех, кто хочет добавить радость и игривость в свою практику.</p>
          <p>Занятия, включают взаимодействие с животными во время выполнения асан, что способствует расслаблению и веселью.</p>
          <p>Улучшение эмоционального состояния, укрепление связи с питомцем и развитие чувства общей гармонии через движение.</p>
          <button onClick={handleScheduleClick}>Записаться</button>
        </div>

        <div className="animal-images">
          <img src={animal2} alt="Йога с животными 2" className="animal-image-small" />
          <img src={animal} alt="Йога с животными 1" className="animal-image-large" />
        </div>
      </div>
    </div>
  );
};

export default Sections;