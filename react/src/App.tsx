import { useState } from "react";
import Content from "./components/SWR/Content";
import Avatar from "./components/SWR/Avatar";

function App() {
  return (
    <div>
      <Content id={1} />
      <Avatar id={1} />
    </div>
  );
}

export default App;
