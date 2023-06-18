'use client';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import PillButton from './overriden/pill-button';
import Image from 'next/image';
import Button from './overriden/button';
import Label from './overriden/label';
import Input from './overriden/input';

export const SignInForm = () => {
  return (
    <div className="w-1/2">
      <p className="text-secondary text-4xl font-bold font-lato">Sign In</p>
      <p className="text-secondary text-md font-lato">
        Sign in to your account (only google sign in works for now)
      </p>
      <div className="pills-section flex justify-between gap-4 mt-6">
        <PillButton
          onClick={() => {
            signIn('google', { callbackUrl: '/dashboard' });
          }}
        >
          <Image
            src="/icons/google.svg"
            height={20}
            width={20}
            alt="google icon"
            className="mr-2"
          />
          Sign in with Google (Use this)
        </PillButton>
        <PillButton>
          <Image
            src="/icons/apple.svg"
            height={20}
            width={20}
            alt="google icon"
            className="mr-2"
          />{' '}
          Sign in with Apple
        </PillButton>
      </div>
      <form className="mt-6 p-7 bg-primary rounded-xl">
        <Label htmlFor="email">Email address</Label>
        <Input name="email" />
        <Label htmlFor="password" className="mt-6">
          Password
        </Label>
        <Input name="password" type="password" />
        <Link href="/forgot-password">Forgot password?</Link>
        <Button className="mt-4">Sign in</Button>
      </form>

      <p className="text-center">
        Dont have an account? <Link href="/register-here">Register here</Link>
      </p>
    </div>
  );
};
