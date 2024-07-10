import React from 'react';

export const BasketEmpty = () => {
  return (
    <div className="cart cart--empty">
        <h2>
          Корзина пустая <span>😕</span>
        </h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу.
          <br />
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img
          src="/img/empty-cart.png"
          alt="Empty cart"
        />
        <a className="button button--black" href="/">
          <span>Вернуться назад</span>
        </a>
      </div>
  );
};
