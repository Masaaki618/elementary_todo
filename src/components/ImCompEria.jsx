import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const ImCompEria = ({
  imcopleteTodo,
  onClickAddComp,
  onClickDeleteTodo,
}) => {
  const SIncompEriaTodo = styled.div`
    width: 400px;
    border: 1px solid #333;
    border-radius: 5px;
    padding: 20px 20px 0;
  `;

  return (
    <SIncompEriaTodo>
      <p style={{ margin: "0" }}>未完了のTODO</p>
      <ul>
        {imcopleteTodo.map((todo) => (
          <li style={{ marginBottom: "10px" }} key={todo.id}>
            {todo.text}
            <Button
              variant="contained"
              sx={{ ml: 4 }}
              onClick={() => {
                onClickAddComp(todo.id);
              }}
            >
              完了
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ mx: 1 }}
              onClick={() => {
                //todoのidを削除する関数に渡す
                onClickDeleteTodo(todo.id);
              }}
            >
              削除
            </Button>
          </li>
        ))}
      </ul>
    </SIncompEriaTodo>
  );
};
