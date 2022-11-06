import styled from "@emotion/styled";
import { Container, TextField, Box, Button } from "@mui/material";

export const App = () => {
  const SIncompEriaTodo = styled.div`
    width: 400px;
    border: 1px solid #333;
    border-radius: 5px;
    padding: 20px 20px 0;
  `;

  const SCompEriaTodo = styled.div`
    width: 400px;
    border: 1px solid #333;
    border-radius: 5px;
    padding: 20px 20px 0;
  `;

  return (
    <Container>
      <h2>TODOリスト</h2>
      <form>
        <TextField id="standard-basic" label="TODOを入力" variant="standard" />
      </form>
      <Box sx={{ display: "flex", justifyContent: "space-around", mt: 5 }}>
        <SIncompEriaTodo>
          <p style={{ margin: "0" }}>未完了エリア</p>
          <ul>
            <li style={{ marginBottom: "10px" }}>
              リスト1
              <Button variant="contained" sx={{ ml: 4 }}>
                完了
              </Button>
              <Button variant="contained" color="error" sx={{ mx: 1 }}>
                削除
              </Button>
            </li>
            <li style={{ marginBottom: "10px" }}>
              リスト2
              <Button variant="contained" sx={{ ml: 4 }}>
                完了
              </Button>
              <Button variant="contained" color="error" sx={{ mx: 1 }}>
                削除
              </Button>
            </li>
          </ul>
        </SIncompEriaTodo>
        <SCompEriaTodo>
          <p style={{ margin: "0" }}>完了エリア</p>
          <ul>
            <li style={{ marginBottom: "10px" }}>
              リスト1
              <Button color="success" variant="contained" sx={{ ml: 4 }}>
                未完了
              </Button>
            </li>
          </ul>
        </SCompEriaTodo>
      </Box>
    </Container>
  );
};
