class Property {
    configId: string;
    identityID: number = 0;
    name: string;
    initialAtk: number = 0;
    initialDef: number = 0;
    _bitmap: egret.Bitmap;
    get atkDiscript() {
        return "ATK:   ";
    }

    get defDiscript() {
        return "DEF:   ";
    }
    constructor() {
        this._bitmap = new egret.Bitmap();
        this._bitmap = new egret.Bitmap();
        this._bitmap.scaleX = 1.5;
        this._bitmap.scaleY = 1.5;
        this._bitmap.x = 0;
        this._bitmap.y = 0;
    }
    setInformation(configId: string, identityID: number,
                     name: string, initialAtk: number,
                     initialDef: number, _bitmap: egret.Bitmap) {
        this.configId = configId;
        this.identityID = identityID;
        this.name = name;
        this.initialAtk = initialAtk;
        this.initialDef = initialDef;
        this._bitmap.texture = _bitmap.texture;
        tool.anch(this._bitmap);
    }
}