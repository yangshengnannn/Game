var HeroStatusBar = (function (_super) {
    __extends(HeroStatusBar, _super);
    function HeroStatusBar() {
        var _this = this;
        _super.call(this);
        this.gridX = 90;
        this.gridY = 60;
        this.gridOffset = 10;
        this.container = new egret.DisplayObjectContainer();
        //this.addChild(this.container);
        this.background = new egret.Bitmap();
        this.scaleX = 1.2;
        this.scaleY = 1.2;
        this.container.addChild(this.background);
        this.role = new egret.Bitmap();
        this.role.x = 30;
        this.role.y = 30;
        this.role.scaleX = 0.7;
        this.role.scaleY = 0.7;
        this.container.addChild(this.role);
        this.barname = new egret.TextField();
        this.barname.textColor = 0X000000;
        this.barname.y = 240;
        this.barname.x = 50;
        this.container.addChild(this.barname);
        this.equipmentField = new egret.DisplayObjectContainer();
        this.initEquipmentField();
        this.equipmentField.x = 50;
        this.equipmentField.y = 20;
        this.container.addChild(this.equipmentField);
        this.propertyField = new egret.DisplayObjectContainer();
        this.propertyField.x = 120;
        this.propertyField.y = 120;
        this.container.addChild(this.propertyField);
        var returnButton = new egret.Bitmap();
        returnButton.texture = RES.getRes("return_png");
        tool.anch(returnButton);
        returnButton.x = 370;
        returnButton.y = 210;
        this.container.addChild(returnButton);
        returnButton.touchEnabled = true;
        returnButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.removeChild(_this.container);
        }, this);
    }
    var d = __define,c=HeroStatusBar,p=c.prototype;
    p.initPropertyField = function (hero) {
        var level = new egret.TextField();
        level.text = "Level:  " + hero.level.toString();
        level.textColor = 0X000000;
        level.scaleX = 0.7;
        level.scaleY = 0.7;
        this.propertyField.addChild(level);
        var quality = new egret.TextField();
        quality.text = "Quality:  " + heroQualitySort[hero.quality];
        quality.textColor = 0X000000;
        quality.x = 110;
        quality.scaleX = 0.7;
        quality.scaleY = 0.7;
        this.propertyField.addChild(quality);
        var atk = new egret.TextField();
        atk.text = hero.properties.atkDiscript + hero.Atk.toString();
        atk.textColor = 0X000000;
        atk.y = 50;
        atk.scaleX = 0.7;
        atk.scaleY = 0.7;
        this.propertyField.addChild(atk);
        var def = new egret.TextField();
        def.text = hero.properties.defDiscript + hero.Def.toString();
        def.textColor = 0X000000;
        def.x = 110;
        def.y = 50;
        def.scaleX = 0.7;
        def.scaleY = 0.7;
        this.propertyField.addChild(def);
        var FightPower = new egret.TextField();
        FightPower.text = "FighrPower:   " + hero.fightPower.toString();
        FightPower.textColor = 0X000000;
        FightPower.y = 100;
        FightPower.scaleX = 0.7;
        FightPower.scaleY = 0.7;
        this.propertyField.addChild(FightPower);
    };
    p.initEquipmentField = function () {
        this.grids = [];
        for (var i = 0; i < Hero.equipmentLimit; i++) {
            var grid = new ObjectGrid();
            this.grids.push(grid);
        }
        this.grids[0].x = this.gridX;
        this.grids[0].y = this.gridY;
        this.equipmentField.addChild(this.grids[0]);
        for (var i = 1; i < Hero.equipmentLimit; i++) {
            this.grids[i].x = this.grids[i - 1].x + this.grids[i].width + this.gridOffset;
            this.grids[i].y = this.gridY;
            this.equipmentField.addChild(this.grids[i]);
        }
    };
    p.setInformation = function (hero) {
        this.background.texture = RES.getRes("bg_png");
        this.role.texture = hero.properties._bitmap.texture;
        tool.anch(this.role);
        this.role.x = 90;
        this.role.y = 160;
        this.barname.text = hero.name;
        this.initPropertyField(hero);
        for (var i = 0; i < hero.equipmentCurrent; i++) {
            this.grids[i].call(hero.equipments[i]);
        }
        for (var i = 0; i < hero.equipmentCurrent; i++) {
            this.grids[i].Tap();
        }
        this.addChild(this.container);
    };
    return HeroStatusBar;
}(egret.DisplayObjectContainer));
egret.registerClass(HeroStatusBar,'HeroStatusBar');
var ObjectGrid = (function (_super) {
    __extends(ObjectGrid, _super);
    function ObjectGrid() {
        _super.call(this);
        this.border = new egret.Bitmap();
        this.addChild(this.border);
        this.contentBitmap = new egret.Bitmap();
        this.addChild(this.contentBitmap);
        this.border.texture = RES.getRes("Border_png");
        tool.anch(this.border);
    }
    var d = __define,c=ObjectGrid,p=c.prototype;
    p.call = function (content) {
        this.content = content;
        this.contentBitmap.texture = content.properties._bitmap.texture;
        tool.anch(this.contentBitmap);
        var scale = this.border.texture.textureWidth / this.contentBitmap.texture.textureWidth;
        this.contentBitmap.scaleX = scale;
        this.contentBitmap.scaleY = scale;
        //console.log(scale);
    };
    p.Tap = function () {
        var _this = this;
        var details = new Details();
        this.contentBitmap.touchEnabled = true;
        this.contentBitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            details.setInformation(_this.content);
            //this.addChild(details);
            GameManager.getInstance().UIManager.addLayer(LayerType.DetailLayer, details);
            //this.swapChildren(details,content.parent)
            //console.log("123456789123446587");
        }, this);
    };
    return ObjectGrid;
}(egret.DisplayObjectContainer));
egret.registerClass(ObjectGrid,'ObjectGrid');
//# sourceMappingURL=heroStatusBar.js.map