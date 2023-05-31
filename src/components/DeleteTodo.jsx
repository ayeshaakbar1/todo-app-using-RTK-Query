import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Paper,
  Box,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@mui/material";
import { deleteTodo } from "../RTK/Slices/todoSlice";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import { useDeleteTodoApiMutation } from "../RTK/api/todoApi";

const DeleteTodo = () => {
  const [deleteTodoApi, { isSuccess: deleteIsSuccess, data: dataResponse }] =
    useDeleteTodoApiMutation();
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.todo.todos);

  const handleRemoveTodo = (id) => {
    deleteTodoApi(id);
  };

  useEffect(() => {
    if (deleteIsSuccess) {
      dispatch(deleteTodo({ id: dataResponse.id }));
    }
  }, [deleteIsSuccess]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100vh",
        pt: 11,
        pb: 16,
      }}
    >
      <Link to="/add-user">
        <Button
          sx={{
            backgroundColor: "#096192",
            fontWeight: 600,
            fontSize: 17,
            mb: 2,
          }}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add Todo
        </Button>
      </Link>

      <TableContainer component={Paper} sx={{ width: 999 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Task</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todo.length ? (
              <>
                {todo.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>{t.id}</TableCell>
                    <TableCell>{t.todo}</TableCell>
                    <TableCell>
                      {t.completed ? "completed" : "pending"}
                    </TableCell>
                    <Tooltip title="Delete">
                      <TableCell>
                        <Button onClick={() => handleRemoveTodo(t.id)}>
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </Tooltip>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <h3>No Todo</h3>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DeleteTodo;
