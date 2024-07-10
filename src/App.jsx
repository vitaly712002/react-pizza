import { Header } from './components/Header';
import React from 'react'
import './scss/app.scss';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import {Routes, Route} from 'react-router-dom';
import { Basket } from './pages/Basket';
const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];
const sortItems = [
  {
    name: 'популярности',
    sortProperty: 'rating',
  },
  {
    name: 'цене',
    sortProperty: 'price',
  },
  {
    name: 'алфавиту',
    sortProperty: 'title',
  },
];

function App() {
  return (
    <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
                  <Route path="/" element={<Home categories={categories} sortItems={sortItems}/>}></Route>
                  <Route path="/basket" element={<Basket />}></Route>
                  <Route path="*" element={<NotFound/>}></Route>
            </Routes>
          </div>
        </div>
     
    </div>
  );
}

export default App;

