import React from "react";
import UserNavbar from "./UserNavbar.jsx";

const UserHeader = (user) => {
  return (
    <header>
      <UserNavbar user={user.user} />
    </header>
  );
};

export default UserHeader;
