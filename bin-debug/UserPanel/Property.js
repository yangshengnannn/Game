var Property = (function () {
    function Property() {
        this.identityID = 0;
        this.initialAtk = 0;
        this.initialDef = 0;
        this._bitmap = new egret.Bitmap();
        this._bitmap = new egret.Bitmap();
        this._bitmap.scaleX = 1.5;
        this._bitmap.scaleY = 1.5;
        this._bitmap.x = 0;
        this._bitmap.y = 0;
    }
    var d = __define,c=Property,p=c.prototype;
    d(p, "atkDiscript"
        ,function () {
            return "ATK:   ";
        }
    );
    d(p, "defDiscript"
        ,function () {
            return "DEF:   ";
        }
    );
    p.setInformation = function (configId, identityID, name, initialAtk, initialDef, _bitmap) {
        this.configId = configId;
        this.identityID = identityID;
        this.name = name;
        this.initialAtk = initialAtk;
        this.initialDef = initialDef;
        this._bitmap.texture = _bitmap.texture;
        tool.anch(this._bitmap);
    };
    return Property;
}());
egret.registerClass(Property,'Property');
//# sourceMappingURL=Property.js.map