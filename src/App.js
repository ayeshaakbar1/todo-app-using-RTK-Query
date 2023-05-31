import { Route, Routes } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AddTodo from "./components/AddTodo";
import DeleteTodo from "./components/DeleteTodo";
import { useGetTodosApiQuery } from "./RTK/api/todoApi";
import { setTodo } from "./RTK/Slices/todoSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App() {
  const { data, isSuccess: getIsSuccess } = useGetTodosApiQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (getIsSuccess) {
      dispatch(setTodo(data.todos));
    }
  }, [getIsSuccess, dispatch]);
  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#096192", alignItems: "center" }}
      >
        <Toolbar disableGutters>
          <AutoStoriesIcon sx={{ width: 50, height: 40, padding: "12px" }} />
          <Typography
            variant="h4"
            noWrap
            component="a"
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              // fontSize: 20
            }}
          >
            Todo App
          </Typography>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route exact path="/" element={<DeleteTodo />} />
        <Route path="/add-user" element={<AddTodo />} />
      </Routes>
    </>
  );
}

export default App;
