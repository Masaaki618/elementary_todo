import styled from "@emotion/styled";
import { Container, TextField, Box, Button } from "@mui/material";
import { useState } from "react";

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

  //インプットエリアの初期値
  const [inputText, SetInputText] = useState("");

  //未完了エリアのtodoに登録する初期値
  const [imCompTodo, setImCompTodo] = useState([]);

  //完了エリアのtodoに登録する初期値
  const [compTodo, setCompTodo] = useState([]);

  const onChangeInput = (e) => {
    //テキスト入力が行わるる毎にinputTextの値を書き換える
    SetInputText(e.target.value);
  };

  //エンターが押された時の挙動
  const onSubmitInput = (e) => {
    //ページ遷移使用する挙動をキャンセル
    e.preventDefault();
    //inputエリアが空白の場合は登録できないようにする
    if (inputText !== "") {
      setImCompTodo((prevTodo) => [
        ...prevTodo,
        { text: inputText, id: imCompTodo.length },
      ]);
      SetInputText("");
    }
  };

  //引数で渡ってきたidとtodoリスト内に一致するtodoを削除
  const onClickDeleteTodo = (id) => {
    setImCompTodo((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
  };

  const onClickAddComp = (id) => {
    const addTodo = imCompTodo.find((todo) => todo.id === id);
    setCompTodo((prevAddTodo) => [...prevAddTodo, { ...addTodo }]);
    setImCompTodo((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
  };

  return (
    <Container>
      <h2>TODOリスト</h2>
      <form onSubmit={onSubmitInput}>
        <TextField
          id="standard-basic"
          label="TODOを入力"
          variant="standard"
          value={inputText}
          onChange={onChangeInput}
        />
      </form>
      <Box sx={{ display: "flex", justifyContent: "space-around", mt: 5 }}>
        <SIncompEriaTodo>
          <p style={{ margin: "0" }}>未完了エリア</p>
          <ul>
            {imCompTodo.map((todo) => (
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
        <SCompEriaTodo>
          <p style={{ margin: "0" }}>完了エリア</p>
          <ul>
            {compTodo.map((todo) => (
              <li style={{ marginBottom: "10px" }} key={todo.id}>
                {todo.text}
                <Button color="success" variant="contained" sx={{ ml: 4 }}>
                  未完了
                </Button>
              </li>
            ))}
          </ul>
        </SCompEriaTodo>
      </Box>
    </Container>
  );
};
