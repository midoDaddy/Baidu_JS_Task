/*
* @Author: 63431
* @Date:   2017-08-08 22:02:21
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-08-10 10:44:04
*/

'use strict';
(function(){

    function $(id) {
        return document.getElementById(id);
    }
    
    var numArr = [],
        numInput = $('num-input');

    //验证数值有效性
    function checkNum(num) {
        var pattern = /^\d{1,2}$/;
        if (!pattern.test(num)) {
            alert('请输入最多两位的正整数');
            return false;
        }
        return true;
    }

    //左侧插入数据
    function leftIn() {
        var num = numInput.value.trim();
        if (checkNum(num)) {
            numArr.unshift(num);
        }
    }

    //右侧插入数据
    function rightIn() {
        var num = numInput.value.trim();
        if (checkNum(num)) {
            numArr.push(num);
        }
    }

    //左侧删除数据
    function leftOut() {
        if (numArr.length > 0) {
            alert(numArr.shift());
        } else {
            alert('全都删光啦！')
        }       
    }

    //右侧删除数据
    function rightOut() {
        if (numArr.length > 0) {
            alert(numArr.pop());
        } else {
            alert('全都删光啦！')
        }  
    }

    //点击队列中的元素，删除相应数据
    function delNumItem(elem) {
        var index = parseInt(elem.className.split('num-item-')[1]);
        numArr.splice(index, 1);
    }

    //渲染数据
    function renderData() {
        var listHtml = '';
        numArr.forEach(function(item, index){
           listHtml += '<div class="num-item-' + index + '">' + item + '</div>'; 
        });
        document.getElementById('num-box').innerHTML = listHtml;
    }

    //添加事件函数
    $('left-in').onclick = function() {
        leftIn();
        renderData();
    };
    $('right-in').onclick = function() {
        rightIn();
        renderData();
    };
    $('left-out').onclick = function() {
        leftOut();
        renderData();
    };
    $('right-out').onclick = function() {
        rightOut();
        renderData();
    };
    $('num-box').onclick = function(e) {
        var target = e.target;
        if (target.tagName === 'DIV') {
            delNumItem(target);
            renderData();
        }
    }

})();