module.exports = (array, size) => {
    let chunkedArr = [];
    let index = 0;
    while (index < array.length) {
        chunkedArr.push(array.slice(index, (index += size)));
    }

    return chunkedArr;
};
