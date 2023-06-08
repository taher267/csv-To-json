const fs = require("fs");
const path = require("path");
const commaReplaceBetweenDblQuote = require("./commaReplaceBetweenDblQuote");
const err = (msg) => {
    return new Error(msg || `Invalid data!`);
};
module.exports = ({ fileSource }) => {
    if (!fileSource) throw err(`Please, Source provide!`);
    else if (typeof fileSource !== "string")
        throw err(`File source should be string!`)
    else if (!fileSource.endsWith('.csv')) throw err(`Please provide valid file`);
    // const actualFilePath = path.resolve(__dirname, fileSource);
    const csv = fs.readFileSync(fileSource);
    const array = csv.toString().split(/\r\n|\n\r|\n/);
    let headers = commaReplaceBetweenDblQuote(array[0])
        .split(",")
        ?.map?.((item) => item?.replace?.(/(######)/g, ",") || "");

    let result = [];
    for (const im of array.splice(1)) {
        const replc = commaReplaceBetweenDblQuote(im);
        const item = replc.split(",");
        if (item?.join?.("")?.length) {
            const obj = {};
            // console.log(item)
            // console.log(headers?.length, item.length)
            for (const k in headers) {
                obj[headers[k]] =
                    item?.[k]?.replace?.(/"/g, "")?.replace?.(/(######)/g, ",") || "";
            }
            if (Object.keys(obj)?.length) {
                result.push(obj);
            }
        }
    }
    return {
        headers,
        data: result
    }
};
