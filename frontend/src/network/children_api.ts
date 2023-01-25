import { Child } from "../models/child";

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
    throw Error(errorMessage);
  }
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

export async function deleteChild(childId: string) {
  await fetchData("/api/children/" + childId, {
    method: "DELETE"
  })
}