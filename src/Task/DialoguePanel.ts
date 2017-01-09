class DialoguePanel extends egret.DisplayObjectContainer {
    private _textfield: egret.TextField;
    private _firstbutton: egret.Bitmap;
    private _giveUpButton: egret.Bitmap;
    private _returnButton: egret.Bitmap;
    private _background: egret.Bitmap;
    public _container: egret.DisplayObjectContainer;
    public static texturelist: { [index: string]: string } = {
        "接受": "UI01_png",
        "退出": "UI02_png",
        "提交": "UI03_png",
        "不能提交": "UI04_png",
        "放弃": "UI05_png",
        "不能放弃": "UI06_png",
        "不能接受": "UI07_png"
    }
    public constructor() {
        super();
        this._container = new egret.DisplayObjectContainer();
        this._container.width = 300;
        this._container.height = 425;
        this._container.x = 0;
        this._container.y = 0;
        this._textfield = new egret.TextField();
        this._textfield.size = 36;
        this._textfield.width = 220;
        this._textfield.height = 345;
        this._textfield.$setTextColor(0X00000);
        this._textfield.x = 40;
        this._textfield.y = 40;
        this._firstbutton = new egret.Bitmap();
        this._firstbutton.scaleX = 0.4;
        this._firstbutton.scaleY = 0.4;
        this._firstbutton.x = 40;
        this._firstbutton.y = 345;

        this._giveUpButton = new egret.Bitmap();
        this._giveUpButton.scaleX = 0.4;
        this._giveUpButton.scaleY = 0.4;
        this._giveUpButton.x = 110;
        this._giveUpButton.y = 345;

        this._returnButton = new egret.Bitmap();
        this._returnButton.scaleX = 0.4;
        this._returnButton.scaleY = 0.4;
        this._returnButton.x = 180;
        this._returnButton.y = 345;

        this._background = new egret.Bitmap();
        this._background.width = this._container.width;
        this._background.height = this._container.height;

        this._container.addChild(this._background);
        this._container.addChild(this._textfield);
        this._container.addChild(this._firstbutton);
        this._container.addChild(this._giveUpButton);
        this._container.addChild(this._returnButton);
        //this.addChild(this._container);
    }
    task:Task;
    public call(task: Task, fromself: boolean, toself: boolean) {
        this.task=task;
        this._background.texture = RES.getRes("Taskbg_png");
        //console.log("Dialogue.call");
        this._textfield.text = this.task.getname();
        this._textfield.text += "\n";
        this._textfield.text += this.task.getdris();
        //console.log(this._textfield.text);
        this._firstbutton.texture = RES.getRes(this.getfirsttexture(this.task, fromself, toself));
        this._giveUpButton.texture = RES.getRes(this.getGiveUpTexture(this.task, fromself, toself));
        this._returnButton.texture = RES.getRes(DialoguePanel.texturelist["退出"]);
        this.addChild(this._container);
        this.firstButtonlistener();
        this.giveUpButtonlistener(this.task, fromself, toself);
        this.returnButtonlistener();
    }
    private firstButtonlistener() {
        this._firstbutton.touchEnabled = true;
        this._firstbutton.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            if (this._firstbutton.texture == RES.getRes(DialoguePanel.texturelist["接受"])) {
                TaskService.getIntance().accept(this.task.getid());
                this._firstbutton.texture = RES.getRes(DialoguePanel.texturelist["不能接受"]);
                this._giveUpButton.texture = RES.getRes(DialoguePanel.texturelist["放弃"]);
                //console.log("任务接受");
                //console.log(task.getstatus());
            }
            if (this._firstbutton.texture == RES.getRes(DialoguePanel.texturelist["提交"])) {
                TaskService.getIntance().finish(this.task.getid());
                this._firstbutton.texture = RES.getRes(DialoguePanel.texturelist["不能提交"]);
                this._giveUpButton.texture = RES.getRes(DialoguePanel.texturelist["不能放弃"]);
                //console.log("任务完成");
                //console.log(task.getstatus());
                //this.call();
            }
        }, this)
    }
    private giveUpButtonlistener(task: Task, fromself: boolean, toself: boolean) {
        this._giveUpButton.touchEnabled = true;
        this._giveUpButton.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            if (this._giveUpButton.texture == RES.getRes(DialoguePanel.texturelist["放弃"])) {
                if (task.getstatus() == statusType.Working || task.getstatus() == statusType.Cancomplete) {
                    TaskService.getIntance().Canaccept(task.getid());
                    this._giveUpButton.texture = RES.getRes(DialoguePanel.texturelist["不能放弃"]);
                    if (fromself && !toself)
                        this._firstbutton.texture = RES.getRes(DialoguePanel.texturelist["接受"]);
                    if (toself && !fromself)
                        this._firstbutton.texture = RES.getRes(DialoguePanel.texturelist["不能提交"]);
                    if (toself && fromself)
                        this._firstbutton.texture = RES.getRes(DialoguePanel.texturelist["接受"]);
                    console.log("任务已放弃");
                    console.log(task.getstatus());
                }
            }
        }, this)
    }
    private returnButtonlistener() {
        this._returnButton.touchEnabled = true;
        this._returnButton.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.addChild(this._container);//不确定上一次移除了几次，再加一个然后remove
            this.removeChild(this._container);
        }, this)
    }

    private getfirsttexture(task: Task, fromself: boolean, toself: boolean): string {
        var str: string;
        if (task.getstatus() == statusType.Acceptable && fromself)
            str = DialoguePanel.texturelist["接受"];
        if (task.getstatus() == statusType.Working && fromself)
            str = DialoguePanel.texturelist["不能接受"];
        if (task.getstatus() == statusType.Unacceptable && fromself)
            str = DialoguePanel.texturelist["不能接受"];
        if (task.getstatus() == statusType.Cancomplete && fromself)
            str = DialoguePanel.texturelist["不能接受"];

        if (task.getstatus() == statusType.Cancomplete && toself)
            str = DialoguePanel.texturelist["提交"];
        if (task.getstatus() == statusType.Working && toself)
            str = DialoguePanel.texturelist["不能提交"];
        if (task.getstatus() == statusType.Acceptable && toself)
            str = DialoguePanel.texturelist["不能提交"];
        if (task.getstatus() == statusType.Unacceptable && toself)
            str = DialoguePanel.texturelist["不能提交"];
        return str;
    }
    private getGiveUpTexture(task: Task, fromself: boolean, toself: boolean): string {
        var str: string;
        if (fromself) {
            if (task.getstatus() == statusType.Acceptable && fromself)
                str = DialoguePanel.texturelist["不能放弃"];
            // if(task.getstatus()==statusType.Acceptable && !fromself)
            //     str=DialoguePanel.texturelist["不能放弃"];
            if (task.getstatus() == statusType.Working && fromself)
                str = DialoguePanel.texturelist["放弃"];
            // if(task.getstatus()==statusType.Working && !fromself)
            //     str=DialoguePanel.texturelist["不能放弃"];
            if (task.getstatus() == statusType.Cancomplete && fromself)
                str = DialoguePanel.texturelist["放弃"];
            // if(task.getstatus()==statusType.Cancomplete && !fromself)
            //     str=DialoguePanel.texturelist["不能放弃"];
        }
        if (toself) {
            if (task.getstatus() == statusType.Acceptable && toself)
                str = DialoguePanel.texturelist["不能放弃"];
            if (task.getstatus() == statusType.Working && toself)
                str = DialoguePanel.texturelist["放弃"];
            // if(task.getstatus()==statusType.Working && !toself)
            //     str=DialoguePanel.texturelist["不能放弃"];
            if (task.getstatus() == statusType.Cancomplete && toself)
                str = DialoguePanel.texturelist["放弃"];
            // if(task.getstatus()==statusType.Cancomplete && !toself)
            //     str=DialoguePanel.texturelist["不能放弃"];
        }
        return str;
    }
}