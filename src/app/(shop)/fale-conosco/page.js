import {
  BiLogoFacebook,
  BiLogoGmail,
  BiLogoInstagram,
  BiLogoWhatsapp,
} from 'react-icons/bi';
import styles from './faleConosco.module.css';
import FaqItem from './FaqItem';

function FaleConosco() {
  return (
    <div className={`shopPage ${styles.faleConoscoPage}`}>
      <div className={styles.faleConoscoWrapper}>
        <div className={styles.pageTitleContainer}>
          <h1 className={styles.pageTitle}>Informações de Contato</h1>
          <div className="marker"></div>
        </div>

        <div className={styles.enderecoSection}>
          <div className={styles.leftContainer}>
            <div className={styles.infoContainer}>
              <p className={styles.infoTitle}>Endereço:</p>
              <p className={styles.infoContent}>Rua das Inovações, 123</p>
            </div>
            <div className={styles.infoContainer}>
              <p className={styles.infoTitle}>Cidade:</p>
              <p className={styles.infoContent}>Tecnópolis</p>
            </div>
            <div className={styles.infoContainer}>
              <p className={styles.infoTitle}>CEP:</p>
              <p className={styles.infoContent}>01234-567</p>
            </div>
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.infoContainer}>
              <p className={styles.infoTitle}>Telefone:</p>
              <p className={styles.infoContent}>(55) 1234-5678</p>
            </div>
            <div className={styles.infoContainer}>
              <p className={styles.infoTitle}>E-mail:</p>
              <p className={styles.infoContent}>
                contato@mundodosgadgets.com.br
              </p>
            </div>
            <div className={styles.infoContainer}>
              <p className={styles.infoTitle}>Site:</p>
              <p className={styles.infoContent}>www.mundodosgadgets.com.br</p>
            </div>
          </div>
        </div>

        <div className={styles.mapSection}>
          <div className={styles.leftContent}>
            <div className={styles.pageTitleContainer}>
              <h1 className={styles.pageTitle}>Localização</h1>
              <div className="marker"></div>
            </div>
            <p>
              Há mais de duas décadas, Ben Chestnut e Dan Kurzius abriram uma
              agência de web design chamada Rocket Science Group. O foco deles
              eram grandes clientes corporativos, mas, paralelamente, eles
              criaram um maravilhoso serviço de marketing por e-mail para
              pequenas empresas.
            </p>
          </div>
          <div className={styles.rightContent}>
            <iframe
              className={styles.iframeMap}
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1506.3135719482218!2d-46.97263556886721!3d-22.44344337896877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1700717301336!5m2!1spt-BR!2sbr"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className={styles.socialSection}>
          <div className={styles.pageTitleContainer}>
            <h1 className={styles.pageTitle}>Redes Sociais</h1>
            <div className="marker"></div>
          </div>
          <div className={styles.socialIconsWrapper}>
            <div className={`${styles.iconContainer} ${styles.magenta}`}>
              <BiLogoInstagram color="#fff" size={48} />
            </div>
            <div className={`${styles.iconContainer} ${styles.blue}`}>
              <BiLogoFacebook color="#fff" size={48} />
            </div>
            <div className={`${styles.iconContainer} ${styles.green}`}>
              <BiLogoWhatsapp color="#fff" size={48} />
            </div>
            <div className={`${styles.iconContainer} ${styles.red}`}>
              <BiLogoGmail color="#fff" size={48} />
            </div>
          </div>
        </div>

        <div className={styles.faqSection}>
          <div className={styles.pageTitleContainer}>
            <h1 className={styles.pageTitle}>FAQ</h1>
            <div className="marker"></div>
          </div>
          <div className={styles.faqList}>
            <FaqItem
              title="Integridade"
              content="Lorem ipsum dolor sit amet consectetur. Venenatis consectetur eget praesent posuere augue diam. Pulvinar arcu quisque nibh eget neque. Ut sed egestas id at adipiscing dui. Massa aliquet aenean viverra gravida nunc urna nullam."
            />
            <FaqItem
              title="Integridade"
              content="Lorem ipsum dolor sit amet consectetur. Venenatis consectetur eget praesent posuere augue diam. Pulvinar arcu quisque nibh eget neque. Ut sed egestas id at adipiscing dui. Massa aliquet aenean viverra gravida nunc urna nullam."
            />
            <FaqItem
              title="Integridade"
              content="Lorem ipsum dolor sit amet consectetur. Venenatis consectetur eget praesent posuere augue diam. Pulvinar arcu quisque nibh eget neque. Ut sed egestas id at adipiscing dui. Massa aliquet aenean viverra gravida nunc urna nullam."
            />
            <FaqItem
              title="Integridade"
              content="Lorem ipsum dolor sit amet consectetur. Venenatis consectetur eget praesent posuere augue diam. Pulvinar arcu quisque nibh eget neque. Ut sed egestas id at adipiscing dui. Massa aliquet aenean viverra gravida nunc urna nullam."
            />
            <FaqItem
              title="Integridade"
              content="Lorem ipsum dolor sit amet consectetur. Venenatis consectetur eget praesent posuere augue diam. Pulvinar arcu quisque nibh eget neque. Ut sed egestas id at adipiscing dui. Massa aliquet aenean viverra gravida nunc urna nullam."
            />
            <FaqItem
              title="Integridade"
              content="Lorem ipsum dolor sit amet consectetur. Venenatis consectetur eget praesent posuere augue diam. Pulvinar arcu quisque nibh eget neque. Ut sed egestas id at adipiscing dui. Massa aliquet aenean viverra gravida nunc urna nullam."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FaleConosco;
