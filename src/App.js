import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [store, setStore] = React.useState([]);

  const addTask = ({text}) => {
    const newStore = [...store, {text}]
    setStore(newStore);
  };

  return (
    <div className="app">
      <header>ToDo List</header>
        <FormComponent 
        addTask={addTask} 
        store={store} 
        setStore={setStore} />
        <div className="todo-list">
            {store.map((task, index) => (
            <TaskComponent
              setStore={setStore}
              store={store}
              key={index}
              text={task.text}
              index={index}
              task={task}
            />
            ))}

        </div>
    </div> 
  );
}

function FormComponent({addTask, store, setStore}) {
  const [inputText, setInputText] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    
    addTask(inputText);

    setStore([
      ...store,
      {text: inputText,
      isDone: false,}
    ]);

    setInputText("");
  };

  const handleChange = e => {
    setInputText(e.target.value);
  };


  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
       className="todo-input" 
        type="text"
        placeholder="Add a todo"
        value={inputText}
        onChange={handleChange}
      />
      <button 
      className="submit-btn"
      onClick={handleSubmit}>
        <FontAwesomeIcon icon={faPlusSquare} />
      </button>
    </form>
  )
};

function TaskComponent({text, task, store, setStore}) {

  const toggleTask = () => {
    setStore(store.map((task) => {
      return {
        ...task,
        isDone: !task.isDone,
      }
    }));
  };
 
  const deleteTask = (index) => {
    const newStore = [...store];
    newStore.splice(index,1);
    setStore(newStore);

  };

  return (
    <div className="todo">
      <li
      className="todo-item"
      // style={{ textDecoration: task.isDone ? "line-through" : "" }}
      >{text}
      </li>
      <button
      className="complete-btn"
      onClick={toggleTask}>
      <FontAwesomeIcon icon={faCheck} />
      </button>
      <button
      className="trash-btn"
      onClick={deleteTask}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};

export default App;
