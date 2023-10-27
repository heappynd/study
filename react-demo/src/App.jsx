import { forwardRef, useRef } from "react";

const MyInput = forwardRef(function MyInput(props, ref) {
  return <input type="text" ref={ref} />;
});

function App() {
  const myRef = useRef(null);

  const ok = () => {
    myRef.current.focus();
    myRef.current.style.color = "red";
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
