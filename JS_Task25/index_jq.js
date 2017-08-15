/*
* @Author: 63431
* @Date:   2017-08-15 10:28:44
* @Last Modified by:   63431
* @Last Modified time: 2017-08-15 11:58:49
*/
$(function(){

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
            teamHtml += '<li>' + getTitleHtml(teamItem, true) + '<ul>' + typeHtml + '</ul></li>';
        }
        $('#content').html(getTitleHtml('英超球员', true) + '<ul>' + teamHtml +'</ul>');
    }

    //展开节点
    function unfoldNode($iconElem) {
        $iconElem.addClass('icon-packup').removeClass('icon-unfold')
        $iconElem.parent().next().css('display', 'block');
    }

    //折叠节点
    function foldNode($iconElem) {
        $iconElem.addClass('icon-unfold').removeClass('icon-packup')
        $iconElem.parent().next().css('display', 'none');
    }

    //删除节点
    function deleteNode($iconElem) {
        var $liElem = $iconElem.parent().parent(),
            $ulElem = $liElem.parent();
        $liElem.remove();
        if ($ulElem.children().length === 0) {
             //元素没有子元素时，删除该节点前的‘收起’图标
            $ulElem.prev().find('.icon-packup').remove();
            $ulElem.remove();
        }        
    }

    //添加节点
    function addNode($iconElem, value) {
        var $titleElem = $iconElem.parent(),
            value = prompt('请输入您要添加的内容'),
            $newItem = $('<li>' + getTitleHtml(value) + '</li>');;
        //如果没有子元素，则创建list，并添加相应的收起图标
        if ($titleElem.next().length === 0) {
            var $newList = $('<ul></ul>');
            $titleElem.parent().append($newList);
            $('<i class="iconfont icon-packup"></i>').insertBefore($titleElem.find(':first-child'));
        } 
        //如果父元素是收起状态，则添加子元素后父元素展开
        else {
            var $iconElem = $titleElem.find('.icon-unfold');
            if ($iconElem.length > 0) {
                unfoldNode($iconElem);
            }
        }
        $titleElem.next().append($newItem);
    } 

    //重置节点内容样式
    function resetColor() {
        $('.title-text').css('color', '#333');
    } 

    //查询节点
    function searchNode(value) {
        var value = $.trim($('#search-input').val()),
            $textElems = $('.title-text'),
            flag = false;
       $textElems.each(function() {
            if ($(this).html().indexOf(value) > -1) {
                $(this).css('color', 'red');
                unfoldParents($(this));
                flag = true;
            }
        });
        if (!flag) {
            alert('未发现目标');
        }
    } 

    //显示目标元素的所有父级元素
    function unfoldParents($elem) {
        var $ulParents = $elem.parents('ul');
        $ulParents.each(function() {
            unfoldNode($(this).prev().find('i:first-child'));
        });
    }
 
    //初始化：添加事件函数
    function init() {
        var $content = $('#content');
        renderHtml(teamData);
        $content.on('click', '.icon-packup', function(e) {
            foldNode($(e.target));
        });
        $content.on('click', '.icon-unfold', function(e) {
            unfoldNode($(e.target));
        });
        $content.on('click', '.icon-delete', function(e) {
            deleteNode($(e.target));
        });
        $content.on('click', '.icon-addition', function(e) {
            addNode($(e.target));
        });
        $('#search-btn').on('click', function(){
            resetColor();
            searchNode();
        });
    }
    
    init();

});