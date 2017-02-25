
function Character(game, asset) {

    this.goF = false;
    this.goB = false;
    this.jump = false;
    this.k = false;
    this.lightB = false;
    this.middleB = false;
    this.lightK = false;
    this.heavyK = false;
    this.y = 400;
    this.speed = 300;
    this.game = game;
    this.ctx = game.ctx;
    this.animation = new Animation(asset.getAsset("./RYU/right/wait.gif"), 62, 93, 6, 0.10, 6, true, 3);
    this.goForward = new Animation(asset.getAsset("./RYU/right/goForward.gif"), 66, 92, 6, 0.25, 6, true, 3);
    this.goBack = new Animation(asset.getAsset("./RYU/right/goBack.gif"), 63.4, 91, 6, 0.25, 6, true, 3);
    this.lightBoxing = new Animation(asset.getAsset("./RYU/right/lightBoxing.gif"), 94, 91, 3, 0.12, 3, false, 3);
    this.middleBoxing = new Animation(asset.getAsset("./RYU/right/middleBoxing.gif"), 115, 95, 5, 0.12, 5, false, 3);
    this.heavyKick = new Animation(asset.getAsset("./RYU/right/heavyKick.gif"), 122, 94, 5, 0.12, 5, false, 3);
    this.lightKick = new Animation(asset.getAsset("./RYU/right/lightKick.gif"), 116, 94, 5, 0.12, 5, false, 3);
    this.jumpUp = new Animation(asset.getAsset("./RYU/right/jumpUp.gif"), 58, 109, 8, 0.12, 8, false, 3);
    this.x = 600;

}

Character.prototype.draw = function () {
    if (this.jump){
        this.jumpUp.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }else if (this.middleB){
        this.middleBoxing.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }else if (this.lightB){
        this.lightBoxing.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }else if (this.heavyK){
        this.heavyKick.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }else if (this.lightK){
        this.lightKick.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }else if (this.goF){
        this.goForward.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }else if (this.goB){
        this.goBack.drawFrame(this.game.clockTick, this.ctx, this.x , this.y);
    }else {
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }
}

Character.prototype.update = function () {

    if (this.game.w){
        this.jump = true;
    } else if (this.game.j){
        this.lightB = true;
    } else if (this.game.k){
        this.middleB = true;
    } else if (this.game.u){
        this.lightK = true;
    } else if (this.game.i){
        this.heavyK = true;
    } else {
        if (this.game.d){
            this.goF = true;
            if (this.animation.elapsedTime < this.animation.totalTime)
                this.x += this.game.clockTick * this.speed;
        }else{
            this.goF = false;
        }
        if (this.game.a){
            this.goB = true;
            if (this.animation.elapsedTime < this.animation.totalTime && this.x > 0)
                this.x -= this.game.clockTick * this.speed;
        } else {
            this.goB = false;
        }
    }

    if (this.jump){
        if (this.jumpUp.isDone()){
            this.y -= 8;
            this.jumpUp.elapsedTime = 0;
            this.jump = false;
        }
        var jumpDistance = this.jumpUp.elapsedTime / this.jumpUp.totalTime;
        var totalHeight = 200;

        if (jumpDistance > 0.5)
            jumpDistance = 1 - jumpDistance;

        var height = totalHeight*(-4 * (jumpDistance * jumpDistance - jumpDistance));
        this.y = 400 - height;
    } else {
        if (this.heavyK){
            if (this.heavyKick.isDone()){
                this.heavyKick.elapsedTime = 0;
                this.heavyK = false;
            }
        }
        if (this.lightK){
            if (this.lightKick.isDone()){
                this.lightKick.elapsedTime = 0;
                this.lightK = false;
            }
        }
        if (this.lightB){
            if (this.lightBoxing.isDone()){
                this.lightBoxing.elapsedTime = 0;
                this.lightB = false;
            }
        }
        if (this.middleB){
            if (this.middleBoxing.isDone()){
                this.middleBoxing.elapsedTime = 0;
                this.middleB = false;
            }
        }
    }
}