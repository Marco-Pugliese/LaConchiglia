import { Button, Col, Container, Row } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";

const EditableSingleDish = ({ item, toggleVisibility, deleteDish }) => {
  return (
    <Container>
      <Row className="d-flex align-items-center justify-content-around">
        <Col className="fw-bold">{item.name_ita}</Col>
        <Col>
          <Col>{item.category}</Col>
        </Col>
        <Col>{item.price}€</Col>

        <Col className="d-flex justify-content-around align-items-center my-2">
          <Button
            variant={item.visible ? "outline-dark" : "secondary"}
            className={item.visible ? "mx-1" : "mx-1 opacity50"}
            onClick={() => toggleVisibility(item.id, item.visible)}
          >
            {item.visible ? <EyeFill /> : <EyeSlashFill />}
          </Button>
          <Button
            variant="outline-danger"
            className="mx-1"
            onClick={() => deleteDish(item.id)}
          >
            Elimina
          </Button>
          <Button
            variant="outline-warning"
            className="mx-1"
            onClick={() =>
              alert("Modifica il piatto (funzione non implementata)")
            }
          >
            Modifica
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default EditableSingleDish;
