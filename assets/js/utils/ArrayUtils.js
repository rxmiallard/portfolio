class ArrayUtils {
    static forEach(array, callback) {
        if(array instanceof Array) {
            for(let index in array) {
                if(callback(array[index], index) !== undefined) return; 
            }
            return;
        }
        let index = 0;
        for(let key of Object.keys(array)) {
            if(callback(array[key], key, index) !== undefined) return;
            index++;
        }
    }
}