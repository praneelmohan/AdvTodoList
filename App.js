import './App.css';
import { useState, useEffect, useRef } from 'react';
import Task from './Components/task';
import { firestore } from './firebase';
import { collection, deleteDoc, doc, getDocs, updateDoc, query, where, setDoc } from 'firebase/firestore';
import Home from './Components/home';

const tasksCollectionRef = collection(firestore, "Task");

function App() {
  const [user, setUser] = useState(null);
  const [taskValue, setTaskValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const taskRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(query(collection(firestore, "Task"), where("userId", "==", user.uid)));
        const taskList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTasks(taskList);
      } catch (error) {
        console.error("Error fetching tasks: ", error);
      }
    }

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleChange = (e) => {
    setTaskValue(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedValue = taskValue.trim();
    if (trimmedValue === "") {
      alert('Add a Task');
      return;
    }

    try {
      const userId = user.uid;
      const newTask = { name: trimmedValue, completed: false, userId: userId };
      const dateTime = 9007199254740991 - Date.now();
      const docRef = doc(firestore, "Task", dateTime.toString());
      await setDoc(docRef, newTask);
      setTasks(prevTasks => [{ id: docRef.id, ...newTask }, ...prevTasks]);
      setTaskValue(""); 
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  }

  const handleMarked = async (taskId) => {
    try {
      const taskIndex = tasks.findIndex(task => task.id === taskId);
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], completed: !updatedTasks[taskIndex].completed };
      setTasks(updatedTasks);
      await updateDoc(doc(tasksCollectionRef, taskId), { completed: updatedTasks[taskIndex].completed });
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  }

  const handleDelete = async (taskId) => {
    try {
      await deleteDoc(doc(tasksCollectionRef, taskId));
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  }

  return (
    <Home setUser={setUser} user={user}>
      <div>
        <p className="heading">To-Do List</p>
        <form className="formstyle" onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter task" className="inputstyle" onChange={handleChange} value={taskValue} ref={taskRef} />
          <button className="addbutton" type="submit">Add</button>
        </form>
        {tasks.map((task) => (
          <Task key={task.id} assignedtask={task.name} 
                handleMarked={() => handleMarked(task.id)} 
                handleDelete={() => handleDelete(task.id)} 
                completed={task.completed} />
        ))}
      </div>
    </Home>
  );
}

export default App;