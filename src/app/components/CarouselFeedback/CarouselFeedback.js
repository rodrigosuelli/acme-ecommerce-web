'use client';

import Carousel from 'react-multi-carousel';

import Image from 'next/image';
import styles from './CarouselFeedback.module.css';
import StarsList from '../ProductRating/StarsList';

import feedback1Mobile from '../../../../public/images/feedbacks/feedback1Mobile.png';
import feedback2Mobile from '../../../../public/images/feedbacks/feedback2Mobile.png';
import feedback3Mobile from '../../../../public/images/feedbacks/feedback3Mobile.png';
import feedback4Mobile from '../../../../public/images/feedbacks/feedback4Mobile.png';
import feedback5Mobile from '../../../../public/images/feedbacks/feedback5Mobile.png';

function CarouselFeedback() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1299 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1299, min: 969 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 969, min: 759 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 759, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      draggable={false}
      showDots={true}
      responsive={responsive}
      containerClass={styles.carouselContainer}
      itemClass={styles.carouselItem}
      renderDotsOutside={true}
      dotListClass={styles.carouselDotList}
      infinite={true}
    >
      <div className={styles.feedbackItem}>
        <Image src={feedback1Mobile} alt="imagem rosto do avaliador" />
        <h4 className={styles.feedbackUserName}>Jane Doe</h4>
        <h2 className={styles.feedbackTitle}>Loja Incrível</h2>
        <div className={styles.feedbackAvaliacao}>
          <StarsList numberOfStarsFilled={5} fontSize={18} />
        </div>
        <p>
          Estou impressionada com a qualidade e a beleza das joias que encontrei
          na sua loja. Cada peça é única e radiante, e o atendimento ao cliente
          foi excepcional. Fiquei satisfeita em encontrar a joia perfeita para
          uma ocasião especial, e definitivamente vou recomendar a loja aos meus
          amigos e familiares. Continuem o ótimo trabalho!
        </p>
      </div>
      <div className={styles.feedbackItem}>
        <Image src={feedback2Mobile} alt="imagem rosto do avaliador" />
        <h4 className={styles.feedbackUserName}>Leona Stein</h4>
        <h2 className={styles.feedbackTitle}>Loja Incrível</h2>
        <div className={styles.feedbackAvaliacao}>
          <StarsList numberOfStarsFilled={5} fontSize={18} />
        </div>
        <p>
          Estou impressionada com a qualidade e a beleza das joias que encontrei
          na sua loja. Cada peça é única e radiante, e o atendimento ao cliente
          foi excepcional. Fiquei satisfeita em encontrar a joia perfeita para
          uma ocasião especial, e definitivamente vou recomendar a loja aos meus
          amigos e familiares. Continuem o ótimo trabalho!
        </p>
      </div>
      <div className={styles.feedbackItem}>
        <Image src={feedback3Mobile} alt="imagem rosto do avaliador" />
        <h4 className={styles.feedbackUserName}>Bradley Hampton</h4>
        <h2 className={styles.feedbackTitle}>Loja Incrível</h2>
        <div className={styles.feedbackAvaliacao}>
          <StarsList numberOfStarsFilled={5} fontSize={18} />
        </div>
        <p>
          Estou impressionada com a qualidade e a beleza das joias que encontrei
          na sua loja. Cada peça é única e radiante, e o atendimento ao cliente
          foi excepcional. Fiquei satisfeita em encontrar a joia perfeita para
          uma ocasião especial, e definitivamente vou recomendar a loja aos meus
          amigos e familiares. Continuem o ótimo trabalho!
        </p>
      </div>
      <div className={styles.feedbackItem}>
        <Image src={feedback4Mobile} alt="imagem rosto do avaliador" />
        <h4 className={styles.feedbackUserName}>Jonas Huffman</h4>
        <h2 className={styles.feedbackTitle}>Loja Incrível</h2>
        <div className={styles.feedbackAvaliacao}>
          <StarsList numberOfStarsFilled={5} fontSize={18} />
        </div>
        <p>
          Estou impressionada com a qualidade e a beleza das joias que encontrei
          na sua loja. Cada peça é única e radiante, e o atendimento ao cliente
          foi excepcional. Fiquei satisfeita em encontrar a joia perfeita para
          uma ocasião especial, e definitivamente vou recomendar a loja aos meus
          amigos e familiares. Continuem o ótimo trabalho!
        </p>
      </div>
      <div className={styles.feedbackItem}>
        <Image src={feedback5Mobile} alt="imagem rosto do avaliador" />
        <h4 className={styles.feedbackUserName}>Nikolas Mason</h4>
        <h2 className={styles.feedbackTitle}>Loja Incrível</h2>
        <div className={styles.feedbackAvaliacao}>
          <StarsList numberOfStarsFilled={5} fontSize={18} />
        </div>
        <p>
          Estou impressionada com a qualidade e a beleza das joias que encontrei
          na sua loja. Cada peça é única e radiante, e o atendimento ao cliente
          foi excepcional. Fiquei satisfeita em encontrar a joia perfeita para
          uma ocasião especial, e definitivamente vou recomendar a loja aos meus
          amigos e familiares. Continuem o ótimo trabalho!
        </p>
      </div>
    </Carousel>
  );
}

export default CarouselFeedback;
