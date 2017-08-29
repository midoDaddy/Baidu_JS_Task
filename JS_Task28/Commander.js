/*
* @Author: midoDaddy
* @Date:   2017-08-23 11:25:31
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-08-29 15:17:42
*/
var Commander = function(cfg) {
    this.cfg = {
        newOrderCon: $('#command-wrapper-new'),
        otherOrderCon: $('#command-wrapper-others'),
        receiver: bus
    }
    this.data = {};
    this.data.shipData = {};
    this.data.shipArr = [];
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
            shipArr = this.data.shipArr.sort();
        for (var i = 0; i < shipArr.length; i++) {
            html += '<div class="command-item" id="ship-' + shipArr[i] + '-commander">' +
                '<span class="command-item-label">对' + shipArr[i] + '号飞船下达命令：</span>' +
                '<div class="btn start">开始飞行</div>' +
                '<div class="btn stop">停止飞行</div>' +
                '<div class="btn destroy">销毁</div>' +
            '</div>'
        }
        this.CFG.otherOrderCon.html(html);
    },
 
    //创建新飞船命令
    orderNew: function() {       
        var shipNo = 1,
            shipArr = this.data.shipArr;
        if (shipArr.length >= 4) {
            alert('飞船数量已达上限');
            return false;
        }
        for (var i = 1; i < 5; i++) {
            if (shipArr.indexOf(i) < 0) {
                shipNo = i;
                this.data.shipArr.push(i);
                break;
            }
        }
        this.renderOrderBox();
        this.getParam($('.power-system-select:checked').val());
        this.getParam($('.energy-system-select:checked').val());
        this.send({
            id: 'ship-' + shipNo,
            command: 'new',
            speed: this.data.speed,
            energyAddRate: this.data.energyAddRate,
            energyReduceRate: this.data.energyReduceRate
        });
        this.data.shipData['ship-' + shipNo] = {
            powerSystem: this.data.powerSystem || '默认',
            energySystem: this.data.energySystem || '默认',
            state: '',
            energyLeft: ''
        }
    },
   
    //获取配置参数
    getParam: function(value) {
        switch(value) {
            case 'power-system-1': 
                this.data.speed = 30;
                this.data.energyReduceRate = 0.05;
                this.data.powerSystem = '前进号';
                break;
            case 'power-system-2': 
                this.data.speed = 50;
                this.data.energyReduceRate = 0.07;
                this.data.powerSystem = '奔腾号';
                break;
            case 'power-system-3': 
                this.data.speed = 80;
                this.data.energyReduceRate = 0.09;
                this.data.powerSystem = '超越号';
                break;
            case 'energy-system-1': 
                this.data.energyAddRate = 0.02;
                this.data.energySystem = '劲量型';
                break;
            case 'energy-system-2': 
                this.data.energyAddRate = 0.03;
                this.data.energySystem = '光能型';
                break;
            case 'energy-system-3': 
                this.data.energyAddRate = 0.04;
                this.data.energySystem = '永久型';
                break;
        }
    },

     //销毁飞船命令
    orderDestroy: function(e) {
        var self = this,
            $target = $(e.target),
            shipId = this.getShipId($target),
            shipNo = parseInt(shipId.replace('ship-', ''), 10),
            shipIndex = this.data.shipArr.indexOf(shipNo);
        this.data.shipArr.splice(shipIndex, 1);
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


    //将JSON数据转化为二进制格式
    sendAdapter: function(data) {
        var msg = '';
        if (typeof data !== 'object') {
            return false;
        }
        switch(data.id) {
            case 'ship-1': msg += '0001';
                break;
            case 'ship-2': msg += '0010';
                break;
            case 'ship-3': msg += '0011';
                break;
            case 'ship-4': msg += '0100';
                break;
            default: msg += '0000';
                break;
        }
        switch(data.command) {
            case 'new': msg += '0001';
                break;
            case 'start': msg += '0010';
                break;
            case 'stop': msg += '0011';
                break;
            case 'destroy': msg += '0100';
                break;
            default: msg += '0000';
                break;
        }
        switch(data.speed) {
            case 30: msg += '0001';
                break;
            case 50: msg += '0010';
                break;
            case 80: msg += '0011';
                break;
            default: msg += '0000';
                break;
        }
        switch(data.energyReduceRate) {
            case 0.05: msg += '0001';
                break;
            case 0.07: msg += '0010';
                break;
            case 0.09: msg += '0011';
                break;
            default: msg += '0000';
                break;
        }
        switch(data.energyAddRate) {
            case 0.02: msg += '0001';
                break;
            case 0.03: msg += '0010';
                break;
            case 0.04: msg += '0011';
                break;
            default: msg += '0000';
                break;
        }
        return msg;
    },

    //发送信号
    send: function(msg) {
        this.CFG.receiver.receive(this.sendAdapter(msg), 'commander');
    },
    

    //将二进制格式数据转化为JSON
    receiveAdapter: function(data) {
        var id, state, energyLeft;
        if (typeof data !== 'string') {
            return false;
        }
        switch(data.slice(0, 4)) {
            case '0001': id = 'ship-1';
                break;
            case '0010': id = 'ship-2';
                break;
            case '0011': id = 'ship-3';
                break;
            case '0100': id = 'ship-4';
                break;
        }
        switch(data.slice(4, 8)) {
            case '0001': state = '飞行中';
                break;
            case '0010': state = '停止飞行';
                break;
            case '0011': state = '即将销毁';
                break;
        }
        energyLeft = parseInt(data.slice(8, 16), 2) + '%';
        return {
            id: id,
            state: state,
            energyLeft: energyLeft
        }
    },

    //接收信号
    receive: function(msg) {
        var data = this.receiveAdapter(msg);
        if (data.state === '即将销毁') {
            delete this.data.shipData[data.id];
        } else if (this.data.shipData[data.id].state === data.state 
            && this.data.shipData[data.id].energyLeft === data.energyLeft) {
            return
        } else {
            this.data.shipData[data.id].state = data.state;
            this.data.shipData[data.id].energyLeft = data.energyLeft;
        }       
        this.renderShipStatus();
    },
    
    //渲染飞船状态数据
    renderShipStatus: function() {
        var html = '<tr><th>飞船</th><th>动力系统</th><th>能源系统</th><th>当前飞行状态</th><th>剩余能耗</th></tr>',
            shipData = this.data.shipData;
        for (var item in shipData) {
            var value = shipData[item];
            html += '<tr>' + 
                        '<td>'+ item.replace('ship-', '') + '号 </td>' +
                        '<td>' + value.powerSystem + '</td>' +
                        '<td>' + value.energySystem + '</td>' +
                        '<td>' + value.state + '</td>' +
                        '<td>' + value.energyLeft + '</td>' +
                    '</tr>'
        }
        $('#ship-info-table').html(html);
    },


    //命令按钮绑定事件
    bindEvent: function() {
        var self = this,
            otherOrderCon = this.CFG.otherOrderCon;
        otherOrderCon.on('click', '.start', function() {
            self.send({
                id: self.getShipId($(this)),
                command: 'start'
            });
        });
        otherOrderCon.on('click', '.stop', function() {
            self.send({
                id: self.getShipId($(this)),
                command: 'stop'
            });
        });
        otherOrderCon.on('click', '.destroy', self.orderDestroy.bind(self));
        this.CFG.newOrderCon.on('click', '.new', self.orderNew.bind(self));
    }
}

var commander = new Commander();








