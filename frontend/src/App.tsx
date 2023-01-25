import React, { useEffect, useState } from "react";
import { Child as ChildModel } from "./models/child";
import Child from "./components/child";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "./styles/ChildrenPage.module.css";
import styleUtils from "./styles/utils.module.css";
import * as ChildrenApi from "./network/children_api";
import AddChildDialog from "./components/AddChildDialog";
import { FaPlus } from "react-icons/fa";

function App() {
  const [children, setChildren] = useState<ChildModel[]>([]);

  const [showAddChildDialog, setShowAddNoteDialog] = useState(false);

  useEffect(() => {
    async function loadNotes() {
      try {
        const children = await ChildrenApi.fetchChildren();
        setChildren(children);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }

    loadNotes();
  }, []);

  async function deleteChild(child: ChildModel) {
    try {
      await ChildrenApi.deleteChild(child._id);
      setChildren(children.filter((c) => c._id !== child._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Container>
      <Button
        className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
        onClick={() => setShowAddNoteDialog(true)}
      >
        <FaPlus />
        Add new child
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {children.map((child) => (
          <Col key={child._id}>
            <Child
              child={child}
              className={styles.child}
              onDeleteChildClicked={deleteChild}
            />
          </Col>
        ))}
      </Row>
      {showAddChildDialog && (
        <AddChildDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onChildSaved={(newChild) => {
            setChildren([...children, newChild]);
            setShowAddNoteDialog(false);
          }}
        />
      )}
    </Container>
  );
}

export default App;
