import React from "react";

export const Sign = ({direction}) => {
  if (direction == "ascending") return <span>&#9660;</span>;
  if (direction == "descending") return <span>&#9650;</span>
}