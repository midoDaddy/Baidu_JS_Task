/*
* @Author: midoDaddy
* @Date:   2017-08-22 17:06:26
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-08-22 18:06:50
*/

function Wall(cfg) {
    this.cfg = {
        className: 'wall',
        container: null,
        targetCar: null,
    }
    this.CFG = extend(this.cfg, cfg);
    this.wallArr = [];
}

//在car指向的方向修建一格墙
Wall.prototype.buildForwardWall = function() {
    var pos = this.getForwardPos(),
        x = pos.x,
        y = pos.y; 
    if (this.getWall(x, y)) {
        alert('墙已存在，不能重建');
    } else if (this.checkWallOut(x, y)) {
        this.createWall(x, y);
    }        
},

//获取前进方向前面一格的坐标
Wall.prototype.getForwardPos = function() {
    var y = parseInt(this.CFG.targetCar.obj.style.top, 10),
        x = parseInt(this.CFG.targetCar.obj.style.left, 10),
        deg = this.CFG.targetCar.getDeg();
    switch(deg % 360) {
        case 90:
        case -270: x += 50;
            break;
        case 180:
        case -180: y += 50;
            break;
        case 270:
        case -90: x -= 50;
            break;
        case 0:
        case -0: y -= 50;
            break;
    }        
    return {x: x, y: y}
},

//检验目标位置是否超出边界
Wall.prototype.checkWallOut = function(x, y) {
    if (x > 450 || x < 0 || y > 450 || y < 0) {
        alert('超出边界，无法造墙');
        return false;
    }
    return true;
},

//获取目标位置的墙
Wall.prototype.getWall = function(x, y) {
    var target = null;        
    this.wallArr.forEach(function(item) {
        if (parseInt(item.style.top, 10) === y && parseInt(item.style.left, 10) === x) {
            target = item;
        }
    });
    return target;
}, 

//生成特定位置的墙
Wall.prototype.createWall = function(x, y) {
    var wall = document.createElement('div');
    this.CFG.container.appendChild(wall);
    wall.className = this.CFG.className;
    wall.style.top = y + 'px';
    wall.style.left = x + 'px';
    this.wallArr.push(wall);
},

//粉刷car所指方向相邻的墙
Wall.prototype.brushWall = function(order) {
    var color = order.replace(/^BRU\s/, ''),
        pos = this.getForwardPos(),
        x = pos.x
        y = pos.y,
        targetWall = this.getWall(x, y);
    targetWall ? (targetWall.style.background = color) : alert('目标方向前方没有墙');
},

//随机生成墙
Wall.prototype.createRandomWall = function(n) {
    for (var i = 0; i < n; i++) {
        var x = Math.floor(Math.random()*10)*50,
            y = Math.floor(Math.random()*10)*50;
        if (!this.getWall(x, y)) {
            this.createWall(x, y);
        } else {
            i--;
        }
    }
}