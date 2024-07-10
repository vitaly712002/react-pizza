import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Categories } from '../components/Categories';
import { Pagination } from '../components/Pagination';
import { PizzaListItem } from '../components/PizzaListItem';
import { PizzaListItemSceleton } from '../components/PizzaListItem/PizzaListItemSceleton';
import { Sort } from '../components/Sort';
import {
  setFilter,
} from '../redux/slices/filterSlice';

import { useSearchParams } from 'react-router-dom';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

export const Home = ({categories, sortItems}) => {
  const dispatch = useDispatch();
  const { categoryId, activeSort, currentPage, searchValue } = useSelector(
    (state) => state.filter,
  );
  const { status, pizzas } = useSelector(
    (state) => state.pizza,
  );
  let isMounted = React.useRef(false);
  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    if (isMounted.current) {
      dispatch(fetchPizzas({
        sortBy: activeSort.sortProperty,
        order: 'desc',
        page: currentPage,
        limit: 8,
        ...(categoryId > 0 ? { categoryId } : {}),
        ...(searchValue ? { searchValue } : {}),
      }));
      setSearchParams({
        sortBy: activeSort.sortProperty,
        order: 'desc',
        currentPage: currentPage,
        ...(categoryId > 0 ? { categoryId } : {}),
        ...(searchValue ? { searchValue } : {}),
      });
    } else {
      if (window.location.search) {
        const params = {};
        searchParams.forEach((value, key) => {
          if (key === 'sortBy') {
            const sort = sortItems.find((el) => el.sortProperty === value);
            params['activeSort'] = sort;
          } else {
            params[key] = value;
          }
        });
        dispatch(setFilter(params));
      }
    }
   
    isMounted.current = true;
  }, [categoryId, activeSort, searchValue, currentPage, searchParams, sortItems, setSearchParams, dispatch]);


  const sceletons = [...new Array(8)].map((_, index) => (
    <PizzaListItemSceleton key={index} />
  ));

  let pizzasItems = pizzas.map((obj) => (
    <PizzaListItem
      key={obj.id}
      id={obj.id}
      title={obj.title}
      imageUrl={obj.imageUrl}
      price={obj.price}
      sizes={obj.sizes}
      types={obj.types}
    />
  ));
  return (
    <React.Fragment>
      <div className="content__top">
        <Categories categories={categories} />
        <Sort sortItems={sortItems} />
      </div>
      {
        pizzasItems.length < 1 && status !== 'loading'?
        <h2 style={{marginTop: "100px", textAlign: 'center'}}>Нечего не найдено</h2>
        :
       (
        <>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {status === 'loading' ? sceletons : pizzasItems}
          </div>
          <div style={{ textAlign: 'center' }}>
            <Pagination />
          </div>
        </>
       )
      }
      
    </React.Fragment>
  );
};
