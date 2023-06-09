"use client";
import React, { use, useEffect, useState } from "react";
import styles from "./page.module.css";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Loading from "@/components/Loading/Loading";

const Login = ({ url }) => {
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setError(params.get("error"));
    setSuccess(params.get("success"));
  }, [params]);

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/dashboard");
    }
  } , [router,session.status])

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", {
      email,
      password,
    });
  };

  return (
    session.status === "loading" ? <Loading/> :
    session.status === "unauthenticated" &&     
    <div className={styles.loginPage}>
      <h1 className={styles.title}>{success ? success : "Welcome Back"}</h1>
      <h2 className={styles.subtitle}>Please sign in to see the dashboard.</h2>

      <form className={styles.loginForm} onSubmit={handleSubmit}>
          <input required className={styles.input} type="text" placeholder="email" />
          <input required className={styles.input} type="password" placeholder="password" />
          <button className={styles.loginButton}>Login</button>
          {error && error}
        </form>
      <button
        onClick={() => {
          signIn("google");
        }}
        className={styles.google}
      >
        Login with Google
      </button>
      <br />

      <span className={styles.or}>- OR -</span>
      <br />
      <Link className={styles.link} href="/register">
        Create new account
      </Link>
      {/* <button
        onClick={() => {
          signIn("github");
        }}
        className={styles.button + " " + styles.github}
      >
        Login with Github
      </button> */}
    </div>
    
  );
};

export default Login;
