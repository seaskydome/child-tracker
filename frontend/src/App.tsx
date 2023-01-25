import React, { useEffect, useState } from "react";
import { Child as ChildModel } from "./models/child";
import Child from "./components/child";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "./styles/ChildrenPage.module.css";
import styleUtils from "./styles/utils.module.css";
import * as ChildrenApi from "./network/children_api";
import AddEditChildDialog from "./components/AddEditChildDialog";
import { FaPlus } from "react-icons/fa";

function App() {
  const [children, setChildren] = useState<ChildModel[]>([]);

  const [showAddChildDialog, setShowAddNoteDialog] = useState(false);
  const [childToEdit, setChildToEdit] = useState<ChildModel|null>(null);

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
              onChildClicked={setChildToEdit}
            />
          </Col>
        ))}
      </Row>
      {showAddChildDialog && (
        <AddEditChildDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onChildSaved={(newChild) => {
            setChildren([...children, newChild]);
            setShowAddNoteDialog(false);
          }}
        />
      )}
      {childToEdit &&
        <AddEditChildDialog
          childToEdit={childToEdit}
          onDismiss={() => setChildToEdit(null)}
          onChildSaved={(updatedChild) => {
            setChildren(children.map(c => (
              c._id === updatedChild._id ? updatedChild : c
            )));
            setChildToEdit(null);
        }}
      />
      }
    </Container>
  );
}

export default App;
