import { useState } from "react";
import supabase from "../../supabaseClient";
import { Button, Modal } from "react-bootstrap";
import CreateDishForm from "./CreateDishForm";

const CreateNewElement = () => {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // Funzione per creare un nuovo piatto
  const handleCreateDish = async (newDish) => {
    const { error } = await supabase.from("Menu").insert([newDish]);

    if (error) {
      console.error("Errore nella creazione del piatto:", error.message);
    } else {
      setData((prevData) => [...prevData, newDish]);
      setShow(false); // Chiudi il modale dopo aver creato un piatto
    }
  };

  return (
    <>
      {" "}
      <Button variant="success" onClick={handleShow}>
        Crea nuovo elemento
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crea nuovo elemento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateDishForm handleCreateDish={handleCreateDish} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateNewElement;
