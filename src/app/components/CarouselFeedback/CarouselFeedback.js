'use client';

import Carousel from 'react-multi-carousel';

import Image from 'next/image';
import styles from './CarouselFeedback.module.css';
import StarsList from '../ProductRating/StarsList';

import feedback1Mobile from '../../../../public/images/feedbacks/feedback1Mobile.png';

function CarouselFeedback() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
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
    </Carousel>
  );
}

export default CarouselFeedback;
