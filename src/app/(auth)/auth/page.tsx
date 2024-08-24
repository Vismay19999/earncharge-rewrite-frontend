import dynamic from 'next/dynamic';

const AuthorizationClientSide = dynamic(
  () => import('@/components/auth/otpLess/AuthorizationClientSide'),
  { ssr: false }
);

const Page = () => {
    return <AuthorizationClientSide />;
};

export default Page;