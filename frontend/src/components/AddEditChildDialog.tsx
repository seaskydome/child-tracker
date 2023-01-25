import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Child } from "../models/child";
import { ChildInput } from "../network/children_api";
import * as ChildrenApi from "../network/children_api";

interface AddEditChildDialogProps {
  // if we pass this, we know we are editing
  // if we don't we know we are adding
  childToEdit?: Child,

  onDismiss: () => void;
  onChildSaved: (child: Child) => void;
}

const AddChildDialog = ({ childToEdit, onDismiss, onChildSaved }: AddEditChildDialogProps) => {
  // react hook forms!! yay
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChildInput>({
    defaultValues: {
      name: childToEdit?.name || "",
      gender: childToEdit?.gender || "",
      age: childToEdit?.age,
    }
  });

  async function onSubmit(input: ChildInput) {
    try {
      let childResponse: Child;
      if(childToEdit) {
        childResponse = await ChildrenApi.updateChild(childToEdit._id, input);
      } else {
        childResponse = await ChildrenApi.createChild(input);
      }
      // this represents passing the successfully added child and
      // adding it to the UI later
      onChildSaved(childResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{childToEdit ? "Edit Child" : "Add Child"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="addEditChildForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Johnny"
              isInvalid={!!errors.name}
              {...register("name", { required: "Required" })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              type="text"
              placeholder="Non-binary"
              {...register("gender")}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control type="number" placeholder="7" {...register("age")} />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type="submit" form="addEditChildForm" disabled={isSubmitting}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddChildDialog;
