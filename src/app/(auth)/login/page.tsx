"use client"
import { useUser } from '@/actions/UserContext/UserContext';
import LoginForm from '@/components/auth/LoginForm'
import { useRouter } from 'next/navigation';
import React from 'react'

const page = () => {

  const { user } = useUser();
  const router = useRouter()
  if (!user) {
    router.push('/profile')
  }

  return (
    <div className='h-screen w-full items-center flex justify-center'>
      <LoginForm />
    </div>
  )
}

export default page