import { useEffect, useState } from "react";

export function useLocalStorageState(initialState, key) {
  const [state, setState] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(state));
    },
    [key, state]
  );

  return [state, setState];
}
