import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/slices/basketSlice';

export const PizzaListItem = ({ id, title, price, imageUrl, sizes, types }) => {

  const [sizeIndex, setSizeIndex] = React.useState(0);
  const [typeIndex, setTypeIndex] = React.useState(0);
  const typeNames = ['тонкое', 'традиционное'];

  const dispatch = useDispatch();
  const basketId = `${id}-${typeNames[typeIndex]}-${sizes[sizeIndex]}`
  const clickAdd = () => dispatch(addItem({
    id: id,
    basketId,
    title,
    price,
    imageUrl,
    type: typeNames[typeIndex],
    size: sizes[sizeIndex]
  }));

  const addedItems = useSelector((state) => state.basket.items.filter(el => el.id === id));
  let count = false;
  
  if(addedItems) {
    count = addedItems.reduce((sum, obj) => sum+= obj.count ,0);
  }
  
  return (
    <div className="pizza-block">
      <img
        className="pizza-block__image"
        src={imageUrl}
        alt="Pizza"
      />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {
            types.map((el, index) => <li key={index} onClick={() => setTypeIndex(index)} className={typeIndex === index ? 'active' : ''}>{typeNames[el]}</li>)
          }
        </ul>
        <ul>
          {sizes.map((el, index) => <li key={index} onClick={() => setSizeIndex(index)} className={sizeIndex === index ? 'active' : ''}>{el} см.</li>)}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <div onClick={clickAdd} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"></path>
          </svg>
          <span>Добавить</span>
          {
            count > 0 && <i> {count}</i>
          }
        </div>
      </div>
    </div>
  );
};
