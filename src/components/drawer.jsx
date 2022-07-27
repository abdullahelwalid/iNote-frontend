import React, {useRef, useEffect} from "react";
import cn from "classnames"

function Drawer({ isOpen, children, className, onClose, position = "left" }) {
  const bodyRef = useRef(document.querySelector("body"));

  useEffect(() => {
    const updatePageScroll = () => {
      if (isOpen) {
        bodyRef.current.style.overflow = "hidden";
      } else {
        bodyRef.current.style.overflow = "";
      }
    };
    updatePageScroll();
  }, [isOpen]);

  return (
    <div
      aria-hidden={isOpen ? "false" : "true"}
      className={cn("drawer-container", {
        open: isOpen,
        className,
      })}
    >
      <div className={cn("drawer", position)} role="dialog">
        {children}
      </div>
      <div className="backdrop" onClick={onClose} />
    </div>
  );
}

export default Drawer;
