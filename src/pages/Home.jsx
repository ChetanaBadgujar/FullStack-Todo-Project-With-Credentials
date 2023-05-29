import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context, serverUrl } from "../main";
import { toast } from "react-hot-toast";
import TodoItem from "../Components/TodoItem";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh,setRefresh] = useState(false)

  const { isAuthenticated } = useContext(Context);

  const updateHandler = async (id) => {
    try {
      const {data} = await axios.put(`${serverUrl}/task/${id}`,{},{
        withCredentials:true
      })
      toast.success(data.message)
      setRefresh(prev=>!prev)
    } catch (error) {
      toast.error(error.response.data.message)
    }
    
  };

  const deleteHandler = async (id) => {
    try {
      const {data} = await axios.delete(`${serverUrl}/task/${id}`,{
        withCredentials:true
      })
      toast.success(data.message)
      setRefresh(prev=>!prev)
    } catch (error) {
      toast.error(error.response.data.message)
    }

  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${serverUrl}/task/new`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      ); //for backend connection

      toast.success(data.message);
      setTitle("");
      setDescription("");
      setLoading(false);
      setRefresh(prev=>!prev)
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${serverUrl}/task/gettask`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, [refresh]);

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <>
      <div className="container">
        <div className="login">
          <section>
            <form action="" onSubmit={submitHandler}>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Title"
                required
              />
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="Description"
                required
              />

              <button disabled={loading} type="submit">
                Add Task
              </button>
            </form>
          </section>
        </div>
        <section className="todosContainer">
          {tasks.map((e) => (
            <TodoItem
              key={e._id}
              title={e.title}
              isCompleted={e.isCompleted}
              description={e.description}
              updateHandler={updateHandler}
              deleteHandler = {deleteHandler}
              id = {e._id}
            />
          ))}
        </section>
      </div>
    </>
  );
};

export default Home;
