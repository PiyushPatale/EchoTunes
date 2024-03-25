import { backendUrl } from "./config";


export const makeUnauthenticatedPOSTRequest = async (route,body) => {
  try {
    console.log(body);
    const response = await fetch(backendUrl + route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify(body),
    });
    const formattedResponse = await response.json();
    return formattedResponse;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred while making the POST request.");
  }
};


export const makeAuthenticatedPOSTRequest = async (route,body) => {

  const token = getToken();
  try {
    console.log(body);
    const response = await fetch(backendUrl + route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`,
      },
      body:JSON.stringify(body),
    });
    const formattedResponse = await response.json();
    return formattedResponse;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred while making the POST request.");
  }
};

const getToken = () => {
  const accessToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
  );
  return accessToken;
};

export const removeToken = () => {
  const date = new Date();
  const expires = date.toUTCString();
  document.cookie = `token=; expires=${expires}; path=/;`;
};


export const makeAuthenticatedGETRequest = async (route) => {
  const token = getToken();
  try {
    console.log(backendUrl + route);
    const response = await fetch(backendUrl + route, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`,
      },
    });
    const formattedResponse = await response.json();
    return formattedResponse;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred while making the Get request.");
  }
};

//This function is used for requests that require authentication and tokens are passed in the header of the request