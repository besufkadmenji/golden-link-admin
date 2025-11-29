import { useEffect, useState } from "react";

type WindowSize = {
  width: number;
  height: number;
};

const getInitialSize = (): WindowSize => {
  if (typeof window === "undefined") {
    return { width: 0, height: 0 };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

export const useWindowResize = (): WindowSize => {
  const [size, setSize] = useState<WindowSize>(getInitialSize);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
};
