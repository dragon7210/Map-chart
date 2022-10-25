import { useEffect, useState } from "react";
import GoogleMap from "google-map-react";
import { AllData, country } from "../../data/country";
import { Position } from "../../data/position";
import BackSvg from "../../img/back.png";
import { useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import "./home.css";

const Home = () => {
  const [countryName, setCountryName] = useState([]);
  const [all, setAll] = useState([]);
  const [selCountry, setSelCountry] = useState("");
  const [search, setSearch] = useState(28);
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);
  const [third, setThird] = useState(30);
  const [display, setDisplay] = useState([]);

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
    if (!str) {
      return 0;
    }
    const num = Number(str.replaceAll("+", ""));
    return isNaN(num) ? 0 : num;
  };
  const handleChange = (e) => {
    let newArray = [];
    if (e.target.value === "all") {
      setSelCountry("all");
      countryName.forEach((element) => {
        if (element === "") return;
        let sum1 = 0;
        let sum2 = 0;
        all.forEach((alls) => {
          sum1 +=
            alls.site_country === element ? parseNumber(alls.difference) : 0;
          sum2 +=
            alls.site_country === element
              ? parseNumber(alls.requested_trials)
              : 0;
        });
        newArray.push([sum1, sum2]);
      });
      setDisplay(newArray);
      return;
    }
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
  console.log(display);
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
          <option value="all">All</option>
          {countryName.map((element, index) => (
            <option key={index} value={element}>
              {element}
            </option>
          ))}
        </select>
        <button className="bar-button">Priority</button>
        <button className="bar-button">Project</button>
      </div>
      <GoogleMap
        bootstrapURLKeys={{ key: "" }}
        defaultZoom={1}
        defaultCenter={{ lat: 34.397, lng: 120.644 }}
      >
        {search !== 28 ? (
          <span lat={Position[search][0]} lng={Position[search][1]}>
            <div
              className="chart"
              style={{
                top: first > second ? -first / 5 + "px" : -second / 5 + "px",
              }}
            >
              <div
                className="third"
                style={{ height: third / 5 + "px" }}
                data-tip
                data-for="registerTip1"
              />
              <ReactTooltip id="registerTip1" place="top" effect="solid">
                {third}
              </ReactTooltip>
              <div
                className="first"
                style={{ height: first / 5 + "px" }}
                data-tip
                data-for="registerTip2"
              />
              <ReactTooltip id="registerTip2" place="top" effect="solid">
                {first}
              </ReactTooltip>
              <div
                className="second"
                style={{ height: second / 5 + "px" }}
                data-tip
                data-for="registerTip3"
              />
              <ReactTooltip id="registerTip3" place="top" effect="solid">
                {second}
              </ReactTooltip>
            </div>
          </span>
        ) : (
          <></>
        )}
        {selCountry === "all" ? (
          display.map((element, index) => (
            <span key={index} lat={Position[index][0]} lng={Position[index][1]}>
              <div
                className="chart"
                style={{
                  top:
                    element[0] > element[1]
                      ? -element[0] / 5 + "px"
                      : -element[1] / 5 + "px",
                }}
              >
                <div
                  className="third"
                  style={{ height: third / 5 + "px" }}
                  data-tip
                  data-for={`registerTip1` + index}
                />
                <ReactTooltip
                  id={`registerTip1` + index}
                  place="top"
                  effect="solid"
                >
                  {third}
                </ReactTooltip>
                <div
                  className="first"
                  style={{ height: element[0] / 5 + "px" }}
                  data-tip
                  data-for={`registerTip2` + index}
                />
                <ReactTooltip
                  id={`registerTip2` + index}
                  place="top"
                  effect="solid"
                >
                  {element[0]}
                </ReactTooltip>
                <div
                  className="second"
                  style={{ height: element[1] / 5 + "px" }}
                  data-tip
                  data-for={`registerTip3` + index}
                />
                <ReactTooltip
                  id={`registerTip3` + index}
                  place="top"
                  effect="solid"
                >
                  {element[1]}
                </ReactTooltip>
              </div>
            </span>
          ))
        ) : (
          <></>
        )}
      </GoogleMap>
    </div>
  );
};

export default Home;
