import React from 'react';

interface Props {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  size?: 'xs' | 'sm' | 'm' | 'l' | 'lg' | null;
  className?: string | null;
}

const Typography: React.FC<Props> = ({ children, variant = 'h1', size = null, className = null }) => {
  const sizes = {
    xs: '0.25rem',
    sm: '0.5rem',
    m: '1rem',
    l: '1.5rem',
    lg: '2rem',
  };

  return React.createElement(variant, size ? { className, style: { fontSize: sizes[size] } } : { className }, children);
};

export default Typography;
