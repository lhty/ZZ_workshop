export const getPokemonData = async <T>(key: string, input?: T) => {
  if (!input) {
    return null;
  }

  const resolve = async (el: T) => {
    const response = await fetch(el[key]);
    const responseData = await response.json();
    return responseData;
  };

  const results = Array.isArray(input) ? await Promise.all(input.map(resolve)) : resolve(input);

  return results;
};
