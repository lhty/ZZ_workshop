import React from 'react';

import { usePrefersReducedMotion, useRandomInterval } from '../../../hooks';
import { range, random } from '../../../lib';

import styles from './Highlight.module.scss';

const generateSparkle = (color: string) => {
  const sparkle = {
    id: String(random(10000, 99999)),
    createdAt: Date.now(),
    color,
    size: random(5, 40),
    style: {
      top: `${random(0, 70)}%`,
      left: `${random(0, 70)}%`,
    },
  };
  return sparkle;
};

const Highlight: React.FC<{ color?: string }> = ({ children, color = '#FFC700', ...props }) => {
  const [sparkles, setSparkles] = React.useState(() => range(5).map(() => generateSparkle(color)));
  const prefersReducedMotion = usePrefersReducedMotion();

  useRandomInterval(
    () => {
      const sparkle = generateSparkle(color);
      const now = Date.now();
      const nextSparkles = sparkles.filter((sp) => {
        const delta = now - sp.createdAt;
        return delta < 750;
      });
      nextSparkles.push(sparkle);
      setSparkles(nextSparkles);
    },
    prefersReducedMotion ? 0 : 50,
    prefersReducedMotion ? 0 : 450,
  );

  return (
    <div className={styles.wrapper} {...props}>
      {sparkles.map(({ id, size, style, color }) => (
        <Sparkle key={id + size} {...{ size, style, color }} />
      ))}
      <div className={styles.childWrapper}>{children}</div>
    </div>
  );
};

interface IParticle {
  size: number;
  color?: string;
  style: Record<string, string>;
}
const Sparkle: React.FC<IParticle> = ({ size, color, style }) => {
  const path =
    'M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z';
  return (
    <div className={styles.sparkleWrapper} style={style}>
      <svg className={styles.sparkleSvg} style={{ width: size, height: size }} viewBox="0 0 68 68" fill="none">
        <path d={path} fill={color} />
      </svg>
    </div>
  );
};

// const Pokeball: React.FC<IParticle> = ({ size, style }) => {
//   return (
//     <div className={styles.sparkleWrapper} style={style}>
//       <svg className={styles.sparkleSvg} style={{ width: size, height: size }} viewBox="0 0 40 40" fill="none">
//         <path d="M40 18C38.9525 7.93308 30.3986 0 19.9995 0C9.60046 0 1.0475 7.93308 0 18H40Z" fill="#C5312A" />
//         <path
//           d="M0 22C1.0475 32.0669 9.60142 39.9993 19.9995 39.9993C30.3976 39.9993 38.9535 32.0669 40 22H0Z"
//           fill="white"
//         />
//         <path
//           d="M38 18V22H23.4649C22.7733 23.1956 21.4806 24 20 24C18.5194 24 17.2267 23.1956 16.5351 22H2V18H16.5351C17.2267 16.8044 18.5194 16 20 16C21.506 16 22.7825 16.7703 23.4649 18H38Z"
//           fill="black"
//         />
//       </svg>
//     </div>
//   );
// };

export default Highlight;
