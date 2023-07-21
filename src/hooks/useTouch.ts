import { useState } from "react";

export const useTouch = () => {
  const [touchStart, setTouchStart] = useState<number | undefined>(0);
  const [touchEnd, setTouchEnd] = useState<number | undefined>(0);

  function handleTouchStart(e: React.TouchEvent) {
    setTouchStart(e.targetTouches[0]?.clientX);
  }

  function handleTouchMove(e: React.TouchEvent) {
    setTouchEnd(e.targetTouches[0]?.clientX);
  }

  function handleTouchEnd() {
    if (!touchEnd || !touchStart) return;
    if (touchStart - touchEnd > 150) {
      return "left";
    }

    if (touchStart - touchEnd < -150) {
      return "right";
    }
  }

  return { handleTouchEnd, handleTouchStart, handleTouchMove };
};
