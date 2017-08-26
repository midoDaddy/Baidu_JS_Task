/*
* @Author: midoDaddy
* @Date:   2017-08-23 11:25:05
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-08-26 09:46:42
*/
var Bus = function() {
    this.receivers = [];
    this.logData = [];
    this.logContainer = $('#log-list');
}

Bus.prototype = {

    constructor: Bus,

    //注册对象
    register: function(data) {  
        var newShip = new Ship(data);     
        this.receivers.push(newShip);    
    },

    //接收信号
    receive: function(data) {
        this.addLog({
            from: 'Commander',
            type: data.slice(4, 8),
            id: data.slice(0, 4),
        });
        this.send(data);
    },

    //发送信号
    send: function(data) {
        var self = this;
        var sendRepeator = function(){
            var random = Math.random();
            if (random >= 0.1) {
                if (data.slice(4, 8) === '0001') {                
                    self.register(data);
                }                   
                self.receivers.forEach(function(item) {
                    item.receive(data);
                });                
                self.addLog({
                    from: 'Bus',
                    id: data.slice(0, 4),
                    type: data.slice(4, 8),
                    status: 'success'
                });
            } else {
                self.addLog({
                    from: 'Bus',
                    id: data.slice(0, 4),
                    type: data.slice(4, 8),
                    status: 'error'
                });
                sendRepeator();
            }
        }
        setTimeout(sendRepeator, 300);  
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
            var publicMsg = item.from + ': ' + item.id + '号船' + item.type;
            if (item.from === 'Commander') {
                html += '<li class="log-item">' + publicMsg + '命令发送成功</li>';
            } else if (item.status === 'success') {
                html += '<li class="log-item success">' + publicMsg + '命令传输成功</li>';
            } else {
                html += '<li class="log-item error">' + publicMsg + '命令丢包，尝试再次传输</li>';
            }
        });
        this.logContainer.html(html);
        this.logContainer.scrollTop(this.logContainer[0].scrollHeight);
    }
}
