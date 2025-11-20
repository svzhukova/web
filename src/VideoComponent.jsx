import React from 'react';
import './VideoComponent.css';

function VideoComponent() {
  return (
    <div className="video-section">
      <video autoPlay muted loop playsInline>
        <source src="/videos/intro.mp4" type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>
      </div>
  );
}

export default VideoComponent;