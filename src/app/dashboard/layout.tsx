'use client';
import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

type DashboardLayoutProps = {
    children: ReactNode;
};

export default function DashboardLayout({ children }: Readonly<DashboardLayoutProps>) {
    const router = useRouter();

    useEffect(() => {
        const isAuthenticated = !!localStorage.getItem('accessToken'); // Example auth check
        if (!isAuthenticated) {
            localStorage.clear()
            router.push('/'); // Redirect to login if not authenticated
        }
    }, [router]);

    return (
        <div>
            {/* Protected Dashboard Layout */}
            {children}
        </div>
    );
}