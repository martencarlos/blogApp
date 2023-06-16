
"use client"
import ProfileSidebar from '@/components/ProfileSidebar/ProfileSidebar';
import styles from './layout.module.css';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading/Loading';
import { useEffect } from 'react';

export default function DashboardLayout({
  children, // will be a page or nested layout
}) {

  const session = useSession()
  const router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/login");
    }
   
  }, [router,session.status])

  return (
    session.status === "loading" ? 
    <Loading/>
    :
    session.status === "authenticated" &&
    <div className={styles.dashboard}>
      <ProfileSidebar/>
      {children}
    </div>
  );
}