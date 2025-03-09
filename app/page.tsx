"use client"; 
import { useEffect, useState } from 'react';

export default function Home() {
  const [iframeHeight, setIframeHeight] = useState('100vh'); // Default height

  useEffect(() => {
    // Set iframe height to window's inner height
    setIframeHeight(`${window.innerHeight}px`);

    // Handle window resize
    const handleResize = () => {
      setIframeHeight(`${window.innerHeight}px`);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ width: '100%', height: iframeHeight }}>
      <iframe
        src="/authentication-login.html"
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
    </div>
  );
}