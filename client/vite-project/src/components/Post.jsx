import { useContext } from "react";
import { TodoContext } from "../contexts/Todo";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo } from "../actions/todo";

const List = () => {
  
  const dispatch = useDispatch();
  const handleDelete = (id) => dispatch(deleteTodo(todos, id));
  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li onClick={() => handleDelete(todo.id)} key={todo.id}>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;