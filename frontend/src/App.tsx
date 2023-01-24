import React, { useEffect, useState } from "react";
import { Child as ChildModel } from "./models/child";
import Child from "./components/child";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./styles/ChildrenPage.module.css";

function App() {
  const [children, setChildren] = useState<ChildModel[]>([]);

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
    <Container>
      <Row xs={1} md={2} xl={3} className="g-4">
      {children.map((child) => (
        <Col key={child._id}>
          <Child child={child} className={styles.child}/>
        </Col>
      ))}
      </Row>
    </Container>
  );
}

export default App;
