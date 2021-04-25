/*
    Function to distribute data between multiple arrays to display data in grid columns
*/
export function splitArray (arr, len) {
    let data = [];
    for(var i = 0; i< len; i++) {
        data.push([]);
    }
    arr.forEach((item, i) => {
        data = pushToArray(data, len, (i + 1), item);
    });

    function pushToArray(_arr, len, index, dataToPush) {
        let pos = index % len === 0 ? len - 1 : (index % len) - 1;
        _arr[pos].push(dataToPush);
        return _arr;
    }
    return data;
}