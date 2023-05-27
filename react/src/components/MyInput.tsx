import { forwardRef, useImperativeHandle, useRef } from "react";

// const MyInput = forwardRef((props, ref) => {
//   return <input {...props} ref={ref} />;
// });

const MyInput = forwardRef((props, ref) => {
  const realInputRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      // 只暴露 focus，没有别的
      focus() {
        realInputRef.current.focus();
      },
    };
  });

  return <input {...props} ref={realInputRef} />;
});

export default MyInput;
