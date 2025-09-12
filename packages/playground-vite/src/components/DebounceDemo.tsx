import { useDebounce } from 'hakenbox';
import { useEffect, useState } from 'react';

function SearchBox() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) console.log('Fetching results for:', debouncedQuery);
  }, [debouncedQuery]);

  return (
    <>
      <label>
        Search:
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          placeholder='Type to search...'
        />
      </label>
      <p>Immediate value: {query}</p>
      <p>Debounced value: {debouncedQuery}</p>
    </>
  );
}

export default SearchBox;
