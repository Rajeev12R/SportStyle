import AuthForm from '@/components/auth/AuthForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your SwiftStride account.',
};

export default function LoginPage() {
  return (
    <div>
      <AuthForm mode="login" />
    </div>
  );
}
