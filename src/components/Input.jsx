import style from "../style.module.css";
import { TextField } from "@mui/material";
export const Input = ({ onChangeInput, inputText, isvalid, onSubmitInput }) => {
  return (
    <form onSubmit={onSubmitInput}>
      <TextField
        id="standard-basic"
        label="TODOを入力"
        variant="standard"
        value={inputText}
        className={isvalid ? style.input_validation : ""}
        onChange={onChangeInput}
      />
      {isvalid ? (
        <p className={style["error-message"]}>10文字以上は入力できません</p>
      ) : null}
    </form>
  );
};
