import React from 'react';
import './Videoabonements.css';

function Videoabonements() {
  return (
    <div className="video-container">
      <video autoPlay muted loop playsInline>
        <source src="/videos/abonements.mp4" type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>

      <div className="video-overlay">
      </div>
    </div>
  );
}

export default Videoabonements;
