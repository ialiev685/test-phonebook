import React from "react";
import Loader from "react-loader-spinner";
import "./Spinner.scss";

export const Spinner = () => {
  return (
    <div className="spinner mt-6">
      <Loader
        type="Grid"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    </div>
  );
};
