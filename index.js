import fs from "fs";
import path from "path";
const repaceDblBtnComma = (input) => {
    const regex = /"[^"]*"/g;
    const found = input.match(regex);
    let singleCopy = input;
    for (let pick of found || []) {
        let commaReplace = pick.replace(/,/g, "######");
        const replacedBy = commaReplace.replace(/"/g, "");
        singleCopy = singleCopy.replace(pick, replacedBy);
    }
    singleCopy = singleCopy.replace(/(~~~~~~~~)/g, '"');
    return singleCopy;
};
const main = ({ fileSource, csv }) => {
    if (!csv && fileSource) {
        csv = fs.readFileSync(fileSource)?.toString?.();
    }
    const array = csv.toString().split(/\r\n|\n\r/); //|\n
    let header = repaceDblBtnComma(array[0]).split(",");
    let result = [];
    for (const im of array.splice(1)) {
        let DblQuoteReplace = im.replace(/("")/g, "~~~~~~~~");
        const item = repaceDblBtnComma(DblQuoteReplace)
            .split(",")
            .map((item) => item.replace(/(######)/g, ","));
        if (item?.join?.("")?.length) {
            const obj = {};
            for (const k in header) {
                obj[header[k]] = item?.[k];
            }
            if (Object.keys(obj)?.length) {
                result.push(obj);
            }
        }
    }
    return {
        header,
        data: result,
    };
};

// console.log(main({ fileSource: "../csv.csv" }));
export default main;
