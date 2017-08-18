/*
* @Author: 63431
* @Date:   2017-08-08 22:02:21
* @Last Modified by:   63431
* @Last Modified time: 2017-08-18 22:47:53
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
            default: alert('请输入有效指令');
                break;
        }
    }

    //初始化
    function init() {
        renderTable();      
        $('order-btn').addEventListener('click', orderEvent);
        $('go-forward').addEventListener('click', car.goForward.bind(car));
        $('turn-left').addEventListener('click', car.turnLeft.bind(car));
        $('turn-right').addEventListener('click', car.turnRight.bind(car));
        $('turn-back').addEventListener('click', car.turnBack.bind(car));        
    }
    
    init();

})();


