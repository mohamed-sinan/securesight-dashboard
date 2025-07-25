'use client';
import styles from '../styles/IncidentItem.module.css';
import React, { useState } from 'react';

export default function IncidentItem({ incident }: { incident: any }) {
  const [fading, setFading] = useState(false);

  const handleResolve = async () => {
    setFading(true);
    await fetch(`/api/incidents/${incident.id}/resolve`, {
      method: 'PATCH',
    });
    setTimeout(() => {
      window.location.reload(); // Optionally replace with smoother state update
    }, 500);
  };

  function getIcon(type: string) {
    switch (type) {
      case 'Gun Threat':
        return '🔫';
      case 'Unauthorised Access':
        return '🚫';
      case 'Face Recognised':
        return '🙂';
      default:
        return '❗';
    }
  }

  return (
    <div className={`${styles.item} ${fading ? styles.fadeOut : ''}`}>
      <img src={incident.thumbnailUrl} alt="thumbnail" className={styles.thumbnail} />
      <div className={styles.details}>
        <h4 className={styles.type}>
          {getIcon(incident.type)} {incident.type}
        </h4>
        <p className={styles.time}>
          {incident.camera.name} —{' '}
          {new Intl.DateTimeFormat('en-IN', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          }).format(new Date(incident.tsStart))}{' '}
          to{' '}
          {new Intl.DateTimeFormat('en-IN', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          }).format(new Date(incident.tsEnd))}
        </p>
      </div>
      <button className={styles.resolveButton} onClick={handleResolve}>
        Resolve
      </button>
    </div>
  );
}
