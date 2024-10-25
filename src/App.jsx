import { useState, useRef, useEffect, forwardRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';


const Task = forwardRef(({ task, onChange, onDelete }, ref) => {

  return (
    <li className="flex items-center mb-2">
      <input
        ref={ref}
        type="text"
        value={task}
        onChange={onChange}
        className="flex-1 p-2 mr-2 border border-gray-300 rounded"
      />

      <DeleteIcon
        onClick={onDelete}
        className="text-red-500 cursor-pointer"
      />
    </li>
  );
});

function TaskList({ tasks, onTaskChange, onDelete }) {
  const taskRef = useRef(null);

  useEffect(() => {
    if (taskRef.current) {
      taskRef.current.focus();
    }
  }, [tasks]);

  return (
    <ul className="p-0 list-none">

      {tasks.map((task, index) => (

        <Task
          key={index}
          task={task}
          ref={index === tasks.length - 1 ? taskRef : null}

          onChange={(e) => onTaskChange(index, e.target.value)}
          onDelete={() => onDelete(index)}
        />
      ))}
    </ul>
  );
}

function App() {
  const [tasks, setTasks] = useState(() => {

    const savedTasks = localStorage.getItem('tasks');

    return savedTasks ? JSON.parse(savedTasks) : [];
  });


  useEffect(() => {

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const deleteTask = (index) => {

    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const addTask = () => {

    const updatedTasks = [...tasks, ""];
    setTasks(updatedTasks);
  };

  const updateTask = (index, newValue) => {

    const updatedTasks = tasks.map((task, i) =>
      i === index ? newValue : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="max-w-xl p-6 mx-auto bg-white rounded shadow-lg">
      <h1 className="mb-4 text-2xl font-bold">Todo List</h1>

      <TaskList tasks={tasks} onTaskChange={updateTask} onDelete={deleteTask} />

      <div className="flex justify-center mt-4">
        <button onClick={addTask} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Add Task
        </button>

      </div>
    </div>
  );
}

export default App;