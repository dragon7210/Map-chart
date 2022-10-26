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
  const [third, setThird] = useState(0);
  const [display, setDisplay] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      setCountryName(await country());
    })();
    (async function () {
      const records = await AllData();
      const temp = records.slice(1, records.length);
      setAll(temp);
    })();
  }, []);

  const parseNumber = (str) => {
    if (!str) {
      return 0;
    }
    const num = Number(str);
    return isNaN(num) ? 0 : num;
  };
  const handleChange = (e) => {
    let newArray = [];
    if (e.target.value === "all") {
      setSelCountry("all");
      countryName.forEach((element) => {
        let sum1 = 0;
        let sum2 = 0;
        let sum3 = 0;
        for (let item of all) {
          if (item[0] === element) {
            sum3 = parseInt(
              item[13].slice(element.length + 1, item[13].length)
            );
            break;
          }
        }
        all.forEach((alls) => {
          sum1 += alls[0] === element ? parseNumber(alls[9].toString()) : 0;
          sum2 += alls[0] === element ? parseNumber(alls[8].toString()) : 0;
        });
        newArray.push([sum1, sum2, sum3]);
      });
      setDisplay(newArray);
      return;
    }
    setSelCountry(e.target.value);
    const selected = e.target.value;
    let sum1 = 0;
    let sum2 = 0;
    all.forEach((alls) => {
      sum1 += alls[0] === selected ? parseNumber(alls[9].toString()) : 0;
      sum2 += alls[0] === selected ? parseNumber(alls[8].toString()) : 0;
    });
    let num;
    for (let item of all) {
      if (item[0] === selected) {
        num = parseInt(item[13].slice(selected.length + 1, item[13].length));
        break;
      }
    }

    setThird(num);
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
          <option value="" disabled></option>
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
                top: -third / 20 + "px",
              }}
            >
              <div
                className="third"
                style={{
                  height:
                    [first, second, third].sort(function (a, b) {
                      return b - a;
                    })[0] /
                      20 +
                    "px",
                }}
                data-tip
                data-for="registerTip1"
              />
              <ReactTooltip id="registerTip1" place="top" effect="solid">
                Total capacity: {third}
              </ReactTooltip>
              <div
                className="first"
                style={{ height: first / 20 + "px" }}
                data-tip
                data-for="registerTip2"
              />
              <ReactTooltip id="registerTip2" place="top" effect="solid">
                Requested: {first}
              </ReactTooltip>
              <div
                className="second"
                style={{ height: second / 20 + "px" }}
                data-tip
                data-for="registerTip3"
              />
              <ReactTooltip id="registerTip3" place="top" effect="solid">
                Assigned: {second}
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
                    -element.sort(function (a, b) {
                      return b - a;
                    })[0] /
                      20 +
                    "px",
                }}
              >
                <div>
                  <div
                    className="third"
                    style={{ height: element[2] / 20 + "px" }}
                    data-tip
                    data-for={`registerTip1` + index}
                  />
                  <ReactTooltip
                    id={`registerTip1` + index}
                    place="top"
                    effect="solid"
                  >
                    Total capacity: {element[2]}
                  </ReactTooltip>
                </div>
                <div>
                  <div
                    className="first"
                    style={{ height: element[0] / 20 + "px" }}
                    data-tip
                    data-for={`registerTip2` + index}
                  />
                  <ReactTooltip
                    id={`registerTip2` + index}
                    place="top"
                    effect="solid"
                  >
                    Requested: {element[0]}
                  </ReactTooltip>
                </div>
                <div>
                  <div
                    className="second"
                    style={{ height: element[1] / 20 + "px" }}
                    data-tip
                    data-for={`registerTip3` + index}
                  />
                  <ReactTooltip
                    id={`registerTip3` + index}
                    place="top"
                    effect="solid"
                  >
                    Assigned: {element[1]}
                  </ReactTooltip>
                </div>
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
