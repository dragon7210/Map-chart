import Small from "../../components/small";
import { Data } from "../../data/position";
import "./back.css";

const Back = () => {
  return (
    <div className="back">
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
