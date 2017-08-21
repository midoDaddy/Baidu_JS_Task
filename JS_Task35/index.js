/*
* @Author: 63431
* @Date:   2017-08-08 22:02:21
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-08-21 15:38:41
*/

'use strict';
 (function(){
        
    var validOrder = {
        withNum: ['GO', 'TRA LEF', 'TRA TOP', 'TRA RIG', 'TRA BOT', 'MOV TOP', 'MOV LEF', 'MOV RIG', 'MOV BOT'],
        noNum: ['TUN LEF', 'TUN RIG', 'TUN BAK']
    };
    
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


    //初始化
    function init() {
        renderTable(); 
        var car = new Car({
            container: $('table-wrapper'),
            startX: 3,
            startY: 5,
            startDeg: 90
        });  
        var orderInput = new OrderInput({
            inputBox: $('order-input-box'),
            indexList: $('order-index-list'),
            validOrder: validOrder,
            orderTarget: car
        });          
        $('order-btn').addEventListener('click', orderInput.executeOrderGroup.bind(orderInput));
        $('refresh-btn').addEventListener('click', orderInput.clearOrder.bind(orderInput));
    }
    
    init();

})();


