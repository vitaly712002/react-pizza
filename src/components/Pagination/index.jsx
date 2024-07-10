import React from 'react'
import styles from './Pagination.module.scss';
import { setCurrentPage } from '../../redux/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';

export const Pagination = () => {
  const dispatch = useDispatch();

  const changePage = (page) => {
    dispatch(setCurrentPage(currentPage + page));
  }
  
  const {totalCountPage} = useSelector((state) => state.pizza);
  const {currentPage} = useSelector((state) => state.filter);

  return (
    <ul className={styles.root}>
        <li onClick={() => changePage(-1)} className={`${currentPage === 1 ? styles.disabled : ''} ${styles.item}`}>
            prev
        </li>
        <li className={styles.item}>
            {currentPage}
        </li>
        <li onClick={() => changePage(1)} className={`${totalCountPage <= currentPage ? styles.disabled : ''} ${styles.item}`}>
            next
        </li>
    </ul>
  )
}
