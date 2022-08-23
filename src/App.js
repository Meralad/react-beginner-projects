import React from 'react';
import { Collection } from './Collection';
import { useState } from 'react';
import './index.scss';
import { useEffect } from 'react';

const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
]

function App() {
  const [categoryId, setCategoryId] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : '';
    
    fetch(`https://run.mocky.io/v3/1567ad14-1fd8-4619-b332-9b845cc94480?${category}`,)
      .then(res => res.json())
      .then(json => {
        setCollections(json)
      })
      .catch(err => {
        console.log(err);
        alert('Ошибка при получении данных')
      }).finally(() => {
        setIsLoading(false)
      })
  }, [categoryId])

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj, index) =>
          (<li onClick={() => setCategoryId(index)} className={categoryId === index ? 'active' : ''} key={obj.name}>
            {obj.name}
          </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (<h2>Идет загрузка...</h2>
        ) : (
          collections
            .filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
            .map((obj, index) => (
              <Collection key={index} name={obj.name} images={obj.photos} />
            ))
        )}
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, index) => (
          <li onClick={() => setPage(index + 1)} className={page === index + 1 ? 'active' : ''}>
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
