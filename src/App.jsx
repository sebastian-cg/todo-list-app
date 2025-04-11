import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: task, done: false }]);
      setTask("");
    }
  };

  const toggleDone = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <>
      <section className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
        <div className="w-full h-96 max-w-md">
          <h1 className="font-primary text-4xl text-center">
            What's your plan for today?
          </h1>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <input
              className="flex-1 border border-gray-400 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              type="text"
              placeholder="Enter your task..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTask();
                }
              }}
            />
            <button
              onClick={addTask}
              className="bg-gray-500 text-white py-2 px-10 rounded-lg hover:bg-gray-700 cursor-pointer"
            >
              Add
            </button>
          </div>

          {tasks.length > 0 ? (
            <ul className="mt-10 overflow-y-scroll max-h-96">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="border border-gray-400 py-2 px-4 rounded-lg mb-2 flex items-center justify-between"
                >
                  <span className={task.done ? "line-through" : ""}>
                    {task.text}
                  </span>
                  <div className="flex items-center gap-3 cursor-pointer">
                    <FaCheck
                      className="text-green-500 text-xl hover:scale-110 transition-transform"
                      onClick={() => toggleDone(task.id)}
                    />
                    <MdDelete
                      className="text-red-500 text-xl hover:scale-110 transition-transform"
                      onClick={() =>
                        setTasks(tasks.filter((t) => t.id !== task.id))
                      }
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className=" text-2xl text-center text-gray-500 font-primary mt-10">
              No tasks yet...
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default App;
