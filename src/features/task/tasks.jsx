import React, { useEffect, useState } from "react";
import { Text, Box, Button } from "rebass";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Task from "./task";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);
  
  
  const fetchTasks = async () => {
    setLoading(true);
    await axios
      .get("http://localhost:3000/tasks")
      .then((response) => {
        console.log(response);
        setTasks(response.data.reverse());
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
      
  };
  
  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:3000/tasks/${id}`)
      .then((response) => {
        console.log("delete response", response);
        fetchTasks();
      })
      .catch((err) => console.error(err));
  };

  const manageTask = (mode, editData) => {
    const data = mode === "edit" ? editData : null;
    navigate("/manageTasks", {
      state: {
        mode,
        data,
      },
    });
  };

  return (
    <Box
      sx={{
        maxWidth: 512,
        mx: "auto",
      }}
    >
      <Text
        fontSize={[3, 4, 5]}
        fontWeight="bold"
        color="primary"
        textAlign="center"
      >
        Tasks
      </Text>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button variant="outline" onClick={() => manageTask("create")}>
          CREATE TASK
        </Button>
      </div>
      {loading && (
        <Text fontSize={25} textAlign="center">
          Getting Tasks...
        </Text>
      )}
      {!loading && tasks.length === 0 && (
        <Text fontSize={25} textAlign="center">
          No Tasks!
        </Text>
      )}
      {!loading &&
        tasks.length > 0 &&
        tasks
          .map((task) => (
            <Task
              key={task.id}
              data={task}
              manage={manageTask}
              remove={handleDelete}
            />
          ))}
    </Box>
  );
};

export default Tasks;
