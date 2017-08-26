/*
* @Author: midoDaddy
* @Date:   2017-08-23 11:24:45
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-08-26 09:48:22
*/
var Ship = function(cfg) {
    this.cfg = {
        id: 'ship-1',
        radius: 150,
        container: $('#planet'),
        energyLeft: 1,
        startDeg: 0,
        className: 'ship',
        speed: 50,
        energyAddRate: 0.02,
        energyReduceRate: 0.03 
    } 
    cfg = this.adapter(cfg);
    this.CFG = $.extend(this.cfg, cfg);
    this.energyLeft = this.CFG.energyLeft;
    this.deg = this.CFG.startDeg;
    this.init();
}

Ship.prototype = {
    constructor: Ship,
    
    //初始化
    init: function() {
        this.create();
        this.updateEnergyInfo();
        this.updatePos();
    },
    
    //创建新飞船
    create: function() {
        var CFG = this.CFG,
            infoTxt = CFG.index + '号船';
        this.shipObj = $('<div id="' + CFG.id + '"></div>')
            .addClass(CFG.className)
            .appendTo(CFG.container);
        this.progressBar = $('<div></div>').appendTo(this.shipObj);
        this.infoTxt = $('<span></span>').appendTo(this.shipObj);
    },

    //更新位置信息
    updatePos: function() {
        var CFG = this.CFG,
            radius = CFG.radius,
            deg = this.deg,
            radian = deg*2*(Math.PI)/360,
            top = 100 - radius*Math.cos(radian) + 'px',
            left = 100 + radius*Math.sin(radian) + 'px';
        this.shipObj.css({
            transform: 'rotate(' + deg + 'deg)',
            top: top,
            left: left
        });
    },

    //更新能源信息
    updateEnergyInfo: function() {
        var CFG = this.CFG,
            progressWidth = this.shipObj.width()*(this.energyLeft);
        this.progressBar.width(progressWidth);
        this.infoTxt.text(CFG.id.replace('ship-', '') + '号船-' + Math.round(this.energyLeft*100) + '%');
    },

    //开始运行
    go: function() {
        var CFG = this.CFG,
            self = this,
            degSpeed = CFG.speed*360/(2*Math.PI*CFG.radius);
        if (this.state === 'go') {
            return;
        } else {
            this.state = 'go';
        }
        this.stopTimer && clearInterval(this.stopTimer);
        this.goTimer = setInterval(function(){
            self.deg = self.deg + degSpeed/50;
            self.energyLeft = self.energyLeft - (CFG.energyReduceRate - CFG.energyAddRate)/50;
            self.updatePos();
            self.updateEnergyInfo();
            if (self.energyLeft < 0) {
                self.energyLeft = 0;
                self.stop();
            }
        }, 20);  
    },

    //停止运行
    stop: function() {
        var self = this;
        if (this.state === 'stop') {
            return;
        } else {
            this.state = 'stop';
        }
        this.goTimer && clearInterval(this.goTimer);
        this.stopTimer = setInterval(function() {
            self.energyLeft = self.energyLeft + self.CFG.energyAddRate/10;
            self.updateEnergyInfo();
            if (self.energyLeft > 1) {
                self.energyLeft = 1;
                clearInterval(self.stopTimer);
            }
        }, 100);
    },

    //销毁
    destroy: function() {
        this.shipObj.remove();
    },

    //二进制数据格式转化为JSON格式
    adapter: function(msg) {
        if (typeof msg !== 'string') {
            return false;
        }
        var id, command, speed, energyReduceRate, energyAddRate;
        switch(msg.slice(0, 4)) {
            case '0001': id = 'ship-1';
                break;
            case '0010': id = 'ship-2';
                break;
            case '0011': id = 'ship-3';
                break;
            case '0100': id = 'ship-4';
                break;
        }
        switch(msg.slice(4, 8)) {
            case '0001': command = 'new';
                break;
            case '0010': command = 'start';
                break;
            case '0011': command = 'stop';
                break;
            case '0100': command = 'destroy';
                break;
        }
        switch(msg.slice(8, 12)) {
            case '0001': speed = 30;
                break;
            case '0010': speed = 50;
                break;
            case '0011': speed = 80;
                break;
        }
        switch(msg.slice(12, 16)) {
            case '0001': energyReduceRate = 0.05;
                break;
            case '0010': energyReduceRate = 0.07;
                break;
            case '0011': energyReduceRate = 0.09;
                break;
        }
        switch(msg.slice(16, 20)) {
            case '0001': energyAddRate = 0.02;
                break;
            case '0010': energyAddRate = 0.03;
                break;
            case '0011': energyAddRate = 0.04;
                break;
        }
        return {
            id: id,
            command: command,
            speed: speed,
            energyReduceRate: energyReduceRate,
            energyAddRate: energyAddRate,
            radius: 100 + parseInt(msg.slice(0, 4), 2)*40
        }
    },

    //信号接收
    receive: function(data) {
        var msg = this.adapter(data),
            id = msg.id,
            command = msg.command;
        if (id === this.CFG.id) {
            switch(command) {
                case 'stop': this.stop();
                    break;
                case 'start': this.go();
                    break;
                case 'destroy': this.destroy();
                    break;
            }
        }
    }

}