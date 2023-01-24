import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "react-bootstrap";
import { Child } from "./models/child";

function App() {
  const [children, setChildren] = useState<Child[]>([]);

  useEffect(() => {
    async function loadNotes() {
      try {
        // basic js way to fetch, the second argument is the type of command
        // we added the PROXY in the package.json which is where we fetch from
        // and CORS wont have a problem
        const response = await fetch("/api/children", {
        method: "GET",
        });

        // parse the json cuz remember we are sending json
        const children = await response.json();
        setChildren(children);

      } catch (error) {
        console.error(error);
        alert(error);
      }
    }

    loadNotes();
  }, []);

  return (
    <div className="App">
      {JSON.stringify(children)}
    </div>
  );
}

export default App;
