'use client';

import Link from 'next/link';
import './authPagesGlobal.css';
import { ArrowReplyFilled } from '@fluentui/react-icons';
import Image from 'next/image';

export default function AuthPagesLayout({ children }) {
  return (
    <div className="authPageContainer">
      <Link href="/" className="backButtonLink">
        <ArrowReplyFilled fontSize={24} />
      </Link>
      <Image
        className="logoAuth"
        priority={true}
        src="/images/logoAuth.svg"
        alt="Logo Acme"
        width={91}
        height={30}
      />
      <div className="acmeLogoBack">
        <Image
          className="desktopLogoAuth"
          priority={true}
          src="/images/logoFooter.svg"
          alt="Logo Acme"
          width={109}
          height={36}
        />
      </div>
      <div className="formWrapper">{children}</div>
    </div>
  );
}
