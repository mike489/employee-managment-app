import React, { useEffect, useState } from "react";
import { Label, Input, Select, Textarea, Radio, Checkbox } from "@rebass/forms";
import { Text, Box, Flex, Card, Button } from "rebass";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Tasks from "./tasks";

const ManageTasks = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    id: "",
    taskName: "",
    tasksName: "",
    deadlineDate: "",
  });

  const { taskName, tasksName, deadlineDate } = form;

  console.log(location.state);

  useEffect(() => {
    if (location.state.mode === "edit") {
      const { id, taskName, tasksName, deadlineDate } = location.state.data;
      setForm({ ...form, id, taskName, tasksName, deadlineDate });
    }
  }, [location.state]);

  const handleEdit = async (data) => {
    await axios
      .put(`http://localhost:3000/tasks/${data.id}`, data)
      .then((response) => {
        console.log("delete response", response);
        navigate(-1);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleCreate = async (data) => {
    await axios
      .post(`http://localhost:3000/tasks`, data)
      .then((response) => {
        console.log("delete response", response);
        navigate(-1);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const onChange = (event) => {
    console.log(event);
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (location.state.mode === "edit") {
      handleEdit(form);
    } else {
      const { id, ...rest } = form;
      handleCreate(rest);
    }
    console.log(form);
  };

  return (
    <Card
      as={"form"}
      onSubmit={onSubmit}
      sx={{
        p: 1,
        borderRadius: 2,
        boxShadow: "0 0 16px rgba(0, 0, 0, .25)",
        margin: 3,
        padding: 4,
        maxWidth: 512,
        mx: "auto",
        px: 3,
      }}
    >
      <Text fontSize={30}>{`${
        location.state.mode === "edit" ? "Manage" : "CREATE"
      } Task`}</Text>
      <Flex flexDirection="column" mx={-2} mb={3}>
        <Box width={1} px={2} my={3}>
          <Label htmlFor="taskName">Task Name</Label>
          <Input
            id="taskName"
            name="taskName"
            placeholder="Task Name"
            value={taskName}
            type="text"
            onChange={onChange}
            required={true}
          />
        </Box>

        <Box width={1} px={2} my={3}>
          <Label htmlFor="tasksName">Tasks Name</Label>
          <Input
            id="tasksName"
            name="tasksName"
            placeholder="Tasks Name"
            onChange={onChange}
            value={tasksName}
            type="text"
            required={true}
          />
        </Box>

        <Box width={1} px={2} my={4}>
          <Label htmlFor="deadlineDate">Deadline Date</Label>
          <Input
            id="deadlineDate"
            name="deadlineDate"
            onChange={onChange}
            value={deadlineDate}
            required={true}
            type="date"
          />
        </Box>
        <Button width={1} type="submit" variant="primary" mb={3}>
          {loading ? "..." : "SUBMIT"}
        </Button>
        <Button
          onClick={() => navigate(-1)}
          width={1}
          type="submit"
          variant="outline"
        >
          CANCEL
        </Button>
      </Flex>
    </Card>
  );
};

export default ManageTasks;
