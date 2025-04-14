import { Col, Container, Row } from "react-bootstrap";
import { CurrencyEuro } from "react-bootstrap-icons";
import { useSelector } from "react-redux";

const SingleDish = ({ item }) => {
  const Lang = useSelector((state) => state.Lang.lang);
  return (
    <Container className="py-2">
      <Row className="text-center">
        <Col className="col-10">
          <Row className=" d-flex align-items-center justify-content-center">
            {Lang === "Ita" && (
              <Col className="text-start">{item.name_ita}</Col>
            )}
            {Lang === "Eng" && (
              <Col className="text-start">{item.name_eng}</Col>
            )}

            <Col className="d-flex justify-content-end align-items-center">
              {item.price}
              <CurrencyEuro />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default SingleDish;
