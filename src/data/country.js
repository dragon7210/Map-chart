import Data from "./data.csv";

export const AllData = async () => {
  const response = await fetch(Data);
  const responseText = await response.text();
  const headers = responseText.slice(0, responseText.indexOf("\n")).split(",");
  const rows = responseText.slice(responseText.indexOf("\n") + 1).split("\n");

  const newArray = rows.map((row) => {
    const values = row.split(",");
    const eachObject = headers.reduce((obj, header, i) => {
      obj[header] = values[i];
      return obj;
    }, {});
    return eachObject;
  });
  return newArray;
};

export const country = async () => {
  const records = await AllData();
  const countryObj = {};
  records.forEach((element) => (countryObj[element.site_country] = 1));
  const countryArr = [];
  for (let k in countryObj) {
    countryArr.push(k);
  }
  return countryArr;
};
