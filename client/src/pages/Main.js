import React from "react";
import { useQuery } from "react-query";
import FetchUser from "../components/Api/FetchUser";
import StandardHeader from "../components/Header/StandardHeader";
import UserHeader from "../components/Header/UserHeader";
import CreateSnippet from "../components/Snippet/CreateSnippet";
import SnippetList from "../components/Snippet/SnippetList";

const Main = () => {
  const { data, isSuccess } = useQuery("user", FetchUser, {
    retry: 1,
  });

  return (
    <>
      {isSuccess && data ? (
        <>
          <UserHeader user={data.username} />
          <CreateSnippet />
        </>
      ) : (
        <StandardHeader />
      )}

      <SnippetList />
    </>
  );
};

export default Main;
