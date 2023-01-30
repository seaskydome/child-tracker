import { ConflictError, UnauthorizedError } from "../errors/http.errors";
import { Child } from "../models/child";
import { User } from "../models/user";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  // basic js way to fetch, the second argument is the type of command
        // we added the PROXY in the package.json which is where we fetch from
        // and CORS wont have a problem
  const response = await fetch(input, init);
  
  if(response.ok){
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    if (response.status === 401){
      throw new UnauthorizedError(errorMessage);
    } else if (response.status === 409) {
      throw new ConflictError(errorMessage);
    } else {
      throw Error("Request failed with status: " + response.status + " message: " + errorMessage);
    }
  }
}

// gets the user data from the cookies (if we are logged in)
// this works because frontend and backend are on the same URL.
// if they are on different, you need to include the credentials
// explicitly, which we should do in the fetchData function
export async function getLoggedInUser(): Promise<User> {
  const response = await fetchData("/api/users", {
    method: "GET",
  })

  return response.json();
}

export interface SignUpCredentials {
  username: string,
  email: string, 
  password: string,
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
  const response = await fetchData("/api/users/signup", 
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  return response.json();
}

export interface LoginCredentials {
  username: string,
  password: string,
}

export async function login(credentials: LoginCredentials): Promise<User> {
  const response = await fetchData("/api/users/login", 
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  return response.json();
}

export async function logout() {
  await fetchData("/api/users/logout", {
    method: "POST"
  });
}

export async function fetchChildren(): Promise<Child[]> {
  const response = await fetchData("/api/children", {
    method: "GET",
    });

    // parse the json cuz remember we are sending json
    return await response.json();
}

export interface ChildInput {
  name: string,
  gender?: string,
  age?: number
}

export async function createChild(child: ChildInput): Promise<Child> {
  const response = await fetchData("/api/children", {
    method: "POST",
    // this tells the backend what format our body is in, its 
    // very case sensitive n shit so be careful
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(child),
  });

  return response.json();
}

export async function updateChild(childId:string, child: ChildInput): Promise<Child> {
  const response = await fetchData("/api/children/" + childId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(child),
  })
  return response.json();
}

export async function deleteChild(childId: string) {
  await fetchData("/api/children/" + childId, {
    method: "DELETE"
  })
}