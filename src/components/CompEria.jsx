import styled from "@emotion/styled";
import { Button } from "@mui/material";
export const CompEria = ({ compTodo, onClickBackImcomp }) => {
  const SCompEriaTodo = styled.div`
    width: 400px;
    border: 1px solid #333;
    border-radius: 5px;
    padding: 20px 20px 0;
  `;
  return (
    <SCompEriaTodo>
      <p style={{ margin: "0" }}>完了エリア</p>
      <ul>
        {compTodo.map((todo) => (
          <li style={{ marginBottom: "10px" }} key={todo.id}>
            {todo.text}
            <Button
              color="success"
              variant="contained"
              sx={{ ml: 4 }}
              onClick={() => {
                onClickBackImcomp(todo.id);
              }}
            >
              未完了
            </Button>
          </li>
        ))}
      </ul>
    </SCompEriaTodo>
  );
};
