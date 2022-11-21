import React from "react";

const FlagDetail = ({text,data}) => {
  return (
    <div className="flex py-2">
      <p className="font-bold">{text}: </p>
      <p>{data}</p>
    </div>
  );
};

export default FlagDetail;
