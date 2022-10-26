import Small from "../../components/small";
import { Data } from "../../data/position";
import { useNavigate } from "react-router-dom";
import "./back.css";

const Back = () => {
  const navigate = useNavigate();
  return (
    <div className="back">
      <div className="small" onClick={() => navigate("/")}>
        <p className="title">Nothern Hemisphpere name</p>
        <p className="date">25/11/2022</p>
        <div className="center">
          <button className="center-button">
            <p className="bottom">{2023}</p>
          </button>
          <button className="center-button">
            <p className="bottom">{50}projects</p>
          </button>
          <button className="center-button">
            <p className="bottom">{110}Countries</p>
          </button>
          <button className="center-button">
            <p className="bottom">{250}TDs</p>
          </button>
          <button className="center-button">
            <p className="bottom">{780}Trials</p>
          </button>
        </div>
        <p className="bottom">
          First recommendation for the 2023 nothern Hemisphere planning.
          <br />
          Fetch data from SCOUT
        </p>
      </div>
      {Data.map((element, index) => (
        <Small
          key={index}
          year={2023}
          project={50}
          country={50}
          ton={20}
          trial={30}
        />
      ))}
    </div>
  );
};

export default Back;
