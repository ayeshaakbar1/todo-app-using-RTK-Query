import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Paper, TextField } from "@mui/material";
import { addTodo } from "../RTK/Slices/todoSlice";
import { useAddTodoApiMutation } from "../RTK/api/todoApi";

const AddTodo = () => {
  const [addTodoApi, { isSuccess, data }] = useAddTodoApiMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    todo: "",
    completed: "",
  });

  const handleAddTodo = () => {
    addTodoApi({
      userId: 1,
      todo: values.todo,
      completed: values.completed,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(addTodo(data));
      setValues({ todo: "", completed: "" });
      navigate("/");
    }
  }, [isSuccess, dispatch, navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper sx={{ width: 500, p: 9, mb: "170px", borderRadius: "17px" }}>
        <br />
        <TextField
          label="Task"
          id="standard-multiline-static"
          multiline
          rows={3}
          type="text"
          value={values.todo}
          onChange={(e) => setValues({ ...values, todo: e.target.value })}
          placeholder="What's on your mind?"
          fullWidth
          margin="normal"
          variant="standard"
        />
        <Button
          variant="contained"
          onClick={handleAddTodo}
          fullWidth
          sx={{
            mt: 3,
            fontWeight: 700,
            backgroundColor: "#096192",
            width: "280px",
            margin: "8px 100px",
          }}
        >
          Submit
        </Button>
      </Paper>
    </Box>
  );
};

export default AddTodo;
