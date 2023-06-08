const chunk = require("./chunk");
module.exports = (input) => {
    const keys = [];
    let count = 0;
    input = input?.toString()?.replace(/\\"/g, "~~");
    for (const item of input.split("")) {
        if (item === '"') {
            keys.push(count);
        }
        count++;
    }
    for (const [a, b] of chunk(keys, 2)) {
        const item = input.substring(a, b).replace(/"/g, "");
        // console.log(item, 'item,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,')
        let im = JSON.stringify(item);
        if (item.includes(",")) {
            im = im.replace(/,/g, "######");
            input = input.replace(new RegExp(item, "g"), im);
        }
    }

    input = input.replace(/"/g, "");
    return input;
    // return input?.map?.((item) => item?.replace?.(/(.,.,.,.,)/g, ",") || "");
};
