import React from 'react';
import { useOnClickOutside } from '../../hooks';

import styles from './Filters.module.scss';

interface IFilters {
  types?: string[];
  selected_types: Set<string>;
  handleAddType: (type: string) => void;
}

const Filters: React.FC<IFilters> = ({ types, selected_types, handleAddType }) => {
  const [toggle, setToggle] = React.useState(false);
  const ref = React.useRef(null);

  useOnClickOutside(ref, () => setToggle(false));

  return (
    <div className={styles.filters} ref={ref}>
      <button type="button" onClick={() => setToggle(!toggle)}>
        Type of pokemon
      </button>
      {toggle && (
        <div className={styles.filters_dropdown}>
          {types?.map((type) => (
            <div
              role="menuitemradio"
              aria-checked={selected_types.has(type)}
              tabIndex={0}
              key={type}
              onClick={() => handleAddType(type)}
              onKeyPress={() => handleAddType(type)}>
              <input tabIndex={-1} id="checkbox" readOnly type="checkbox" checked={selected_types.has(type)} />
              {type}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filters;
