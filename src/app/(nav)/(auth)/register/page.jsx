"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      res.status === 201 && router.push("/login?success=Account has been created");
    } catch (err) {
        setError(err);
        console.log(err);
    }
  };

  return (
    <div className={styles.registerPage}>
      
    <form className={styles.registerForm} onSubmit={handleSubmit}>
        <input required className={styles.input} type="text" placeholder="name" />
        <input required className={styles.input} type="text" placeholder="email" />
        <input required className={styles.input} type="password" placeholder="password" />
        <button className={styles.registerButton}>Register</button>
        {error && "Something went wrong!"}
      </form>
      
      <span className={styles.or}>- OR -</span>
      
      <Link className={styles.link} href="/login">
        Login with an existing account
      </Link>
      
    </div>
    
  );
};

export default Register;


