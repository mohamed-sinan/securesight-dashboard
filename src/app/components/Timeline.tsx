'use client';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Timeline.module.css';

export default function Timeline() {
  const [incidents, setIncidents] = useState<any[]>([]);
  const [scrubberX, setScrubberX] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    fetch('/api/incidents?resolved=false')
      .then(res => res.json())
      .then(data => {
        setIncidents(data);
        if (data.length > 0) {
          const sorted = data.sort(
            (a: any, b: any) => new Date(a.tsStart).getTime() - new Date(b.tsStart).getTime()
          );
          setScrubberX(getX(sorted[0].tsStart)); // Start at first incident
        }
      });
  }, []);

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const getX = (ts: string) => {
    const t = new Date(ts).getTime();
    return ((t - startOfDay.getTime()) / (1000 * 60 * 60 * 24)) * 100;
  };

  const getClosestIncidentX = (mouseX: number) => {
    const distances = incidents.map(i => ({
      x: getX(i.tsStart),
      diff: Math.abs(getX(i.tsStart) - mouseX)
    }));
    distances.sort((a, b) => a.diff - b.diff);
    return distances[0].x;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    moveScrubber(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    moveScrubber(e);
  };

  const handleMouseUp = () => {
    if (isDragging.current && scrubberX !== null) {
      const snappedX = getClosestIncidentX(scrubberX);
      setScrubberX(snappedX);
    }
    isDragging.current = false;
  };

  const moveScrubber = (e: React.MouseEvent) => {
    if (!svgRef.current) return;
    const bounds = svgRef.current.getBoundingClientRect();
    const relativeX = ((e.clientX - bounds.left) / bounds.width) * 100;
    setScrubberX(Math.max(0, Math.min(100, relativeX)));
  };

  return (
    <div className={styles.timelineWrapper}>
      <svg
        ref={svgRef}
        viewBox="0 0 100 10"
        className={styles.svg}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Base Line */}
        <line x1="0" y1="5" x2="100" y2="5" stroke="#aaa" strokeWidth="0.5" />

        {/* Hourly ticks */}
        {[...Array(25)].map((_, i) => (
          <line
            key={i}
            x1={(i * 4).toString()}
            y1="4"
            x2={(i * 4).toString()}
            y2="6"
            stroke="#ccc"
            strokeWidth="0.3"
          />
        ))}

        {/* Incident markers */}
        {incidents.map((incident) => (
          <circle
            key={incident.id}
            cx={getX(incident.tsStart)}
            cy="5"
            r="0.7"
            fill={
              incident.type === 'Gun Threat'
                ? '#e74c3c'
                : incident.type === 'Unauthorised Access'
                ? '#f39c12'
                : '#3498db'
            }
          >
            <title>
              {incident.type} — {new Date(incident.tsStart).toLocaleTimeString()}
            </title>
          </circle>
        ))}

        {/* Scrubber */}
        {scrubberX !== null && (
          <>
            <line
              x1={scrubberX}
              y1="0"
              x2={scrubberX}
              y2="10"
              stroke="white"
              strokeWidth="0.3"
              strokeDasharray="1,1"
            />
            <circle
              cx={scrubberX}
              cy="5"
              r="0.6"
              fill="white"
              stroke="#888"
              strokeWidth="0.2"
            />
          </>
        )}
      </svg>

      {/* Time labels */}
      <div className={styles.labels}>
        <span className={styles.labelItem}>00:00</span>
        <span className={styles.labelItem}>06:00</span>
        <span className={styles.labelItem}>12:00</span>
        <span className={styles.labelItem}>18:00</span>
        <span className={styles.labelItem}>24:00</span>
      </div>

      {/* Legend */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.gun}`} /> Gun Threat
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.access}`} /> Unauthorised Access
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.other}`} /> Other
        </div>
      </div>
    </div>
  );
}
