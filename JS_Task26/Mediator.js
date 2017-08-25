/*
* @Author: midoDaddy
* @Date:   2017-08-23 11:25:05
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-08-25 14:32:28
*/
var Mediator = function() {
    this.receivers = [];
    this.logData = [];
    this.logContainer = $('#log-list');
}

Mediator.prototype = {

    constructor: Mediator,

    //注册对象
    register: function(id) {  
        var radius = 100 + parseInt(id.replace('ship-', ''), 10)*40;
        var newShip = new Ship({
            id: id,
            radius: radius
        });     
        this.receivers.push(newShip);    
    },

    //接收信号
    receive: function(msg) {
        this.send(msg);
    },

    //发送信号
    send: function(msg) {
        var self = this,
            random = Math.random();
        if (random >= 0.3) {
            if (msg.command === 'new') {                
                this.register(msg.id);
            }   
            setTimeout(function(){
                self.receivers.forEach(function(item) {
                    item.receive(msg);
                });
            }, 1000)
            this.addLog({
                id: msg.id,
                type: msg.command,
                status: 'success'
            });
        } else {
            this.addLog({
                id: msg.id,
                type: msg.command,
                status: 'error'
            });
        }        
    },

    //添加log
    addLog: function(logMsg) {
        this.logData.push(logMsg);
        this.renderLog();
    },

    //渲染log
    renderLog: function() {
        var html = '';
        this.logData.forEach(function(item, index){
            if (item.status === 'success') {
                html += '<li class="log-item success">' + item.id + ': ' + item.type + '命令发送成功</li>';
            } else {
                html += '<li class="log-item error">' + item.id + ': ' + item.type + '命令发送失败</li>';
            }
        });
        this.logContainer.html(html);
    }
}
