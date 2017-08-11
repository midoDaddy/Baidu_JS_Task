/*
* @Author: 63431
* @Date:   2017-08-08 22:02:21
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-08-11 16:34:07
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
        var pattern = /[^\d]/;
        if (pattern.test(num) || parseInt(num, 10) > 100 || parseInt(num, 10) < 10 || num === '') {
            alert('请输入10~100之间的正整数');
            return false;
        }
        return true;
    }

    //左侧插入数据
    function leftIn() {
        if (numArr.length >= 60) {
            alert('队列已达到最大长度');
        } else {
            var num = numInput.value.trim();
            if (checkNum(num)) {
                numArr.unshift(parseInt(num, 10));
            }
        }       
    }

    //右侧插入数据
    function rightIn() {
        if (numArr.length >= 60) {
            alert('队列已达到最大长度');
        } else {
            var num = numInput.value.trim();
            if (checkNum(num)) {
                numArr.push(parseInt(num, 10));
            }
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

    //随机生成测试数据
    function randomData() {
        for (var i = 0; i < 60; i++) {
            numArr[i] = Math.floor(Math.random()*91) + 10;
        }
    }

    //渲染数据
    function renderData() {
        var listHtml = '';
        numArr.forEach(function(item, index){
           listHtml += '<div class="num-item-' + index + '" style="height:' + item*5 + 'px"></div>'; 
        });
        $('num-box').innerHTML = listHtml;
        numInput.value = '';
    }

    //冒牌排序动画演示
    function sortData() {
        var i = 0,
            j = 0;
        var timer = setInterval(function(){
            if (i < numArr.length) {
                if (j < numArr.length - i - 1) {                   
                    if (numArr[j + 1] < numArr[j]) {
                        var temp = numArr[j + 1];
                        numArr[j + 1] = numArr[j];
                        numArr[j] = temp;
                        renderData();
                    } 
                    j++;
                } else {
                    i++;
                    j = 0;
                }
            } else {
                clearInterval(timer);
            }
        }, 25)
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
        if (target.className.indexOf('num-item') >= 0) {
            delNumItem(target);
            renderData();
        }
    };
    $('random').onclick = function() {
        randomData();
        renderData();
    }
    $('sort').onclick = sortData;

})();