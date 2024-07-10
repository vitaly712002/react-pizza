import React from 'react';
import styles from './Search.module.scss';
import debounce from 'lodash.debounce';
import { setSearchValue } from '../../redux/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';

export const Search = () => {
  const dispatch = useDispatch();
  
  const searchValue = useSelector((state) => state.filter.searchValue);

  React.useEffect(() => {
    if(searchValue) {
      setValue(searchValue);
    }
  }, [searchValue]);

  const inputRef = React.useRef(null);
  const [value, setValue] = React.useState(searchValue);
  
  const onClickClearnBtn = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current.focus();
  };

  const debouncedSearch = React.useMemo(
    () => debounce((str) =>  dispatch(setSearchValue(str)), 500),
    [dispatch],
  );

  const updateSearchValue = React.useCallback(
    (str) => debouncedSearch(str),
    [debouncedSearch],
  );

  const changeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <label className={styles['search']} htmlFor="search-field">
      <svg
        className={styles['search-icon']}
        enableBackground="new 0 0 32 32"
        id="EditableLine"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="14"
          cy="14"
          fill="none"
          id="XMLID_42_"
          r="9"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"></circle>
        <line
          fill="none"
          id="XMLID_44_"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="27"
          x2="20.366"
          y1="27"
          y2="20.366"></line>
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={changeInput}
        className={styles['search-field']}
        id="search-field"
        type="text"
        placeholder="Поиск пиццы.."
      />
      {value && (
        <svg
          onClick={onClickClearnBtn}
          className={styles['search-clear']}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"></path>
        </svg>
      )}
    </label>
  );
};
