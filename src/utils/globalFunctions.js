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

function getHourDiffFromNow(timestamp){
    let _date = new Date(0);
    let now = new Date();
    _date.setSeconds(timestamp.seconds);
    if(_date.getTime() === _date.getTime()){
        return Math.abs(now - _date) / 36e5
    }
    return 0
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const sortObject = sortObj
export const hourDiffFromFirestoreTimestamp = getHourDiffFromNow
export const randomInt = getRandomInt