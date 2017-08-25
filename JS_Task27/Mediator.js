/*
* @Author: midoDaddy
* @Date:   2017-08-23 11:25:05
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-08-25 17:16:29
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
        this.addLog({
            from: 'Commander',
            type: msg.command,
            id: msg.id,
        })
        this.send(msg);
    },

    //发送信号
    send: function(msg) {
        var self = this,
            random = Math.random();
        setTimeout(function(){
            if (random >= 0.3) {
                if (msg.command === 'new') {                
                    self.register(msg.id);
                }                   
                self.receivers.forEach(function(item) {
                    item.receive(msg);
                });                
                self.addLog({
                    from: 'Mediator',
                    id: msg.id,
                    type: msg.command,
                    status: 'success'
                });
            } else {
                self.addLog({
                    from: 'Mediator',
                    id: msg.id,
                    type: msg.command,
                    status: 'error'
                });
            }
        }, 1000);  
    },

    //添加log
    addLog: function(logMsg) {
        this.logData.push(logMsg);
        this.renderLog();
    },

    //渲染log
    renderLog: function() {
        var html = '',
            content = '';
        this.logData.forEach(function(item, index){
            var shipNo = item.id.replace('ship-', ''),
                publicMsg = item.from + ': ' + shipNo + '号船' + item.type;
            if (item.from === 'Commander') {
                html += '<li class="log-item">' + publicMsg + '命令发送成功</li>';
            } else if (item.status === 'success') {
                html += '<li class="log-item success">' + publicMsg + '命令传输成功</li>';
            } else {
                html += '<li class="log-item error">' + publicMsg + '命令丢包，传输失败</li>';
            }
        });
        this.logContainer.html(html);
        this.logContainer.scrollTop(this.logContainer[0].scrollHeight);
    }
}
