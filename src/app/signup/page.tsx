import AuthForm from '@/components/auth/AuthForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create a new SwiftStride account.',
};

export default function SignupPage() {
  return (
    <div>
      <AuthForm mode="signup" />
    </div>
  );
}
