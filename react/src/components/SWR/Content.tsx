import React from "react";
import useUser from "../../hooks/useUser";

const Content = ({ id }) => {
  const { user, isLoading, isError } = useUser(id);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>Error!</h2>;
  }

  return <h2>name: {user.name}</h2>;
};

export default Content;
