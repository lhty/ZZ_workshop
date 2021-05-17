import React from 'react';

interface Props {
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  className?: string | null;
  size?: 'xs';
}

const Typography: React.FC<Props> = ({ children, type = 'h1', size, className = null }) => {
  return React.createElement(type, { className }, children);
};

export default Typography;
