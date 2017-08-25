/*
* @Author: midoDaddy
* @Date:   2017-08-23 11:25:31
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-08-25 11:18:27
*/
var Commander = function(cfg) {
    this.cfg = {
        container: $('#command-wrapper'),
        receiver: null
    }
    this.shipArr = [];
    this.CFG = $.extend(this.cfg, cfg);
    this.init();
}

//发送命令
Commander.prototype = {

    constructor: Commander,

    //初始化
    init: function() {
        this.renderOrderBox();
        this.bindEvent();
    },
    

    //创建新的操作命令行
    renderOrderBox: function(id) {
        var html = '',
            shipArr = this.shipArr.sort();
        for (var i = 0; i < shipArr.length; i++) {
            html += '<div class="command-item" id="ship-' + shipArr[i] + '-commander">' +
                '<span class="command-item-label">对' + shipArr[i] + '号飞船下达命令：</span>' +
                '<div class="btn start">开始飞行</div>' +
                '<div class="btn stop">停止飞行</div>' +
                '<div class="btn destroy">销毁</div>' +
            '</div>'
        }
        html += '<div class="command-item">' + 
                    '<div class="btn new">创建新飞船</div>' +
                '</div>';
        this.CFG.container.html(html);
    },

    //发送信号
    send: function(msg) {
        this.CFG.receiver.receive(msg);
    },
    
    //创建新飞船命令
    orderNew: function() {       
        var shipNo = 1,
            shipArr = this.shipArr;
        if (shipArr.length >= 4) {
            alert('飞船数量已达上限');
            return false;
        }
        for (var i = 1; i < 5; i++) {
            if (shipArr.indexOf(i) < 0) {
                shipNo = i;
                this.shipArr.push(i);
                break;
            }
        }
        this.renderOrderBox();
        this.send({
            id: 'ship-' + shipNo,
            command: 'new'
        });
    },

    //销毁飞船命令
    orderDestroy: function(e) {
        var self = this,
            $target = $(e.target),
            shipId = this.getShipId($target),
            shipNo = parseInt(shipId.replace('ship-', ''), 10),
            shipIndex = this.shipArr.indexOf(shipNo);
            this.shipArr.splice(shipIndex, 1);
        this.renderOrderBox();
        this.send({
            id: shipId,
            command: 'destroy'
        });
    },

    //获取命令行对应的飞船id
    getShipId: function($btn) {
        return $btn.parents('.command-item').attr('id').replace('-commander', '');
    },

    //命令行绑定事件
    bindEvent: function() {
        var self = this,
            container = this.CFG.container;
        container.on('click', '.start', function() {
            self.send({
                id: self.getShipId($(this)),
                command: 'start'
            });
        });
        container.on('click', '.stop', function() {
            self.send({
                id: self.getShipId($(this)),
                command: 'stop'
            });
        });
        container.on('click', '.destroy', self.orderDestroy.bind(self));
        container.on('click', '.new', self.orderNew.bind(self));
    }
}








