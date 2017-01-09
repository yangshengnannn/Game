var Bignumber = (function () {
    function Bignumber() {
        this.upNumber = 0;
        this.downNumber = 0;
    }
    var d = __define,c=Bignumber,p=c.prototype;
    p.setNumber = function (num) {
        if (num > Bignumber.fold) {
            var s = Math.floor(num / Bignumber.fold);
            this.upNumber = s;
            s = num % Bignumber.fold;
            this.downNumber = s;
        }
        else {
            this.downNumber = num;
        }
    };
    p.setBigNumber = function (bignum) {
        this.upNumber = bignum.upNumber;
        this.downNumber = bignum.downNumber;
    };
    p.addNumber = function (num) {
        if (num >= Bignumber.fold) {
            var s = Math.floor(num / Bignumber.fold);
            this.upNumber += s;
            s = num % Bignumber.fold;
            this.downNumber += s;
        }
        if (num < Bignumber.fold && num + this.downNumber >= Bignumber.fold) {
            this.upNumber++;
            this.downNumber = this.downNumber + num - Bignumber.fold;
        }
        if (num < Bignumber.fold && num + this.downNumber < Bignumber.fold) {
            this.downNumber = this.downNumber + num;
        }
    };
    p.addBigNumber = function (bignum) {
        this.upNumber += bignum.upNumber;
        this.downNumber += bignum.downNumber;
        if (this.downNumber > Bignumber.fold) {
            var s = Math.floor(this.downNumber / Bignumber.fold);
            this.upNumber += s;
            s = this.downNumber % Bignumber.fold;
            this.downNumber = s;
        }
    };
    p.subtractNumber = function (num) {
        var UP = this.upNumber;
        var DOWN = this.downNumber;
        if (num < this.downNumber) {
            this.downNumber -= num;
            return;
        }
        if (num > this.downNumber) {
            this.upNumber -= 1;
            var s = Bignumber.fold + this.downNumber - num;
            for (; this.upNumber > 0 && s < 0; this.upNumber--) {
                s += Bignumber.fold;
            }
            if (s < 0 && this.upNumber <= 0) {
                console.warn("number>this数据不足");
                this.upNumber = UP;
                this.downNumber = DOWN;
                return;
            }
            this.downNumber = s;
        }
    };
    p.subtractBigNumber = function (bignum) {
        if (this.upNumber < bignum.upNumber) {
            console.warn("Bignumber>this数据不足");
            return;
        }
        if (this.downNumber >= bignum.downNumber) {
            this.upNumber -= bignum.upNumber;
            this.downNumber -= bignum.downNumber;
        }
        else {
            this.upNumber -= bignum.upNumber;
            this.upNumber--;
            this.downNumber += Bignumber.fold;
            this.downNumber -= bignum.downNumber;
        }
    };
    p.toString = function () {
        var str = "";
        str = (this.upNumber * Bignumber.fold + this.downNumber).toString();
        return str;
    };
    Bignumber.fold = 1;
    return Bignumber;
}());
egret.registerClass(Bignumber,'Bignumber');
//# sourceMappingURL=Bignumber.js.map