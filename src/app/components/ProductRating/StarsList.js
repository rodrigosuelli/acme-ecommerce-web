'use client';

import { StarFilled, StarRegular } from '@fluentui/react-icons';

function StarsList({ numberOfStarsFilled, fontSize = 18 }) {
  const contentToRender = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= numberOfStarsFilled) {
      contentToRender.push(<StarFilled fontSize={fontSize} key={i} />);
    } else {
      contentToRender.push(<StarRegular fontSize={fontSize} key={i} />);
    }
  }

  return contentToRender;
}

export default StarsList;
