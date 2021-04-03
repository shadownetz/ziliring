module.exports = {
    getHourDiffFromNow(timestamp){
        let _date = new Date(0);
        let now = new Date();
        _date.setSeconds(timestamp.seconds);
        if(_date.getTime() === _date.getTime()){
            return Math.abs(now - _date) / 36e5
        }
        return 0
    },
    /**
     * Returns a random number between min (inclusive) and max (exclusive)
     */
    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    },

    /**
     * Returns a random integer between min (inclusive) and max (inclusive).
     * The value is no lower than min (or the next integer greater than min
     * if min isn't an integer) and no greater than max (or the next integer
     * lower than max if max isn't an integer).
     * Using Math.round() will give you a non-uniform distribution!
     */
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}