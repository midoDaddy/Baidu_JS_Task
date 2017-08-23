/*
* @Author: midoDaddy
* @Date:   2017-08-23 11:25:05
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-08-24 00:39:44
*/
var Mediator = function() {
    this.receivers = [];
}

Mediator.prototype = {

    constructor: Mediator,

    //注册对象
    register: function(obj) {
        if (this.receivers.indexOf(obj) < 0) {
            this.receivers.push(obj);
        } else {
            alert('该对象已注册');
        }        
    },

    //接收信号
    receive: function(msg) {
        if (msg.command === 'new') {
            var newShip = new Ship({
                id: msg.id
            });
            this.register(newShip);
        } else {
            this.send(msg);
        }
    },

    //发送信号
    send: function(msg) {
        this.receivers.forEach(function(item) {
            item.receive(msg);
        })
    }
}
