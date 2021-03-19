function sortObj(obj={}) {
    var arr = [];
    var prop;
    for (prop in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(prop)) {
            arr.push({
                'key': prop,
                'value': obj[prop]
            });
        }
    }
    arr.sort(function(a, b) {
        return a.value - b.value;
    });
    return arr; // returns array
}

export const sortObject = sortObj