import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";
import EditableMenu from "./EditableMenu";
import { Button, Col, Container, Row } from "react-bootstrap";

const AdminPage = () => {
  const [loading, setLoading] = useState(true);

  const [errore, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (
        error ||
        !data?.user ||
        data.user.email !== "gestione.laconchiglia@gmail.com"
      ) {
        setError("Accesso non autorizzato");
        console.log(errore);
        console.log(data.user.email);
        navigate("/login");
      } else {
        console.log(data);
        setLoading(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);
  const handleLogout = () => {
    supabase.auth.signOut().then(() => {
      navigate("/login");
    });
  };
  if (loading) return <>{navigate("/login")}</>;

  return (
    <Container>
      <Row className="py-4">
        <Col className="col-12 col-xl-10 text-center">
          <div className="text-center fs-3">Benvenuto nella pagina Admin</div>
        </Col>
        <Col>
          <Button onClick={handleLogout}>Logout</Button>
        </Col>
      </Row>
      <EditableMenu />
    </Container>
  );
};

export default AdminPage;
