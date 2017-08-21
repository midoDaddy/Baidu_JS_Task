/*
* @Author: 63431
* @Date:   2017-08-16 15:24:28
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-08-21 16:53:46
*/


//定义表单项构造函数
function OrderInput(cfg) {
    this.cfg = {
        inputBox: null,
        indexList: null,
        validOrder: null,
        errorClass: 'error',
        orderTarget: null
    };
    this.CFG = extend(this.cfg, cfg);
    this.inputBox = this.CFG.inputBox;
    this.indexList = this.CFG.indexList;
    this.bindEvent(); 

}

OrderInput.prototype = {
    
    constructor: OrderInput, 
    
    //初始化car
    bindEvent: function() {
        this.inputBox.addEventListener('scroll', this.scrollIndexList.bind(this));
        this.inputBox.addEventListener('keyup', function(e) {
            var keyCode = e.keyCode;
            if (keyCode === 13 || keyCode === 8 || keyCode === 17) {
                this.renderIndexList();
            }
        }.bind(this));
    },

    //渲染输入框序号列表
    renderIndexList: function() {
        var cfg = this.CFG,
            html = '',
            length = this.inputBox.value.split('\n').length;
        for (var i = 1; i < length + 1; i++) {
            html += '<li class="order-index-item">' + i + '</li>';
        }
        this.indexList.innerHTML = html;
    },   

    //显示错误提示
    showErrorTip: function(index) {
        var indexItems = this.indexList.children;
        indexItems[index].className = this.cfg.errorClass;
    },

    //清除错误提示
    clearErrorTip: function() {
        var indexItems = this.indexList.children;
        for (var i = 0; i < indexItems.length; i++) {
            indexItems[i].className = '';
        }
    },

    //验证指令有效性
    checkOrder: function(value) {
        var cfg = this.CFG,
            replacedValue = value.replace(/\s[1-9]$/, '');
        if (cfg.validOrder.noNum.indexOf(value) > -1 || cfg.validOrder.withNum.indexOf(replacedValue) > -1) {
            return true;
        } else {
            return false;
        }
    },

    //获取指令参数：类型与格数
    getOrderParam: function(order) {
        var orderCount = 1,
            orderType = order.replace(/\s[1-9]/, '');           
        if (/[1-9]/.test(order)) {
            orderCount = parseInt(order.slice(-1), 10);
        } 
        return [orderType, orderCount];
    },

    //根据指令执行相应函数
    runOrder: function(order) {
        var cfg = this.CFG;
            orderType =  this.getOrderParam(order)[0],
            orderCount = this.getOrderParam(order)[1];
        switch(orderType) {
            case 'GO': cfg.orderTarget.goForward(orderCount);
                break;
            case 'TUN LEF': cfg.orderTarget.turnLeft();
                break;
            case 'TUN RIG': cfg.orderTarget.turnRight();
                break;
            case 'TUN BAK': cfg.orderTarget.turnBack();
                break;
            case 'TRA LEF': cfg.orderTarget.goLeft(orderCount);
                break;
            case 'TRA TOP': cfg.orderTarget.goTop(orderCount);
                break;
            case 'TRA RIG': cfg.orderTarget.goRight(orderCount);
                break;
            case 'TRA BOT': cfg.orderTarget.goBottom(orderCount);
                break;
            case 'MOV TOP': cfg.orderTarget.moveTop(orderCount);
                break;
            case 'MOV LEF': cfg.orderTarget.moveLeft(orderCount);
                break;
            case 'MOV RIG': cfg.orderTarget.moveRight(orderCount);
                break;
            case 'MOV BOT': cfg.orderTarget.moveBottom(orderCount);
                break;
        }
    },

    //依次执行指令序列
    runOrderGroup: function() {
        var orderArr = this.inputBox.value.split('\n'),
            that = this;
        this.clearErrorTip();
        orderArr.forEach(function(item, index) {
            setTimeout(function(){
                that.checkOrder(item) ? that.runOrder(item) : that.showErrorTip(index);
            }, 1000*index)            
        })
    },

    //清除指令
    clearOrder: function() {
        this.inputBox.value = '';
        this.renderIndexList();
    },

    //序号列表与输入框同步滚动
    scrollIndexList: function(n) {
        this.indexList.style.top = -this.inputBox.scrollTop + 'px';
    },
    
}