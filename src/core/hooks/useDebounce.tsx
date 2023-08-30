import { useEffect, useState } from "react";

export interface DebounceProps {
  value: string;
  delay: number;
}

export const useDebounce = ({ value, delay }: DebounceProps) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay]
  );
  return debouncedValue;
};
