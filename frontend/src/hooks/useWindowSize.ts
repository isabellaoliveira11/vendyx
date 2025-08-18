import { useState, useEffect } from "react";

interface IUseWindowSizeReturnedValues {
  windowWidth: number;
  windowHeight: number;
}

const useWindowSize = (): IUseWindowSizeReturnedValues => {
  const [windowSize, setWindowSize] = useState<IUseWindowSizeReturnedValues>({
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
