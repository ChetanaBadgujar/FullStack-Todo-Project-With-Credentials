import React, { useContext, useState } from "react";
import { Context } from "../main";
import Loader from "../Components/Loader";
const profile = () => {
  const { isAuthenticated, loading, user } = useContext(Context);
  
  return loading ? (

    <Loader />
  ) : (
    <>
    <div className="load">
      <h1>{user?.name}</h1>
      <h2>{user?.email}</h2>
    </div>
    </>
  );
};

export default profile;
