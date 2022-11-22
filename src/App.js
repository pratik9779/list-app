import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState("")
  const [editData, setEditData] = useState(null)

  const fetchData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    const data = await response.json();
    console.log(data)
    setItems(data);
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleChange = (e) => {
    setNewItem(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editData) {
      const allItems = items.slice();
      allItems[editData - 1].title = newItem
      setItems(allItems)
      setEditData(null)
      setNewItem("")
      return;
    }
    const modifiedItem = {
      id: items.length + 1,
      title: newItem
    }
    setItems((prevState) => {
      return [
        modifiedItem,
        ...prevState
      ]
    })
    setNewItem("")
  }

  const deleteItem = (id) => {
    const newItems = items.filter((item) => item.id !== id)
    setItems(newItems)
  }

  const editItem = (item) => {
    setEditData(item.id)
    setNewItem(item.title)
  }

  return (
    <div className="App">
      <div>
        <form action="#" onSubmit={handleSubmit}>
          <input type="text" placeholder="enter new item" name="title" value={newItem} onChange={handleChange} />
          <button type="submit">Enter</button>
        </form>
      </div>
      {items.map(item => {
        return (
          <div key={item.id}>
            {item.title}

            <button onClick={() => editItem(item)}>Edit</button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </div>
        )
      })}
    </div>
  );
}

export default App;
