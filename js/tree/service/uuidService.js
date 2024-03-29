angular.module('treeApp').factory("uuidService", function () {
    return {
        uid:['0', '0', '0'],
        prefix:'treeApp',
        nextUid:function () {
            var index = this.uid.length;
            var digit;

            while(index) {
                index--;
                digit = this.uid[index].charCodeAt(0);
                if (digit == 57 /*'9'*/) {
                    this.uid[index] = 'A';
                    return this.prefix+this.uid.join('');
                }
                if (digit == 90  /*'Z'*/) {
                    this.uid[index] = '0';
                } else {
                    this.uid[index] = String.fromCharCode(digit + 1);
                    return this.prefix+this.uid.join('');
                }
            }
            this.uid.unshift('0');
            return this.prefix+this.uid.join('');
        }
    };
});
