import style from "../style.module.css";
import { TextField } from "@mui/material";
export const Input = ({ changeInput, inputText, isvalid, submitInput }) => {
  return (
    <form onSubmit={submitInput}>
      <TextField
        id="standard-basic"
        label="TODOを入力"
        variant="standard"
        value={inputText}
        className={isvalid ? style.input_validation : ""}
        onChange={changeInput}
      />
      {isvalid ? (
        <p className={style["error-message"]}>10文字以上は入力できません</p>
      ) : null}
    </form>
  );
};
