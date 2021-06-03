import { createStoreon } from 'storeon';
import { storeonDevtools } from 'storeon/devtools';
import { pokedex } from './pokedex';

export const store = createStoreon([pokedex, process.env.NODE_ENV !== 'production' && storeonDevtools]);
