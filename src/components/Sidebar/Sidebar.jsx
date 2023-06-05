"use client";
import React from "react";
import styles from "./sidebar.module.css";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import AddIcon from '@mui/icons-material/Add';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import Link from "next/link";


const Dashboard = () => {

  const session = useSession()
  const router = useRouter();

  if (session.status === "unauthenticated") {
    router.push("/login");
  }
  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "authenticated") {
    return (
        <div className={styles.wrapper}>
          <div className={styles.sidebar}>
            <div className={styles.profile}>
                <Image 
                  src={session.data.user.image ? session.data.user.image:"/default.png"} alt="profile_picture"
                  width={100}
                  height={100}
                  />
                <h3>{session.data.user.name}</h3>
                <p>Role</p>
            </div>
            <ul>
              <li>
                <Link href="/dashboard/" className={styles.sidebarLink}>
                  <DashboardRoundedIcon />  
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/newPost" className={styles.sidebarLink}>
                  <AddIcon />  
                  New Post
                </Link>
              </li>
             
              
              <li>
                  <a href="#">
                      <span class="icon"><i class="fas fa-user-shield"></i></span>
                      <span class="item">Account</span>
                  </a>
              </li>
              <li>
                  <a href="#">
                      <span class="icon"><i class="fas fa-cog"></i></span>
                      <span class="item">Blog Settings</span>
                  </a>
              </li>
            </ul>
          </div>
        </div>
    )
  }
};

export default Dashboard;
