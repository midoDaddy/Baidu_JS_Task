/*
* @Author: midoDaddy
* @Date:   2017-08-23 11:25:31
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-08-24 23:30:55
*/
var Commander = function(cfg) {
    this.count = 2;
    this.receiver = cfg.receiver;
    this.init();
}

//发送命令
Commander.prototype = {

    constructor: Commander,

    //初始化
    init: function() {
        var self = this;
        this.renderOrderBox();
    },

    //发送信号
    send: function(msg) {
        if (this.checkCommand(msg)) {
            this.receiver.receive(msg);
        }    
    },
    

    //创建新的操作命令行
    renderOrderBox: function(id) {
        var html = '';
        for (var i = 0; i < this.count; i++) {
            html += '<div class="command-item" id="ship-' + (i + 1) + '-commander">' +
                '<span class="command-item-label">对' + (i + 1) + '号飞船下达命令：</span>' +
                '<div class="btn start">开始飞行</div>' +
                '<div class="btn stop">停止飞行</div>' +
                '<div class="btn destroy">销毁</div>' +
            '</div>'
        }
        html += '<div class="command-item">' + 
                    '<div class="btn new">创建新飞船</div>' +
                '</div>';
        $('#command-wrapper').html(html);
    },

    //获取命令行对应的飞船id
    getShipId: function() {
        
    }

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








