/*
* @Author: midoDaddy
* @Date:   2017-08-23 11:25:31
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-08-24 00:38:16
*/
var Commander = function(cfg) {
    this.idArr = [];
    this.commands = ['stop', 'start', 'destroy', 'new'];
    this.receiver = cfg.receiver;
    this.init();
}

//发送命令
Commander.prototype = {

    constructor: Commander,

    //初始化
    init: function() {
        var self = this;
        $('#command-wrapper').on('click', '.new', function() {
            var id = 'ship-' + (self.idArr.length + 1);
            self.idArr.push(id);
            self.createOrderBox(id);
            self.send({
                command: 'new',
                id: id
            })
        })
    },

    //发送信号
    send: function(msg) {
        if (this.checkCommand(msg)) {
            this.receiver.receive(msg);
        }    
    },
    
    //检查命令的有效性
    checkCommand: function(msg) {
        var command = msg.command,
            id = msg.id,
            idArr = this.idArr
            length = idArr.length;
        /*if (command === 'new') {
            if (length >= 4) {
                alert('飞船已达上限');
                return false;
            } else if (idArr.indexOf(id) >= 0) {
                alert('已存在相同的飞船');
                return false;
            } else {
                this.idArr.push(id);
            } 
        } else {
            if (length < 0) {
                alert('没有飞船');
                return false;
            }
            if (idArr.indexOf(id) < 0) {
                alert('未发现目标飞船');
                return false;
            } 
        }*/
        return true;
    },

    //创建新的操作命令行
    createOrderBox: function(id) {
        var count = this.idArr.length;        
        var $commandItem = 
            $('<div class="command-item" id="' + id + '">' +
                '<span class="command-item-label">对' + count + '号飞船下达命令：</span>' +
                '<div class="btn start">开始飞行</div>' +
                '<div class="btn stop">停止飞行</div>' +
                '<div class="btn destroy">销毁</div>' +
            '</div>')
            .appendTo('#command-wrapper');
        this.bindEvent($commandItem);       
    },

    //命令行绑定事件
    bindEvent: function($commandItem) {
        var self = this,
            id = $commandItem.attr('id');
        $commandItem.on('click', '.start', function() {
            self.send({
                id: id,
                command: 'start'
            });
        });
        $commandItem.on('click', '.stop', function() {
            self.send({
                id: id,
                command: 'stop'
            });
        });
        $commandItem.on('click', '.destroy', function() {
            self.send({
                id: id,
                command: 'destroy'
            });
        });
    }
}








