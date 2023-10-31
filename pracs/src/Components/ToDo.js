import React, { useState, useEffect } from 'react';

function ToDo() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      fetchItems();
      setIsLoading(false);
    }, 2000);
  }, []);

  const fetchItems = () => {
    const data = [''];
    setItems(data);
  };

  const handleNewItemChange = (e) => {
    setNewItem(e.target.value);
  };

  const handleAddItem = () => {
    setItems([...items, newItem]);
    setNewItem('');
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  return (
    <div className="App">
      <h1>React Hooks - ToDo App</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Add a new item"
            value={newItem}
            onChange={handleNewItemChange}
          />
          <button onClick={handleAddItem}>Add Item</button>
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                {item} <button style={{color:'red'}} onClick={() => handleDeleteItem(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ToDo;
