/*
* @Author: 63431
* @Date:   2017-08-08 22:02:21
* @Last Modified by:   63431
* @Last Modified time: 2017-08-20 23:34:17
*/

'use strict';
 (function(){

    function $(id) {
        return document.getElementById(id);
    }
        
    //有效指令
    var validOrder = {
        withNum: ['GO', 'TRA LEF', 'TRA TOP', 'TRA RIG', 'TRA BOT', 'MOV TOP', 'MOV LEF', 'MOV RIG', 'MOV BOT'],
        noNum: ['TUN LEF', 'TUN RIG', 'TUN BAK']
    }

    //渲染背景表格
    function renderTable() {
        var tableHtml = '';
        for (var i = 0; i < 10; i++) {
            var trHtml = '';
            for (var j = 0; j < 10; j++) {
                trHtml += '<td></td>'
            }
            tableHtml += '<tr>' + trHtml + '</tr>';
        }
        $('bg-table').innerHTML = tableHtml;
    }

    
    //渲染输入框序号列表
    function renderIndexList(length) {
        
    }
    
    
    //验证指令有效性
    function checkOrder(value) {
        var flag = false;
        validOrder.noNum.forEach(function(item) {
            if (value === item) {
                flag = true;
            }
        });
        validOrder.withNum.forEach(function(item) {
            if (value === item) {
                flag = true;
            } else {
                var replacedValue = value.replace(new RegExp(item), ''),
                    pattern = /^\s[1-9]$/;
                if (pattern.test(replacedValue)) {
                    flag = true;
                }               
            }
        });
        return flag;
    }

    //获取指令参数：类型与格数
    function getOrderParam(order) {
        var orderCount = 1,
            orderType = order.replace(/\s[1-9]/, '');           
        if (/[1-9]/.test(order)) {
            orderCount = parseInt(order.slice(-1), 10);
        } 
        return [orderType, orderCount];
    }

    //根据指令执行相应函数
    function executeOrder(order) {
        var orderType = getOrderParam(order)[0],
            orderCount = getOrderParam(order)[1];
        switch(orderType) {
            case 'GO': car.goForward(orderCount);
                break;
            case 'TUN LEF': car.turnLeft();
                break;
            case 'TUN RIG': car.turnRight();
                break;
            case 'TUN BAK': car.turnBack();
                break;
            case 'TRA LEF': car.goLeft(orderCount);
                break;
            case 'TRA TOP': car.goTop(orderCount);
                break;
            case 'TRA RIG': car.goRight(orderCount);
                break;
            case 'TRA BOT': car.goBottom(orderCount);
                break;
            case 'MOV TOP': car.moveTop(orderCount);
                break;
            case 'MOV LEF': car.moveLeft(orderCount);
                break;
            case 'MOV RIG': car.moveRight(orderCount);
                break;
            case 'MOV BOT': car.moveBottom(orderCount);
                break;
        }
    }


    //初始化
    function init() {
        renderTable();
        var car = new Car({
            container: $('table-wrapper'),
            startX: 3,
            startY: 5,
            startDeg: 90
        });      
        $('order-btn').addEventListener('click', orderEvent);    
    }
    
    init();

})();


