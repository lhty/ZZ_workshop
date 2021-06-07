import React from 'react';
import { useStoreon } from 'storeon/react';
import { useOnClickOutside } from '../../hooks';
import { IpokedexState, PokedexEvents, pokedex_state_enum } from '../../store/pokedex';

import styles from './Filters.module.scss';

interface IFilters {
  available_types?: string[];
}

const Filters: React.FC<IFilters> = ({ available_types }) => {
  const { selected_types, dispatch } = useStoreon<IpokedexState, PokedexEvents>(pokedex_state_enum.selected_types);
  const [isOpen, toggle] = React.useState(false);
  const ref = React.useRef(null);
  useOnClickOutside(ref, () => toggle(false));

  const handleAddType = (type: string) => dispatch(pokedex_state_enum.selected_types, type);

  return (
    <div className={styles.filters} ref={ref}>
      <button type="button" onClick={() => toggle(!isOpen)}>
        Type of pokemon
      </button>
      {isOpen && (
        <div className={styles.filters_dropdown}>
          {available_types?.map((type) => (
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
