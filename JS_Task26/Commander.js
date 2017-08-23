/*
* @Author: midoDaddy
* @Date:   2017-08-23 11:25:31
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-08-23 23:34:37
*/
var Commander = function(cfg) {
    this.idArr = [];
    this.commands = ['stop', 'start', 'destroy', 'new'];
    this.receiver = cfg.receiver;
}

//发送命令
Commander.prototype = {

    constructor: Commander,

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
        if (this.commands.indexOf(command) < 0) {
            alert('无效指令');
            return false;
        } else if (command === 'new') {
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
        }
        return true;
    }

}








