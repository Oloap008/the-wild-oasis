import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open
          opens="cabin-form"
          render={(handlerFn) => (
            <Button onClick={handlerFn}>Add new cabin</Button>
          )}
        />
        <Modal.Window
          name="cabin-form"
          render={(handlerFn) => <CreateCabinForm onCloseModal={handlerFn} />}
        />
      </Modal>
    </div>
  );
}

export default AddCabin;
