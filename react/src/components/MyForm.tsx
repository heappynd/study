import { useRef } from "react";
import MyInput  from "./MyInput";

export default function MyForm() {
  const inputRef = useRef(null);

  function handleClick() {
    console.log('inputRef.current', inputRef.current)
    inputRef.current.focus();
    inputRef.current.style.outline = '3px solid red'
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>
        聚焦输入框
      </button>
    </>
  );
}