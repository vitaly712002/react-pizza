import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setActiveCategory, setCurrentPage } from '../redux/slices/filterSlice.js';

export const Categories = ({ categories }) => {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);

  const clickCategory = (index) => {
    dispatch(setActiveCategory(index));
    dispatch(setCurrentPage(1));
  }

  return (
    <div className="categories">
        <ul>
          {
            categories.map((el, index) => (
              <li key={index} onClick={() => clickCategory(index)} className={categoryId === index ? 'active' : ''}>
                {el}
              </li>
            ))
          }
        </ul>
  </div>
  )
}
