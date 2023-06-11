"use client"
import {useState, useContext} from "react";
import styles from "./profileSidebar.module.css";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";


import AddIcon from '@mui/icons-material/Add';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsIcon from '@mui/icons-material/Settings';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import MenuIcon from '@mui/icons-material/Menu';

import Link from "next/link";
import Loading from "@/components/Loading/Loading";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

import { ThemeContext } from "../../context/ThemeContext";
import { useWindowSize } from "../../app/hooks/windowSize";


const ProfileSidebar = () => {

  const session = useSession()
  const router = useRouter();

  const fullPath=usePathname().substring(1)
  const relativePath=fullPath.slice(fullPath.indexOf("/") + 1)
  const size = useWindowSize();
 
  
  const { mode } = useContext(ThemeContext);
  const [collapsed, setCollapsed] = useState(true);

  if (session.status === "unauthenticated") {
    router.push("/login");
  }
  if (session.status === "loading") {
    return <Loading/>
  }
  
  
  if (session.status === "authenticated") {
    return (
      <div>  
        { ((relativePath !== "newPost" && size.width<450) || size.width>450) && <Sidebar  width="210px" backgroundColor={mode=== "light" ? "white" : "black"} collapsed={collapsed}>
          <Menu closeOnClick>
            <MenuItem
              className={[styles.menuItem, styles.title].join(" ")}
              icon= <MenuIcon/> 
              onClick={() => setCollapsed(!collapsed)}> Profile </MenuItem>
            <br/>
            <MenuItem active className={styles.menuItem} icon= <DashboardRoundedIcon/> component={<Link href="/dashboard/"/>}> Dashboard </MenuItem>
            <MenuItem className={styles.menuItem} icon= <AddIcon/> component={<Link href="/dashboard/newPost"/>}> New Post </MenuItem>
            <SubMenu  className={styles.subMenu} icon= <SettingsIcon/>  label="Settings">
              <MenuItem className={styles.menuItem} icon= <ManageAccountsIcon/> component={<Link href="/dashboard/account"/>} > Account </MenuItem>
              <MenuItem className={styles.menuItem} icon= <ToggleOnIcon/>  component={<Link href="/dashboard/appSettings" />} > App settings </MenuItem>
            </SubMenu>
          </Menu>

        </Sidebar>}
      </div>
    )
  }
};

export default ProfileSidebar;

// <div className={styles.wrapper}>
//           <div className={styles.sidebar}>
//             <div className={styles.profile}>
//                 <Image 
//                   src={session.data.user.image ? session.data.user.image:"/default.png"} alt="profile_picture"
//                   width={100}
//                   height={100}
//                   />
//                 <h3>{session.data.user.name}</h3>
//                 <p>Role</p>
//             </div>
//             <ul>
//               <li>
//                 <Link href="/dashboard/" className={styles.sidebarLink}>
//                   <DashboardRoundedIcon />  
//                   Dashboard
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/dashboard/newPost" className={styles.sidebarLink}>
//                   <AddIcon />  
//                   New Post
//                 </Link>
//               </li>
             
              
//               <li>
//                   <a href="#">
//                       <span class="icon"><i class="fas fa-user-shield"></i></span>
//                       <span class="item">Account</span>
//                   </a>
//               </li>
//               <li>
//                   <a href="#">
//                       <span class="icon"><i class="fas fa-cog"></i></span>
//                       <span class="item">Blog Settings</span>
//                   </a>
//               </li>
//             </ul>
//           </div>
//         </div>
