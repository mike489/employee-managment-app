import React from "react";
import { Box, Card, Heading, Text, Button } from "rebass";
import Tasks from "./tasks";

const Task = ({ data, manage, remove }) => {
  const { id, tasksName, taskName, deadlineDate } = data;

  return (
    <Box>
      <Card
        my={4}
        sx={{
          p: 1,
          borderRadius: 2,
          boxShadow: "0 0 16px rgba(0, 0, 0, .25)",
          padding: 4,
        }}
      >
        <Heading mb={2}>{taskName}</Heading>
        <Text mb={2}>
          tasks: <b>{tasksName}</b>
        </Text>
        <Text sx={{ float: "right" }} color="grey" fontSize={12}>
          {deadlineDate}
        </Text>
        <Button
          sx={{
            borderColor: "purple",
            color: "purple",
            cursor: "pointer",
          }}
          mr={2}
          variant="outline"
          onClick={() => manage("edit", data)}
        >
          Edit
        </Button>
        <Button
          sx={{
            borderColor: "red",
            color: "red",
            cursor: "pointer",
          }}
          mr={2}
          variant="outline"
          onClick={() => remove(id)}
        >
          Delete
        </Button>
      </Card>
    </Box>
  );
};

export default Task;
