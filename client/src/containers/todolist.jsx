import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Popup from "reactjs-popup";


const Todolist = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [toDisplay, setToDisplay] = useState(true);

  const [todoList, setTodoList] = useState([]);
  const [listError, setListError] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing]=useState("");

  const date=new Date();
  const isoDate=date.toISOString().substring(0,10);
  console.log(isoDate)

  const [newTaskData, setNewTaskData] = useState({
    title: "",
    completed:false,
    createdAt:isoDate,
    deadline:isoDate,
    estimatedTime:-1,
    timeSpent:0,
    repeat:"NONE"
  });

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

  // Add Listing

  const handleAddTodo=async ()=>{
    console.log("Add")
    setIsAdding(false);
    const res= await fetch('/api/todolist/addListing',{
      method:'POST',
      body:JSON.stringify(newTaskData),
      headers: { "Content-Type": "application/json" },
    })
    try{
      const data=await res.json();
      if(data.success===false)
        setListError(data.messsage);
      else
        fetchTodoList();

    }catch(err){
      setListError("Error Adding Todo");
    }
  }

  //Delete todo

  const handleDelete= async (id)=>{
    console.log(id)
    const res=await fetch(`/api/todoList/delete/${id}`,{
      method:"DELETE"
    })
    res.json().then(response=>{
      if(response.errorCode==="C444")
        setListError(response.messsage)
      else if(response.success===false)
        setListError("Couldn't Delete Message");
      else{
        fetchTodoList();
        setListError("");
      }
    }).catch(err=>{
      setListError("Error Deleting Todo");
    })
  }

  //Edit Todo

  const handleEdit=async(id)=>{
    const res=await fetch(`/api/todoList/edit/${id}`,
      {
        method:'PUT',
        data:JSON.stringify(newTaskData),
        headers: { "Content-Type": "application/json" },
      }
    )
    res.json().then(response=>{
      if(response.success===false)
        setListError("Error Editing Todo");
      else if(response.success===false)
        setListError("Couldn't Delete Message");
      else{
        fetchTodoList();
        setListError("");
    }})
  }

  // fetchList

  const fetchTodoList = async () => {
    if (!currentUser) return setTodoList([]);
    const res = await fetch(`/api/todolist/getList/${currentUser._id}`);
    res
      .json()
      .then((response) => {
        if (response.success === "false") {
          setListError("Error fetching todolist");
          return
        }
        console.log(response)
          console.log('response ok')
          setTodoList(response.list);
          setListError("");
          console.log(todoList)
          return
      })
      .catch((err) => {
        console.log(err)

        setListError("Error fetching todolist");
      });
  };

  // Form to add or edit todo

  const AddForm=(task)=>{
    const todo=task?.task;
    console.log(task)
    return(<form className="flex flex-col justify-around p-3 gap-3 todoList-add w-full items-center">
      <input
        type="text"
        id="title"
        className=" rounded-lg border-2 w-4/5 p-2 focus:outline-none "
        placeholder="Title"
        defaultValue={todo.task||""}
        required
        onChange={(e) => {
          setNewTaskData({ ...newTaskData, [e.target.id]: e.target.value });
        }}
      />
      <label className="text-white text-xl "
        
      >Deadline</label>
      <input type="date" className=" rounded-lg border-2 w-4/5 p-2 focus:outline-none " 
      id="deadline"
      min={isoDate}
      defaultValue={todo.deadline||isoDate}
      onChange={(e)=>{
        setNewTaskData({ ...newTaskData, [e.target.id]: e.target.value });
      }}/>

      <label className="text-white text-xl ">Estimated hours to finish </label>
      <input type="number" placeholder="Leave this empty if you dont have estimation" className=" rounded-lg border-2 w-4/5 p-2  focus:outline-none"
      id="estimatedTime"
      defaultValue={todo.estimatedTime||null}
      onChange={(e)=>{
        setNewTaskData({ ...newTaskData, [e.target.id]: e.target.value });
      }} /> 

      <label className="text-white text-xl focus:outline-none ">Repetion</label>
      <select className=" rounded-lg border-2 w-4/5 p-2 focus:outline-none "
      id="repeat"
      defaultValue={todo.repeat||""}
      onChange={(e)=>{
        setNewTaskData({ ...newTaskData, [e.target.id]: e.target.value });
        console.log(newTaskData)
      }}>
        <option value={"NONE"}>None</option>
        <option value={"DAILY"}>Daily</option>
        <option value={"WEEKLY"}>Weekly</option>
        <option value={"MONTHLY"}>Monthly</option>
      </select>
      <button
        className="rounded-lg border-2  py-2 px-4 text-white focus:outline-none hover:bg-background"
        type="button"
        onClick={task?()=>handleEdit(todo._id):handleAddTodo}
      >
        {task?"Edit":"Add"}
      </button>
    </form>)
  }

  if (!toDisplay) return null;


  const RemainingDays=(date)=>{
    if(date<isoDate)
      return (<p className="text-red-700">{date}</p>)
    else if(date=isoDate)
      return (<p className="text-red-500">0 Days Remaining</p>)
    else{
      if(date.substring(0,4)!==isoDate.substring(0,4))
        return (<p className="text-green-600">{date}</p>)
      if(date.substring(6,2)!==isoDate.substring(0,7))
        return (<p className="text-green-600">{date}</p>)
      const days=Number(date.substring(9,2))-Number(isoDate.substring(9,2))
      if( days<7){
        return (<p className="text-yellow-600">{days} Days Remaining</p>)
      }
      else if(days<3){
        return (<p className="text-orange-600">{days} Days Remaining</p>)
      }
    }
  }

  return (
    <div className="rounded-lg border-2 w-4/5 m-7 relative flex flex-col items-center">
      <h1 className="p-3 text-center text-white text-3xl font-semibold title border w-full">
        ToDo List
      </h1>

      {/* List */}

      {todoList && todoList.length > 0 && (
        <div className="w-[100%]">
          {/* <p>{todoList.length}</p> */}
          {todoList.map((todo) => {
            console.log(todo)
            return (
            <div className="flex w-[80%] flex-row m-2 p-2 items-center  justify-around bg-customPink rounded-lg">
              {isEditing===todo._id?<AddForm task={todo}/>:
              <h1 className="text-white text-xl  w-[400px]">{todo.task}</h1>
              }
              <div  className="flex gap-4  w-[200px] justify-end">

              {todo.repeat==="NONE"?<RemainingDays/>:""}

              <input type="checkbox" value={todo.completed}/>
              
              <Popup trigger={open=(
                <div className=" relative h-[20px] w-[5px] m-0  cursor-pointer p-1">
                  <div className="absolute top-[10%] left-[50%] h-[3px] w-[3px] bg-white rounded-full"></div>
                  <div className="absolute top-[50%] left-[50%] h-[3px] w-[3px] bg-white rounded-full"></div>
                  <div className="absolute top-[90%] left-[50%] h-[3px] w-[3px] bg-white rounded-full"></div>
                </div>

            )}
              position={"bottom center"}
              closeOnDocumentClick
            >
              <ul className="bg-background p-2">
                <li className="hover:bg-customPink cursor-pointer text-white p-1 rounded-md text-center" onClick={()=>handleDelete(todo._id)}>Delete</li>
                <li className="hover:bg-customPink cursor-pointer text-white p-1 rounded-md text-center" onClick={()=>setIsEditing(`${todo._id}`)}>Edit</li>
              </ul>
              </Popup>
              </div>
            </div>)
          })}
        </div>
      )}

      {/* if not list */}

      {!todoList ||
        (!isAdding && todoList.length < 1 && (
          <p className="text-center text-white text-lg p-3">
            {console.log(currentUser)}
            {currentUser
              ? "No tasks yet. Add one to get started."
              : "Please login to add tasks"}
          </p>
        ))}

        {/* Add form */}

      {isAdding && (<AddForm/>)}

      {/* Add '+' button */}

      <button
        className="rounded-full text-background  bg-white cursor-pointer text-2xl text-center flex items-center justify-center absolute bottom-2 right-2"
        id="addButton"
        onClick={() => {
          setIsAdding(true);
        }}
      >
        {isAdding ? "" : <span className=" h-10 w-10">+</span>}
      </button>

      {/* errors */}

         {listError && (
        <p className="text-red-700 text-center">{listError}</p>
      )} 
    </div>
  );
};

export default Todolist;
