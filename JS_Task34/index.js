/*
* @Author: 63431
* @Date:   2017-08-08 22:02:21
* @Last Modified by:   63431
* @Last Modified time: 2017-08-18 23:52:54
*/

'use strict';
 (function(){

    function $(id) {
        return document.getElementById(id);
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

    //创建car元素，并设置初始位置与角度
    var car = new Car({
        container: $('table-wrapper'),
        startX: 3,
        startY: 5,
        startDeg: 90
    });

    //指令事件函数
    function orderEvent() {
        var order = $('order-input').value.trim();
        switch(order) {
            case 'GO': car.goForward();
                break;
            case 'TUN LEF': car.turnLeft();
                break;
            case 'TUN RIG': car.turnRight();
                break;
            case 'TUN BAK': car.turnBack();
                break;
            case 'TRA LEF': car.goLeft();
                break;
            case 'TRA TOP': car.goTop();
                break;
            case 'TRA RIG': car.goRight();
                break;
            case 'TRA BOT': car.goBottom();
                break;
            case 'MOV TOP': car.moveTop();
                break;
            case 'MOV LEF': car.moveLeft();
                break;
            case 'MOV RIG': car.moveRight();
                break;
            case 'MOV BOT': car.moveBottom();
                break;
            default: alert('请输入有效指令');
                break;
        }
    }

    //初始化
    function init() {
        renderTable();      
        $('order-btn').addEventListener('click', orderEvent);
        $('go-forward-btn').addEventListener('click', car.goForward.bind(car));
        $('turn-left-btn').addEventListener('click', car.turnLeft.bind(car));
        $('turn-right-btn').addEventListener('click', car.turnRight.bind(car));
        $('turn-back-btn').addEventListener('click', car.turnBack.bind(car));        
        $('go-left-btn').addEventListener('click', car.goLeft.bind(car));        
        $('go-top-btn').addEventListener('click', car.goTop.bind(car));        
        $('go-right-btn').addEventListener('click', car.goRight.bind(car));        
        $('go-bottom-btn').addEventListener('click', car.goBottom.bind(car));        
        $('move-left-btn').addEventListener('click', car.moveLeft.bind(car));        
        $('move-top-btn').addEventListener('click', car.moveTop.bind(car));        
        $('move-right-btn').addEventListener('click', car.moveRight.bind(car));        
        $('move-bottom-btn').addEventListener('click', car.moveBottom.bind(car));        
    }
    
    init();

})();


