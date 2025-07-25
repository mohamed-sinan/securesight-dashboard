import Navbar from './components/Navbar';
import IncidentPlayer from './components/IncidentPlayer';
import IncidentList from './components/IncidentList';
import Timeline from './components/Timeline';

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <main style={{ display: 'flex', height: 'calc(100vh - 60px)', overflow: 'hidden' }}>
        <IncidentPlayer />
        <IncidentList />
      </main>
      <Timeline />
    </div>
  );
}
