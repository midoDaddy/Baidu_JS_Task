/*
* @Author: midoDaddy
* @Date:   2017-08-31 14:46:20
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-08-31 22:16:43
*/
var Calender = function(cfg) {
    this.cfg = {
        currentDate: new Date(),
        container: null
    }
    this.CFG = $.extend(this.cfg, cfg);
    this.data = {};
    this.init();

}

Calender.prototype = {

    constructor: Calender,
    
    //初始化
    init: function() {
        this.initData();
        this.renderUI();
        this.bindEvent();        
    },
    
    //初始化数据
    initData: function() {
        var CFG = this.CFG;
        this.data.year = CFG.currentDate.getFullYear();
        this.data.month = CFG.currentDate.getMonth();
        this.data.date = CFG.currentDate.getDate();
        this.getMonthData();
    },
    
    //渲染日历UI
    renderUI: function() {
        var CFG = this.CFG;
        this.wrapper = $('<div class="calender-wrapper"></div>').appendTo(CFG.container);
        this.renderHead();
        this.renderTable();
    },

    //渲染日历头部UI
    renderHead: function() {
        var CFG = this.CFG,
            month = this.data.month + 1,
            year = this.data.year;
        if (!this.header) {
           this.header = $('<div class="calender-header"></div>').appendTo(this.wrapper)
            .html(  '<i class="iconfont icon-return"></i>' + 
                    '<div class="input-item-wrapper">' +
                        '<input type="text" id="month-input" class="input-item" value="' + month + '月">' +
                        '<div class="controller-wrapper">' +
                            '<i class="iconfont icon-packup"></i>' +
                            '<i class="iconfont icon-unfold"></i>' +                       
                        '</div>' +
                    '</div>' +
                    '<div class="input-item-wrapper">' +
                        '<input type="text" id="year-input" class="input-item" value="' + year + '年">' +
                        '<div class="controller-wrapper">' +
                            '<i class="iconfont icon-packup"></i>' +
                            '<i class="iconfont icon-unfold"></i>' +
                        '</div>' +
                    '</div>' +
                    '<i class="iconfont icon-enter"></i>');
        }        
    },


    //渲染日历表格UI
    renderTable: function() {
        var CFG = this.CFG,
            html = '';
        this.table = $('<table class="calender-table"></div>').appendTo(this.wrapper);
        html += '<thead class="calender-title">' +
                    '<tr>' +
                        '<th class="highlight">日</th>' +
                        '<th>一</th><th>二</th><th>三</th><th>四</th><th>五</th>' + 
                        '<th class="highlight">六</th>' +
                    '</tr>' +
                '</thead>';
        this.data.dateArr.forEach(function(item, index) {
            if (index % 7 === 0) {
                html += '<tr><td class="highlight">' + item + '</td>'
            } else if (index % 7 === 6) {
                html += '<td class="highlight">' + item + '</td></tr>'
            } else {
                html += '<td>' + item + '</td>'
            }
        })
        this.table.html(html);

        //设置不可选日期样式
        this.table.find('tbody tr:first-child').find('td').each(function(){
            if (parseInt($(this).text(), 10) > 7) {
                $(this).addClass('disabled');
            }
        });
        this.table.find('tr:last-child').find('td').each(function(){
            if (parseInt($(this).text(), 10) < 7) {
                $(this).addClass('disabled');
            }
        });
    },
    
    //获取当前日期所在月份的日期数据
    getMonthData: function() {
        var CFG = this.CFG,
            curDate = CFG.currentDate,
            curMonth = this.data.month,
            curYear = this.data.year,
            firstDate = new Date(curYear, curMonth, 1),
            lastDate = new Date(curYear, curMonth + 1, 0);

        //清空数据
        this.data.dateArr = [];

        //添加本月的日期
        for (var i = 0; i < lastDate.getDate(); i++) {
            this.data.dateArr.push(i + 1);
        }

        //如果第一天不是周日，则从上月补齐至周日
        while (firstDate.getDay() !== 0) {
            firstDate.setDate(firstDate.getDate() - 1);
            this.data.dateArr.unshift(firstDate.getDate())
        }

        //如果最后一天不是周六，则从下月补齐至周日
        while (lastDate.getDay() !== 6) {
            lastDate.setDate(lastDate.getDate() + 1);
            this.data.dateArr.push(lastDate.getDate())
        }     
    },

    //设置选中日期
    setDate: function() {

    },

    //获取选中日期
    getDate: function() {

    },
    
    //事件绑定
    bindEvent: function() {

    }
}