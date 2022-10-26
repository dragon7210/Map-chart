import "./small.css";

const Small = ({ year, project, country, ton, trial }) => {
  return (
    <div className="small">
      <p className="title">Recommendation name</p>
      <p className="date">25/11/2022</p>
      <div className="center">
        <button className="center-button">
          <p className="bottom">{year}</p>
        </button>
        <button className="center-button">
          <p className="bottom">{project}projects</p>
        </button>
        <button className="center-button">
          <p className="bottom">{country}Countries</p>
        </button>
        <button className="center-button">
          <p className="bottom">{ton}TDs</p>
        </button>
        <button className="center-button">
          <p className="bottom">{trial}Trials</p>
        </button>
      </div>
      <p className="bottom">
        First recommendation for the 2023 nothern Hemisphere planning.
        <br />
        Fetch data from SCOUT
      </p>
    </div>
  );
};

export default Small;
