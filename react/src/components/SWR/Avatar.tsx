import React from "react";
import useUser from "../../hooks/useUser";

const Avatar = ({ id }) => {
  const { user, isLoading, isError } = useUser(id);

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error!</span>;
  }

  return <span>email: {user.email}</span>;
};

export default Avatar;
