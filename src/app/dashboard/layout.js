import Sidebar from '@/components/Sidebar/Sidebar';
import styles from './layout.module.css';

export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  return (
    <div className={styles.dashboard}>
      <Sidebar/>
      {children}
    </div>
  );
}