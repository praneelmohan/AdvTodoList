import './task.css';

function Task ({ assignedtask, handleDelete, handleMarked, completed}) {
    
  return (

    <div>
        <div className="taskpage">
            <p className={`taskbar ${completed ? 'completed' : ''}`}>{assignedtask}</p>

            <button className="deletebutton" onClick={handleMarked}>✔️</button>
            <button className="deletebutton" onClick={handleDelete}>🗑️</button>
        </div>

    </div>
  );
}

export default Task;