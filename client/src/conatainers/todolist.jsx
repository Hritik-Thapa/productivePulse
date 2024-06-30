import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Todolist = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [toDisplay, setToDisplay] = useState(true);

  const [todoList, setTodoList] = useState([]);
  const [listError, setListError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [taskData, setTaskData] = useState({});

  useEffect(() => {
    console.log("useEffect from todolist");
    if (location.pathname === "/signin" || location.pathname === "/signup") {
      handleDisplayChange(false);
    } else {
      handleDisplayChange(true);
    }
  }, [location.pathname]);

  const handleDisplayChange = (value) => {
    setToDisplay(value);
  };

  useEffect(() => {
    console.log("fetch todolist triggered");
    fetchTodoList();
  }, []);

  const fetchTodoList = async () => {
    if (!currentUser) return setTodoList([]);
    const res = await fetch(`/api/todolist/getList/${currentUser._id}`);
    res
      .json()
      .then((response) => {
        if (response.success === "false") {
          setListError(true);
        }
        if (response.ok) {
          setTodoList(response.data);
          setListError(false);
        }
      })
      .catch((err) => {
        setListError(true);
      });
  };

  if (!toDisplay) return null;

  return (
    <div className="border rounded-lg border-2 w-4/5 m-7 relative flex flex-col items-center">
      <h1 className="p-3 text-center text-white text-3xl font-semibold title border w-full">
        ToDo List
      </h1>
      {todoList && todoList.length > 0 && (
        <div>
          {todoList.map((task) => {
            <div>
              <h1>{task.task}</h1>
            </div>;
          })}
        </div>
      )}
      {!todoList ||
        (!isAdding && todoList.length < 1 && (
          <p className="text-center text-white text-lg p-3">
            {currentUser
              ? "No tasks yet. Add one to get started."
              : "Please login to add tasks"}
          </p>
        ))}
      {isAdding && (
        <form className="flex justify-around p-3 gap-3 todoList-add w-full items-center">
          <input
            type="text"
            className=" rounded-lg border-2 w-4/5 p-2"
            placeholder="Title"
            onChange={(e) => {
              setTaskData({ ...taskData, [e.target.id]: e.target.value });
            }}
          />
          <button
            className="rounded-lg border-2  py-2 px-4 text-white"
            type="submit"
          >
            Add
          </button>
          {/* <div className="flex items-center gap-3">
            <label className="text-white title text-lg">Completion Date</label>
            <input type="date" className="p-2 rounded-lg w-1/4" />
          </div> */}
        </form>
      )}
      <button
        className="rounded-full text-background  bg-white cursor-pointer text-2xl text-center flex items-center justify-center absolute bottom-2 right-2"
        onClick={() => {
          setIsAdding(true);
        }}
      >
        {isAdding ? "" : <span className=" h-10 w-10">+</span>}
      </button>

      {/* {listError && (
        <p className="text-red-700 text-center">Error fetching todo list</p>
      )} */}
    </div>
  );
};

export default Todolist;
