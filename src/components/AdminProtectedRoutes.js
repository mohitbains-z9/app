'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminRouteProtect({ children }) {
  const router = useRouter();

  useEffect(() => {
    
    const adminData = localStorage.getItem('adminData');
    if (!adminData) {
     
      router.replace('/pages/AdminLogin');
    }
  }, [router]);

 
  return children;
}