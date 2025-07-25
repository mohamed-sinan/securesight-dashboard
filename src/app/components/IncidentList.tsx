'use client';
import { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import styles from '../styles/IncidentList.module.css';
import IncidentItem from './IncidentItem';
import { Incident } from '@prisma/client';

export default function IncidentList() {
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    fetch('/api/incidents?resolved=false')
      .then((res) => res.json())
      .then((data) => setIncidents(data));
  }, []);

  const unresolvedCount = incidents.filter(i => !i.resolved).length;
  const resolvedCount = incidents.filter(i => i.resolved).length;

  return (
    <div className={styles.list}>
      <div className={styles.counterContainer}>
        <div className={styles.counterUnresolved}>
          <AlertCircle size={20} color="#f87171" strokeWidth={2} />
          <span className={styles.counterText}>Unresolved: {unresolvedCount}</span>
        </div>
        <div className={styles.counterResolved}>
          <CheckCircle size={20} color="#4ade80" strokeWidth={2} />
          <span className={styles.counterText}>Resolved: {resolvedCount}</span>
        </div>
      </div>

      {incidents.map((incident) => (
        <IncidentItem key={incident.id} incident={incident} />
      ))}
    </div>
  );
}
