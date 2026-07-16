import react from "react";
import { useState } from "react";

export default function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const Toggle = () => {
    setValue((prevValue) => !prevValue);
  };

  return [value, Toggle];
}
