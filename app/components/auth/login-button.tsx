"use client";

interface ILoginButtonProps {
    children: React.ReactNode;
    mode?: 'modal' | 'redirect';
    asChild?: boolean
}

import { useRouter } from 'next/navigation';
import React from 'react'

export const LoginButton = ({
    children,
    mode,
    asChild
}: ILoginButtonProps) => {
    const router = useRouter();
    const onClick = () => {
        router.push("/auth/login")
        console.log('test')
    }
  return (
    <span onClick={onClick} className='cursor-pointer'>
        {children}
    </span>
  )
}

