import { Container, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { Input } from "./components/Input";
import { ImCompEria } from "./components/ImCompEria.jsx";
import { CompEria } from "./components/CompEria";

export const App = () => {
  //インプットエリアの初期値
  const [inputText, SetInputText] = useState("");

  //未完了エリアのtodoに登録する初期値
  const [imCompTodo, setImCompTodo] = useState(() => {
    const savedImcompTodos = localStorage.getItem("imCompTodo");
    if (savedImcompTodos) {
      return JSON.parse(savedImcompTodos);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("imCompTodo", JSON.stringify(imCompTodo));
  }, [imCompTodo]);

  //完了エリアのtodoに登録する初期値
  const [compTodo, setCompTodo] = useState(() => {
    const savedCompTodos = localStorage.getItem("compTodo");
    if (savedCompTodos) {
      return JSON.parse(savedCompTodos);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("compTodo", JSON.stringify(compTodo));
  }, [compTodo]);

  //バリデーションの設定
  const [isvalid, setIsvalid] = useState(false);

  const onChangeInput = (e) => {
    //テキスト入力が行わるる毎にinputTextの値を書き換える
    if (e.target.value.length < 10) {
      setIsvalid(false);
      SetInputText(e.target.value);
    } else {
      setIsvalid(true);
      SetInputText(e.target.value.splice(0, -1));
    }
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
      setIsvalid(false);
    }
  };

  //引数で渡ってきたidとtodoリスト内に一致するtodoを削除
  const onClickDeleteTodo = (id) => {
    setImCompTodo((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
  };

  //未完了エリアから完了エリアへの移動
  const onClickAddComp = (id) => {
    const addTodo = imCompTodo.find((todo) => todo.id === id);
    setCompTodo((prevAddTodo) => [...prevAddTodo, { ...addTodo }]);
    setImCompTodo((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
  };

  //完了エリアから未完了エリアへの移動
  const onClickBackImcomp = (id) => {
    const backTodo = compTodo.find((todo) => todo.id === id);
    setImCompTodo((prevAddTodo) => [...prevAddTodo, { ...backTodo }]);
    setCompTodo((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
  };

  return (
    <Container>
      <h2>TODOリスト</h2>
      <Input
        onSubmitInput={onSubmitInput}
        inputText={inputText}
        isvalid={isvalid}
        onChangeInput={onChangeInput}
      />
      <Box sx={{ display: "flex", justifyContent: "space-around", mt: 5 }}>
        <ImCompEria
          imCompTodo={imCompTodo}
          onClickAddComp={onClickAddComp}
          onClickDeleteTodo={onClickDeleteTodo}
        />
        <CompEria compTodo={compTodo} onClickBackImcomp={onClickBackImcomp} />
      </Box>
    </Container>
  );
};
