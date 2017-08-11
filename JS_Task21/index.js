/*
* @Author: 63431
* @Date:   2017-08-08 22:02:21
* @Last Modified by:   63431
* @Last Modified time: 2017-08-11 16:28:13
*/

'use strict';
(function(){
    
    //public
    
    //根据id获取元素
    function $(id) {
        return document.getElementById(id);
    }

    //跨浏览器事件添加函数
    function addEvent(element, type, handler){
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        }else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        }else{
            element["on" + type] = handler;
        }
    }

    //渲染数据
    function renderData(data, container) {
        var html = '';
        data.forEach(function(item, index){
           html += '<li class="item-' + index + '">' + item + '</li>'; 
        });
        container.innerHTML = html;
    }

    //添加数据
    function addData(dataArr, dataItem) {
        if (dataArr.indexOf(dataItem) === -1 && dataItem !== '') {
            dataArr.push(dataItem);
            if (dataArr.length > 10) {
                dataArr.shift();
            }             
        } 
    }
    
    //定义变量
    var tagData = [],
        hobbyData = [],
        tagInput = $('tag-input'),
        hobbyInput = $('hobby-input'),
        tagList = $('tag-list'),
        hobbyList = $('hobby-list');
   

    //tag部分

    //tag输入框添加tag事件函数
    function addTagEvent(e) {
        var keyCode = e.keyCode,
            keyCodeArr = [13, 32, 188];
        if (keyCodeArr.indexOf(keyCode) > -1) {
            addData(tagData, tagInput.value.trim()); 
            renderData(tagData, tagList);
            this.value = '';
        }
    }

    //清空添加标签后键入的空格和逗号
    function clearTagInput(e) {
        var keyCode = e.keyCode,
            keyCodeArr = [13, 32, 188];
        if (keyCodeArr.indexOf(keyCode) > -1) {
            this.value = this.value.replace(/[\s\r,]/g, '');   
        }
    }

    //点击队列中的元素，删除相应数据
    function delNumItem(elem, dataArr) {
        var index = parseInt(elem.className.split('item-')[1]);
        dataArr.splice(index, 1);
    }


    //hobby部分

    //将输入值分割为有效数据
    function splitValue(value) {
        var arr = [];
        var pattern = /[\r\s,，、]/;
        //去除首尾的分隔符
        value = value.replace(/^[\r\s,，、]*/, '').replace(/[\r\s,，、]*$/, '');
        arr = value.split(pattern);
        return arr;
    }

    //添加hobby数据
    function addHobbyData() {
        var newData = splitValue(hobbyInput.value.trim());
        newData.forEach(function(item, index) {
            addData(hobbyData, item);
        })
    }
   
    //生成测试数据
    function getTestData() {
        hobbyInput.value = 'mido、是个，漂亮的 123 小姑娘，'
    }

    //初始化
    function init() {       
        addEvent(tagInput, 'keydown', addTagEvent);
        addEvent(tagInput, 'keyup', clearTagInput);
        addEvent($('tag-list'), 'mouseover', function(e) {
            var target = e.target;
            if (target.tagName === 'LI') {
                target.innerHTML = '删除' + target.innerHTML;
            }
        });
        addEvent($('tag-list'), 'mouseout', function(e) {
            var target = e.target;
            if (target.tagName === 'LI') {
                target.innerHTML = target.innerHTML.slice(2);
            }
        });
        addEvent($('tag-list'), 'click', function(e) {
            var target = e.target;
            if (target.tagName === 'LI') {
                delNumItem(target, tagData);
                renderData(tagData, tagList);
            }
        });       
        addEvent($('hobby-confirm-btn'), 'click', function() {
            addHobbyData();
            renderData(hobbyData, hobbyList);
            hobbyInput.value = '';
        });
        addEvent($('hobby-test-btn'), 'click', getTestData);
    }

    init();
    
})();