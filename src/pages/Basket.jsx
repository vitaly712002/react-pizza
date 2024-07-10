import React from 'react'
import BasketItem from '../components/BasketItem.jsx'
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearBasket } from '../redux/slices/basketSlice.js';
import { BasketEmpty } from '../components/BasketEmpty.jsx';

export const Basket = () => {
  const dispatch = useDispatch();
  const {items, totalCountItems, totalPrice} = useSelector((state) => state.basket);

  const onClickClearBasket = () => {
    dispatch(clearBasket());
  }

  if(items.length < 1) {
    return <BasketEmpty/>
  }

  return (
    <div className="container container--cart">
          <div className="cart">
            <div className="cart__top">
              <h2 className="content__title"> <img src="/img/cart.svg" alt="" /> Корзина</h2>
              <div onClick={onClickClearBasket} className="cart__clear">
                <img src="/img/trash.svg" alt="trash" />
                <span>Очистить корзину</span>
              </div>
            </div>
            <div className="cart__items">
              {
                items.map((el) => <BasketItem key={el.basketId} {...el}/>)
              }
            </div>
            <div className="cart__bottom">
              <div className="cart__bottom-details">
                <span> Всего пицц: <b>{totalCountItems} шт.</b> </span>
                <span> Сумма заказа: <b>{totalPrice} ₽</b> </span>
              </div>
              <div className="cart__bottom-buttons">
                <Link to="/" className="button button--outline button--add go-back-btn">
                  <img src="/img/grey-arrow-left.svg" alt="" />
                  <span>Вернуться назад</span>
                </Link>
                <div className="button pay-btn">
                  <span>Оплатить сейчас</span>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}
