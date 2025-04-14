import { Flag } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { setLangAction } from "../Redux/Actions";

const Header = () => {
  const dispatch = useDispatch();
  return (
    <div className="text-center">
      <div className="bg-info" onClick={() => dispatch(setLangAction("Ita"))}>
        Italian
      </div>
      <div
        className="bg-warning"
        onClick={() => dispatch(setLangAction("Eng"))}
      >
        English
      </div>
    </div>
  );
};
export default Header;
