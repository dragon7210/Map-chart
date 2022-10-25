import { useEffect, useState } from "react";
import GoogleMap from "google-map-react";
import { AllData, country } from "../../data/country";
import { Position } from "../../data/position";
import BackSvg from "../../img/back.png";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const [countryName, setCountryName] = useState([]);
  const [all, setAll] = useState([]);
  const [selCountry, setSelCountry] = useState("");
  const [search, setSearch] = useState(28);
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);
  const [third, setThird] = useState(30);

  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      setCountryName(await country());
    })();
    (async function () {
      setAll(await AllData());
    })();
  }, []);

  const parseNumber = (str) => {
    const num = Number(str.replaceAll("+", ""));
    return isNaN(num) ? 0 : num;
  };
  const handleChange = (e) => {
    setSelCountry(e.target.value);
    const selected = e.target.value;
    let sum1 = 0;
    let sum2 = 0;
    all.forEach((element) => {
      sum1 +=
        element.site_country === selected ? parseNumber(element.difference) : 0;
      sum2 +=
        element.site_country === selected
          ? parseNumber(element.requested_trials)
          : 0;
    });

    setFirst(sum1);
    setSecond(sum2);
    setSearch(countryName.indexOf(selected));
  };

  return (
    <div className="map">
      <div className="tool">
        <img
          className="backbutton"
          src={BackSvg}
          alt="back"
          onClick={() => navigate("/back")}
        />
        <button className="bar-button">Indication</button>
        <select value={selCountry} onChange={handleChange}>
          {countryName.map((element, index) => (
            <option key={index} value={element}>
              {element}
            </option>
          ))}
        </select>
        <button className="bar-button">Priority</button>
        <button className="bar-button">Project</button>
      </div>
      <GoogleMap defaultZoom={1} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
        {search !== 28 ? (
          <span lat={Position[search][0]} lng={Position[search][1]}>
            <div
              className="chart"
              style={{ top: first > second ? -first + "px" : -second + "px" }}
            >
              <div className="third" style={{ height: third + "px" }} />
              <div className="first" style={{ height: first + "px" }} />
              <div className="second" style={{ height: second + "px" }} />
            </div>
          </span>
        ) : (
          <></>
        )}
      </GoogleMap>
    </div>
  );
};

export default Home;
