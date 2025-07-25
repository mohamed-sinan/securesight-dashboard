'use client';

import {
  LayoutDashboard,
  Camera,
  Film,
  ShieldAlert,
  Users,
  UserCircle,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <ShieldCheck size={20} color="white" />
        SecureSight
      </div>

      <div className={styles.links}>
        <span className={`${styles.link} ${styles.active}`}>
          <LayoutDashboard size={16} /> Dashboard
        </span>
        <span className={styles.link}>
          <Camera size={16} /> Cameras
        </span>
        <span className={styles.link}>
          <Film size={16} /> Scenes
        </span>
        <span className={styles.link}>
          <ShieldAlert size={16} /> Incidents
        </span>
        <span className={styles.link}>
          <Users size={16} /> Users
        </span>
      </div>

      <div className={styles.user}>
        <span>
          <UserCircle size={16} color="white" /> Mohamed Sinan
        </span>
        <span>
          <Mail size={16} color="white" /> mohamed.sinan@mandlac.com
        </span>
      </div>
    </nav>
  );
}
