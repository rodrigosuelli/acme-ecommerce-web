'use client';

import { useState } from 'react';
import { ChevronDownFilled, ChevronUpFilled } from '@fluentui/react-icons';
import styles from './faleConosco.module.css';

function FaqItem({ title, content }) {
  const [isExpanded, setIsExpanded] = useState(false);

  function handleToggleExpanded() {
    setIsExpanded(!isExpanded);
  }

  return (
    <div className={styles.faqItem}>
      <div className={styles.faqTitleContainer}>
        <h3>{title}</h3>
        <button onClick={handleToggleExpanded} type="button">
          {isExpanded ? (
            <ChevronUpFilled fontSize={26} />
          ) : (
            <ChevronDownFilled fontSize={26} />
          )}
        </button>
      </div>

      <p className={`${isExpanded && styles.visible}`}>{content}</p>
    </div>
  );
}

export default FaqItem;
