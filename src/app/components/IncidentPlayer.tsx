'use client';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Maximize2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import styles from '../styles/IncidentPlayer.module.css';

export default function IncidentPlayer() {
  return (
    <div className={styles.player}>
      <div className={styles.titleBar}>
        <h2>Now Playing: <span className={styles.highlight}>Unauthorised Access</span></h2>
        <p>10:30 AM – 10:45 AM</p>
      </div>

      <div className={styles.videoContainer}>
        <img
          src="/thumbnails/unauth1.jpg"
          className={styles.mainImage}
          alt="Main camera feed"
        />

        {/* Thumbnail overlays */}
        <div className={styles.thumbnailOverlay}>
          <div className={styles.thumb}>
            <img src="/thumbnails/unauth2.jpg" alt="Camera 2" />
            <p>Camera 2</p>
          </div>
          <div className={styles.thumb}>
            <img src="/thumbnails/gun1.jpg" alt="Camera 3" />
            <p>Camera 3</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressBar}>
          <div className={styles.progress}></div>
        </div>
      </div>

      {/* Controls in a bar */}
      <div className={styles.controlsBar}>
        <ChevronLeft className={styles.controlIcon} />
        <SkipBack className={styles.controlIcon} />
        <Play className={styles.controlIcon} />
        <SkipForward className={styles.controlIcon} />
        <ChevronRight className={styles.controlIcon} />
        <Maximize2 className={styles.controlIcon} />
      </div>

      {/* Camera info */}
      <p className={styles.cameraLabel}>Camera: Entrance Lobby</p>
    </div>
  );
}
