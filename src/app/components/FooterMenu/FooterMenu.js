import Link from 'next/link';
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTiktok,
  BiLogoWhatsapp,
} from 'react-icons/bi';
import Image from 'next/image';
import styles from './FooterMenu.module.css';
import logoImg from '../../../../public/images/logoFooter.svg';

function FooterMenu() {
  return (
    <footer className={styles.footerMenu}>
      <Link href="/" className={styles.logoFooter}>
        <Image src={logoImg} alt="Logo Acme" />
      </Link>
      <div className={styles.links}>
        <div className={styles.linkContainer}>
          <Link href="/" className={styles.logoLink}>
            Home
          </Link>
        </div>
        <div className={styles.separator}></div>
        <span className={styles.inlineSeparator}>|</span>
        <div className={styles.linkContainer}>
          <Link href="#" className={styles.logoLink}>
            Sobre
          </Link>
        </div>
        <div className={styles.separator}></div>
        <span className={styles.inlineSeparator}>|</span>
        <div className={styles.linkContainer}>
          <Link href="#" className={styles.logoLink}>
            Lançamentos
          </Link>
        </div>
        <div className={styles.separator}></div>
        <span className={styles.inlineSeparator}>|</span>
        <div className={styles.linkContainer}>
          <Link href="#" className={styles.logoLink}>
            Fale Conosco
          </Link>
        </div>
        <div className={styles.separator}></div>
      </div>
      <div className={styles.social}>
        <BiLogoInstagram size={34} />
        <BiLogoFacebook size={34} />
        <BiLogoWhatsapp size={34} />
        <BiLogoTiktok size={34} />
      </div>
      <div className={styles.linkLine}>
        <span>Termos</span>
        <span className={styles.inlineSeparator}>|</span>
        <span>Privacidade</span>
        <span className={styles.inlineSeparator}>|</span>
        <span>Cookies</span>
      </div>
      <h4 className={styles.copyright}>&copy; 2023 ACME LTDA</h4>
    </footer>
  );
}

export default FooterMenu;
