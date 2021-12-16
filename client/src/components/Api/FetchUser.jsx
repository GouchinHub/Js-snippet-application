const FetchUser = async () => {
  var token = localStorage.getItem("token");
  if (token === null || token === "") return null;
  var response = await fetch("/users/" + token, {
    headers: { "x-access-token": token },
  });
  return response.json();
};

export default FetchUser;
