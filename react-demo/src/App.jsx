import { forwardRef, useRef, useImperativeHandle } from "react";

const MyInput = forwardRef(function MyInput(props, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      // defineExpose({})
      focus() {
        console.log(123);
        inputRef.current.focus();
      },
    };
  });

  return <input type="text" ref={inputRef} />;
});

function App() {
  const myRef = useRef(null);

  const ok = () => {
    myRef.current.focus();
    // !not work
    // myRef.current.style.color = "red";
  };

  return (
    <div>
      Input:
      <MyInput ref={myRef} />
      <button onClick={ok}>ok</button>
    </div>
  );
}

export default App;
