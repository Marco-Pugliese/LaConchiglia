import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <>Hello World</>
      <>
        <Link to={"/menu"}>Vai al menu</Link>
      </>
    </div>
  );
};
export default LandingPage;
