/*
* @Author: 63431
* @Date:   2017-08-08 22:02:21
* @Last Modified by:   63431
* @Last Modified time: 2017-08-15 10:42:02
*/

'use strict';
(function(){
    
    function $(id) {
        return document.getElementById(id);
    }

    //检查元素是否包含某个class样式
    function checkClass(elem, name) {
        return (elem.className.indexOf(name) > -1) ? true : false;
    }

    var teamData = {
            '阿森纳': {
                '前锋': ['吉鲁', '拉卡泽特', '桑切斯', '沃尔科特'],
                '中场': ['厄齐尔', '扎卡', '拉姆塞', '卡索拉'],
                '后卫': ['科斯切尔尼', '穆斯塔菲', '科拉希纳茨', '蒙雷亚尔']        
            },
            '曼联': {
                '前锋': ['卢卡库', '伊布', '马夏尔', '拉什福德'],
                '中场': ['博格巴', '姆希塔良', '埃雷拉', '马蒂奇'],
                '后卫': ['拜利', '菲尔琼斯', '瓦伦西亚', '卢克肖']        
            },
            '曼城': {
                '前锋': ['阿圭罗', '斯特林', '热苏斯', '萨内'],
                '中场': ['席尔瓦', '京多安', '亚亚图雷', '德布劳内'],
                '后卫': ['奥塔门迪', '斯通斯', '门迪', '沃克']        
            }
        };
    
    //生成title的html模板
    function getTitleHtml(value, iconFlag) {
        var iconHtml = iconFlag ? '<i class="iconfont icon-packup"></i>' : '' ;
        return '<p class="title">' +
                    iconHtml +
                    '<span class="title-text">' + value + '</span>' +
                    '<i class="iconfont icon-addition"></i>' +
                    '<i class="iconfont icon-delete"></i>' +
                '</p>';
    }
    
    //初始数据列表渲染
    function renderHtml(teamData) {
        var teamHtml = '';
        for (var teamItem in teamData) {
            var teamValue = teamData[teamItem],
                typeHtml = '';
            for (var typeItem in teamValue) {
                var typeValue = teamValue[typeItem],
                    playerHtml = '';
                for (var i = 0; i < typeValue.length; i++) {                
                    playerHtml += '<li>' + getTitleHtml(typeValue[i]) + '</li>';
                }
                typeHtml += '<li>' + getTitleHtml(typeItem, true) +
                        '<ul>' + playerHtml + '</ul>' + '</li>';
            }
            teamHtml += '<li>' + getTitleHtml(teamItem, true) +
                    '<ul>' + typeHtml + '</ul>' + '</li>';
        }
        $('content').innerHTML = getTitleHtml('英超球员', true) +
            '<ul>' + teamHtml +'</ul>';
    }

    //展开节点
    function unfoldNode(iconElem) {
        iconElem.className = iconElem.className.replace('unfold', 'packup');
        iconElem.parentNode.nextElementSibling.style.display = 'block';
    }

    //折叠节点
    function foldNode(iconElem) {
        iconElem.className = iconElem.className.replace('packup', 'unfold');
        iconElem.parentNode.nextElementSibling.style.display = 'none';
    }

    //删除节点
    function deleteNode(iconElem) {
        var liElem = iconElem.parentNode.parentNode,
            ulElem = liElem.parentNode;
        ulElem.removeChild(liElem);
        if (ulElem.children.length === 0) {
            deleteFoldIcon(ulElem);
            ulElem.parentNode.removeChild(ulElem);
        }        
    }

    //元素没有子元素时，删除该节点前的‘收起’图标
    function deleteFoldIcon(ulElem) {
        var titleElem = ulElem.previousElementSibling,
            iconElem = titleElem.getElementsByClassName('icon-packup')[0];
        titleElem.removeChild(iconElem);
    }

    //添加节点
    function addNode(iconElem, value) {
        var titleElem = iconElem.parentNode,
            newItem = document.createElement('li'),
            value = prompt('请输入您要添加的内容');
        newItem.innerHTML = getTitleHtml(value);
        //如果没有子元素，则创建list，并添加相应的收起图标
        if (!titleElem.nextElementSibling) {
            var newList = document.createElement('ul');
            titleElem.parentNode.appendChild(newList);
            addFoldIcon(titleElem);
        } 
        //如果父元素是收起状态，则添加子元素后父元素展开
        else {
            var iconElem = titleElem.firstElementChild;
            if (checkClass(iconElem, 'unfold')) {
                unfoldNode(iconElem);
            }
        }
        titleElem.nextElementSibling.appendChild(newItem);
    } 

    //本来没有子元素的元素添加子元素时，节点前增加收起图标
    function addFoldIcon(titleElem) {
        var iconElem = document.createElement('i');
        iconElem.className = 'iconfont icon-packup';
        titleElem.insertBefore(iconElem, titleElem.firstElementChild);
    }

    //重置节点内容样式
    function resetColor() {
        var textElem = document.getElementsByClassName('title-text');
        for (var i = 0; i < textElem.length; i++) {           
            textElem[i].style.color = '#333';
        }
    } 

    //查询节点
    function searchNode(value) {
        var value = $('search-input').value.trim(),
            textElems = document.getElementsByClassName('title-text'),
            flag = false;
        for (var i = 0; i < textElems.length; i++) {
            if (textElems[i].innerHTML.indexOf(value) > -1) {
                textElems[i].style.color = 'red';
                unfoldParents(textElems[i]);
                flag = true;
            }
        }
        if (!flag) {
            alert('未发现目标');
        }
    } 

    //显示目标元素的所有父级元素
    function unfoldParents(elem) {
        while(elem) {
            if (elem.tagName === 'UL') {
                var iconElem = elem.previousElementSibling.firstElementChild;
                unfoldNode(iconElem);
            }
            elem = elem.parentNode;
        }
    }
 
    //初始化：添加事件函数
    function init() {
        renderHtml(teamData);
        $('content').addEventListener('click', function(e) {
            var target = e.target;
            switch(true) {
                case checkClass(target, 'packup'): foldNode(target);
                    break;
                case checkClass(target, 'unfold'): unfoldNode(target);
                    break;
                case checkClass(target, 'delete'): deleteNode(target);
                    break;
                case checkClass(target, 'addition'): addNode(target);
                    break;
            }
        });
        $('search-btn').addEventListener('click', function(){
            resetColor();
            searchNode();
        });
    }
    
    init();

})();


