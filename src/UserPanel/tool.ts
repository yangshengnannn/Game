class tool {
    public static anch(bitmap: egret.Bitmap) {
        bitmap.anchorOffsetX = bitmap.width / 2;
        bitmap.anchorOffsetY = bitmap.height / 2;
    }
    public static createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}