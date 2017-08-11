/*
* @Author: 63431
* @Date:   2017-08-08 22:02:21
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-08-11 16:32:17
*/

'use strict';
(function(){

    function $(id) {
        return document.getElementById(id);
    }
    
    var itemArr = [],
        textInput = $('text-input'),
        textList = $('text-list');

    //验证数值有效性
    function checkValue(value) {
        var pattern = /[^a-zA-Z0-9\u4e00-\u9fa5\r\s,，、]/;
        if (pattern.test(value) || value === '') {
            alert('格式有误，请输入中文、英文或数字，以回车、逗号、顿号、空格分隔');
            return false;
        }
        return true;
    }

    //将输入值分割为有效数据
    function splitValue(value) {
        var arr = [];
        var pattern = /[\r\s,，、]/;
        value = value.replace(/^[\r\s,，、]*/, '').replace(/[\r\s,，、]*$/, '');
        arr = value.split(pattern);
        return arr;
    }

    //左侧插入数据
    function leftIn() {       
        var value = textInput.value.trim();
        if (checkValue(value)) {
            itemArr = splitValue(value).concat(itemArr);
        }              
    }

    //右侧插入数据
    function rightIn() {
        var value = textInput.value.trim();
        if (checkValue(value)) {
            itemArr = itemArr.concat(splitValue(value));
        }
    }

    //左侧删除数据
    function leftOut() {
        if (itemArr.length > 0) {
            alert(itemArr.shift());
        } else {
            alert('全都删光啦！')
        }       
    }

    //右侧删除数据
    function rightOut() {
        if (itemArr.length > 0) {
            alert(itemArr.pop());
        } else {
            alert('全都删光啦！')
        }  
    }

    //点击队列中的元素，删除相应数据
    function delNumItem(elem) {
        var index = parseInt(elem.className.split('text-item-')[1]);
        itemArr.splice(index, 1);
    }

    //生成测试数据
    function getTestData() {
        textInput.value = 'mido、是个，漂亮的 123 小姑娘，'
    }

    //渲染数据
    function renderData() {
        var listHtml = '';
        itemArr.forEach(function(item, index){
           listHtml += '<li class="text-item-' + index + '">' + item + '</li>'; 
        });
        textList.innerHTML = listHtml;
        textInput.value = '';
    }

    //搜索数据
    function searchData() {
        var value = $('search-input').value.trim(),
            textItems = textList.getElementsByTagName('li'),
            flag = false;
        for (var i = 0, length = textItems.length; i < length; i++) {
            if (textItems[i].innerHTML.indexOf(value) > -1) {
                var replacedHtml = '<span class="highlight">' + value + '</span>'
                textItems[i].innerHTML = 
                    textItems[i].innerHTML.replace(new RegExp(value, 'g'), replacedHtml);
                flag = true;
            }           
        }
        if (!flag) {
            alert('未发现目标噢~')
        }
    }

    //初始化
    function init() {
        //添加事件函数
        $('left-in-btn').onclick = function() {
            leftIn();
            renderData();
        };
        $('right-in-btn').onclick = function() {
            rightIn();
            renderData();
        };
        $('left-out-btn').onclick = function() {
            leftOut();
            renderData();
        };
        $('right-out-btn').onclick = function() {
            rightOut();
            renderData();
        };
        textList.onclick = function(e) {
            var target = e.target;
            if (target.className.indexOf('text-item') >= 0) {
                delNumItem(target);
                renderData();
            }
        };
        $('test-btn').onclick = getTestData;
        $('search-btn').onclick = function() {
            renderData();
            searchData();
        }
    }

    init();
    
})();