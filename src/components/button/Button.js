import React from "react";

export const Button = ({
  onClick,
  className,
  type = "button",
  wFull = false,
  bgColor = "primary",
  children,
}) => {
  let bgClassName = "bg-primary";
  switch (bgColor) {
    case "primary":
      bgClassName = "bg-primary";
      break;
    case "secondary":
      bgClassName = "bg-secondary";
      break;

    default:
      break;
  }
  return (
    <>
      <button
        onClick={onClick}
        className={`capitalize py-3 px-6 rounded-lg  text-white font-medium ${
          wFull ? "w-full" : ""
        } mt-auto ${bgClassName} ${className}`}
      >
        {children}
      </button>
    </>
  );
};
