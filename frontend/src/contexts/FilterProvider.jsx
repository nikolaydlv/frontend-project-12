import filter from 'leo-profanity';
import { useCallback } from 'react';

import { FilterContext } from './index';

const FilterProvider = ({ children }) => {
  filter.add(filter.getDictionary('ru'));

  const filterProfanity = useCallback((word) => filter.clean(word), []);

  return <FilterContext.Provider value={filterProfanity}>{children}</FilterContext.Provider>;
};

export default FilterProvider;
