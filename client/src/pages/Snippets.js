import React from "react";
import { useQuery } from "react-query";
import FetchUser from "../components/Api/FetchUser";
import StandardHeader from "../components/Header/StandardHeader";
import UserHeader from "../components/Header/UserHeader";
import SnippetParamHandler from "../components/Snippet/SnippetParamHandler";

const Snippets = () => {
  const { data, isSuccess } = useQuery("user", FetchUser, {
    retry: 1,
  });

  return (
    <>
      <>
        {isSuccess && data ? (
          <UserHeader user={data.username} />
        ) : (
          <StandardHeader />
        )}
      </>
      <SnippetParamHandler />
    </>
  );
};

export default Snippets;
