"use client"; // Mark this component as a Client Component

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { auth, createUserWithEmailAndPassword } from '../lib/firebase-config'; // Import Firebase auth
import { doc, setDoc, getFirestore } from 'firebase/firestore'; // Import Firestore functions
import { useRouter } from 'next/navigation';


export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data to Firestore
      const db = getFirestore();
      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: email,
        createdAt: new Date().toISOString(),
        uid: user.uid,
      });

      console.log('User registered and data saved:', user);
      alert('Registration successful!');
      router.push('/dashboard');
    } catch (error:unknown) {
      setError(String(error));
      console.error('Registration error:', error);
    }
  };

  return (
    <>
      {/* Meta Tags */}
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
                    <form onSubmit={handleRegister}>
                      <div className="mb-3">
                        <label htmlFor="exampleInputtext1" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputtext1"
                          aria-describedby="textHelp"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
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
                      <button type="submit" className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">
                        Sign Up
                      </button>
                      <div className="d-flex align-items-center justify-content-center">
                        <p className="fs-4 mb-0 fw-bold">Already have an Account?</p>
                        <Link href="/" className="text-primary fw-bold ms-2">
                          Sign In
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
    </>
  );
}