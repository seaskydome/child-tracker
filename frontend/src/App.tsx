import React, { useEffect, useState } from "react";
import { Child as ChildModel } from "./models/child";
import Child from "./components/child";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import styles from "./styles/ChildrenPage.module.css";
import styleUtils from "./styles/utils.module.css";
import * as ChildrenApi from "./network/children_api";
import AddEditChildDialog from "./components/AddEditChildDialog";
import { FaPlus } from "react-icons/fa";
import SignUpModal from "./components/SignUpModal";

function App() {
  const [children, setChildren] = useState<ChildModel[]>([]);

  const [childrenLoading, setChildrenLoading] = useState(true);
  const [showChildrenLoadingError, setShowChildrenLoadingError] = useState(false);

  const [showAddChildDialog, setShowAddNoteDialog] = useState(false);
  const [childToEdit, setChildToEdit] = useState<ChildModel|null>(null);

  useEffect(() => {
    async function loadNotes() {
      try {
        setShowChildrenLoadingError(false);
        setChildrenLoading(true);
        const children = await ChildrenApi.fetchChildren();
        setChildren(children);
      } catch (error) {
        console.error(error);
        setShowChildrenLoadingError(true);
      } finally {
        setChildrenLoading(false);
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

  const childrenGrid = (
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.childrenGrid}`}>
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
  )

  return (
    <Container className={styles.childrenPage}>
      <Button
        className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
        onClick={() => setShowAddNoteDialog(true)}
      >
        <FaPlus />
        Add new child
      </Button>

      {/* 
        If children loading show a spinner
        If theres an error show an error
        If both are off:
          If you have children show them
          If not show a message
      */}
      {childrenLoading && <Spinner animation="border" variant="primary"/>}
      {showChildrenLoadingError && <p style={{color: "white"}}>Something went wrong. Please refresh the page.</p>}
      {!childrenLoading && !showChildrenLoadingError && 
      <>
        { children.length > 0
            ? childrenGrid
            : <p style={{color: "white"}}>You don't have any children yet.</p>
        }
      </>
      }

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
      { true &&
        <SignUpModal 
          onDismiss={() => {}}
          onSignUpSuccessful={() => {}}
        />
      }
    </Container>
  );
}

export default App;
