import React, { useContext } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import UiContext from "../../context/UiContext/UiContext";
import CategoryForm from "../Category/CategoryForm";
import AddProductForm from "../Products/AddProductForm";
import TransactionForm from "../Transaction/TransactionForm";

const ConfirmModal = ({ formTitle }) => {
  const {
    status,
    setStatus,
    openTransactionForm,
    openProductAddForm,
    openCategoryForm,
  } = useContext(UiContext);
  const toggle = () => setStatus();
  return (
    <div className="modal tabindex='-1">
      <Modal isOpen={status} toggle={toggle}>
        <ModalHeader toggle={toggle}>{formTitle}</ModalHeader>
        <ModalBody>
          {openTransactionForm && <TransactionForm />}

          {openProductAddForm && <AddProductForm />}
          {openCategoryForm && <CategoryForm />}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ConfirmModal;
