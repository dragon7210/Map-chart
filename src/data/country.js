import Data from "./data.xlsx";
import * as XLSX from "xlsx";

export const AllData = async () => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(Data);
    const responseBlob = await response.blob();
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      resolve(data);
    };
    if (rABS) reader.readAsBinaryString(responseBlob);
    else reader.readAsArrayBuffer(responseBlob);
  });
};

export const country = async () => {
  const records = await AllData();
  const temp = records.slice(1, records.length);
  const countryObj = {};
  temp.forEach((element) => (countryObj[element[0]] = 1));
  const countryArr = [];
  for (let k in countryObj) {
    countryArr.push(k);
  }
  return countryArr;
};
