import { useState, useEffect } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const onMessage = (
      event: MessageEvent<{ type: string; payload: number }>
    ) => {
      const message = event.data; // The JSON data our extension sent
      // console.log("message", message);
      if (message.type === "activeColorThemeChange") {
        if (message.payload === 1) {
          setTheme("light");
          document.documentElement.classList.remove("dark");
        } else {
          setTheme("dark");
          document.documentElement.classList.add("dark");
        }
      }
    };
    window.addEventListener("message", onMessage);

    return () => window.removeEventListener("message", onMessage);
  }, []);

  return {
    theme,
  };
}
