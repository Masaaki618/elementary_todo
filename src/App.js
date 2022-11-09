import { Container, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { Input } from "./components/Input";
import { ImCompEria } from "./components/ImCompEria.jsx";
import { CompEria } from "./components/CompEria";

export const App = () => {
  //インプットエリアの初期値
  const [inputText, SetInputText] = useState("");

  //未完了エリアのtodoに登録する初期値
  const [imcopleteTodo, setImCompTodo] = useState(() => {
    const savedImcompletedTodo = localStorage.getItem("imcopleteTodo");
    if (savedImcompletedTodo) {
      return JSON.parse(savedImcompletedTodo);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("imcopleteTodo", JSON.stringify(imcopleteTodo));
  }, [imcopleteTodo]);

  //完了エリアのtodoに登録する初期値
  const [completedTodo, setCompTodo] = useState(() => {
    const savedCompTodos = localStorage.getItem("completedTodo");
    if (savedCompTodos) {
      return JSON.parse(savedCompTodos);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("completedTodo", JSON.stringify(completedTodo));
  }, [completedTodo]);

  //バリデーションの設定
  const [isvalid, setIsvalid] = useState(false);

  const changeInput = (e) => {
    //テキスト入力が行わるる毎にinputTextの値を書き換える
    if (e.target.value.length <= 10) {
      setIsvalid(false);
      SetInputText(e.target.value);
    } else {
      setIsvalid(true);
      SetInputText(e.target.value.splice(0, -1));
    }
  };

  //エンターが押された時の挙動
  const submitInput = (e) => {
    //ページ遷移使用する挙動をキャンセル
    e.preventDefault();

    //inputエリアが空白の場合は登録できないようにする
    if (inputText !== "") {
      setImCompTodo((prevTodo) => [
        ...prevTodo,
        { text: inputText, id: imcopleteTodo.length },
      ]);
      SetInputText("");
      setIsvalid(false);
    }
  };

  //引数で渡ってきたidとtodoリスト内に一致するtodoを削除
  const deleteTodo = (id) => {
    setImCompTodo((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
  };

  //未完了エリアから完了エリアへの移動
  const moveToCompleteArea = (id) => {
    const addTodo = imcopleteTodo.find((todo) => todo.id === id);
    setCompTodo((prevAddTodo) => [...prevAddTodo, { ...addTodo }]);
    setImCompTodo((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
  };

  //完了エリアから未完了エリアへの移動
  const moveToImcompleteArea = (id) => {
    const backTodo = completedTodo.find((todo) => todo.id === id);
    setImCompTodo((prevAddTodo) => [...prevAddTodo, { ...backTodo }]);
    setCompTodo((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
  };

  return (
    <Container>
      <h2>TODOリスト</h2>
      <Input
        submitInput={submitInput}
        inputText={inputText}
        isvalid={isvalid}
        changeInput={changeInput}
      />
      <Box sx={{ display: "flex", justifyContent: "space-around", mt: 5 }}>
        {imcopleteTodo.length === 0 ? (
          <p>未完了のTODOはありません</p>
        ) : (
          <ImCompEria
            imcopleteTodo={imcopleteTodo}
            moveToCompleteArea={moveToCompleteArea}
            deleteTodo={deleteTodo}
          />
        )}

        {completedTodo.length === 0 ? (
          <p>完了したTODOはありません</p>
        ) : (
          <CompEria
            completedTodo={completedTodo}
            moveToImcompleteArea={moveToImcompleteArea}
          />
        )}
      </Box>
    </Container>
  );
};
