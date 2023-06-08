
import ProfileSidebar from '@/components/ProfileSidebar/ProfileSidebar';
import styles from './layout.module.css';

export default function DashboardLayout({
  children, // will be a page or nested layout
}) {

  return (
    <div className={styles.dashboard}>
      <ProfileSidebar ltr width="200px"/>
      {children}
      
    </div>
  );
}