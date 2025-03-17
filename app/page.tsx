// "use client"; 
// import { useEffect, useState } from 'react';

// export default function Home() {
//   const [iframeHeight, setIframeHeight] = useState('100vh'); // Default height

//   useEffect(() => {
//     // Set iframe height to window's inner height
//     setIframeHeight(`${window.innerHeight}px`);

//     // Handle window resize
//     const handleResize = () => {
//       setIframeHeight(`${window.innerHeight}px`);
//     };

//     window.addEventListener('resize', handleResize);

//     // Cleanup event listener
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <div style={{ width: '100%', height: iframeHeight }}>
//       <iframe
//         src="/authentication-login.html"
//         style={{ width: '100%', height: '100%', border: 'none' }}
//       />
//     </div>
//   );
// }


"use client"; // Mark this component as a Client Component

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { auth, signInWithEmailAndPassword } from '../app/lib/firebase-config'; // Import Firebase auth functions
import { useRouter, usePathname } from 'next/navigation'; // Use next/navigation for routing

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // Initialize the router
  const pathname = usePathname(); // Get the current pathname

  // Redirect logic based on authentication status
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/dashboard'); // Redirect to dashboard if user is logged in
      } else if (pathname !== '/') {
        router.push('/'); // Redirect to login page if user is not logged in and trying to access a protected page
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, [router, pathname]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('User signed in:', user);
      alert('Sign in successful!');

      // Redirect to the dashboard
      router.push('/dashboard');
    } catch (error:unknown) {
     
      setError(String(error));

      console.error('Sign in error:', error);
    }
  };

  return (
    <>
      {/* Body Wrapper */}
      <div
        className="page-wrapper"
        id="main-wrapper"
        data-layout="vertical"
        data-navbarbg="skin6"
        data-sidebartype="full"
        data-sidebar-position="fixed"
        data-header-position="fixed"
      >
        <div className="position-relative overflow-hidden text-bg-light min-vh-100 d-flex align-items-center justify-content-center">
          <div className="d-flex align-items-center justify-content-center w-100">
            <div className="row justify-content-center w-100">
              <div className="col-md-8 col-lg-6 col-xxl-3">
                <div className="card mb-0">
                  <div className="card-body">
                    <Link href="/" className="text-nowrap logo-img text-center d-block py-3 w-100">
                      <Image
                        src="/assets/images/logos/logo.png"
                        alt="Logo"
                        width={100}
                        height={100}
                        className="logo-img"
                      />
                    </Link>
                    <p className="text-center">Your Social Campaigns</p>
                    <form onSubmit={handleSignIn}>
                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="exampleInputPassword1"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      {error && <div className="alert alert-danger">{error}</div>}
                      <div className="d-flex align-items-center justify-content-between mb-4">
                        <div className="form-check">
                          <input
                            className="form-check-input primary"
                            type="checkbox"
                            value=""
                            id="flexCheckChecked"
                          />
                          <label className="form-check-label text-dark" htmlFor="flexCheckChecked">
                            Remember this Device
                          </label>
                        </div>
                        <Link href="/forgot-password" className="text-primary fw-bold">
                          Forgot Password ?
                        </Link>
                      </div>
                      <button type="submit" className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">
                        Sign In
                      </button>
                      <div className="d-flex align-items-center justify-content-center">
                        <p className="fs-4 mb-0 fw-bold">New to Modernize?</p>
                        <Link href="/register" className="text-primary fw-bold ms-2">
                          Create an account
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scripts */}
      <Script src="/assets/libs/jquery/dist/jquery.min.js" strategy="lazyOnload" />
      <Script src="/assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js" strategy="lazyOnload" />
      <Script
        src="https://cdn.jsdelivr.net/npm/iconify-icon@1.0.8/dist/iconify-icon.min.js"
        strategy="lazyOnload"
      />
    </>
  );
}