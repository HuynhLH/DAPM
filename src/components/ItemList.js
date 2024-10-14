import React, { useEffect, useState } from 'react';

function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Gọi API để lấy danh sách items từ backend
    fetch('http://localhost:5000/items')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="ItemList">
      <h1>Danh sách Items</h1>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.name}: {item.price} VND
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
