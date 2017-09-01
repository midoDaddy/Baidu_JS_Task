/*
* @Author: midoDaddy
* @Date:   2017-08-31 14:46:20
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-01 11:48:29
*/
var Calender = function(cfg) {
    this.cfg = {
        currentDate: new Date(),
        container: null,
        width: 400,
        height: 400,
        themeColor: null
    }
    this.CFG = $.extend(this.cfg, cfg);
    this.data = {};
    this.init();

}

Calender.prototype = {

    constructor: Calender,
    
    //初始化
    init: function() {
        var curDate = this.CFG.currentDate;
        this.updateCurDate(curDate);
        this.renderUI();
        this.bindEvent();        
    },
   
    //渲染日历UI
    renderUI: function() {
        var CFG = this.CFG;
        this.wrapper = $('<div class="calender-wrapper"></div>')
            .appendTo(this.CFG.container)
            .css({
                width: CFG.width + 'px',
                height: CFG.height + 'px',
            });
        CFG.theme && this.wrapper.addClass(CFG.theme);
        this.renderHead();
        this.renderTable();
    },

    //渲染日历头部UI
    renderHead: function() {
        var CFG = this.CFG,
            month = this.data.month + 1,
            year = this.data.year;

       this.header = $('<div class="calender-header"></div>').appendTo(this.wrapper)
        .html(  '<i class="iconfont icon-return"></i>' + 
                '<div class="input-item-wrapper">' +
                    '<input type="text" id="month-input" class="input-item" value="' + month + '月">' +
                    '<div class="controller-wrapper month-controller">' +
                        '<i class="iconfont icon-packup"></i>' +
                        '<i class="iconfont icon-unfold"></i>' +                       
                    '</div>' +
                '</div>' +
                '<div class="input-item-wrapper">' +
                    '<input type="text" id="year-input" class="input-item" value="' + year + '年">' +
                    '<div class="controller-wrapper year-controller">' +
                        '<i class="iconfont icon-packup"></i>' +
                        '<i class="iconfont icon-unfold"></i>' +
                    '</div>' +
                '</div>' +
                '<i class="iconfont icon-enter"></i>');          
    },

    //渲染日历表格UI
    renderTable: function() {
        var CFG = this.CFG;
        this.table = $(
            '<table class="calender-table">' +
                '<thead class="calender-title">' +
                    '<tr>' +
                        '<th class="highlight">日</th>' +
                        '<th>一</th><th>二</th><th>三</th><th>四</th><th>五</th>' + 
                        '<th class="highlight">六</th>' +
                    '</tr>' +
                '</thead>' +
                '<tbody></tbody>' +
            '</table>').appendTo(this.wrapper)
            .width(this.wrapper.width() - 20)
            .height(this.wrapper.height() - this.header.height() - 20); 
        this.renderTableData();              
    },

    //渲染表格数据
    renderTableData: function() {
        var html = '';
        this.data.dateArr.forEach(function(item, index) {
            if (index % 7 === 0) {
                html += '<tr><td class="highlight">' + item + '</td>'
            } else if (index % 7 === 6) {
                html += '<td class="highlight">' + item + '</td></tr>'
            } else {
                html += '<td>' + item + '</td>'
            }
        });
        this.table.find('tbody').html(html);
        this.renderDisabled();
        this.renderSelected();
    },

    //渲染不可选日期样式
    renderDisabled: function() {
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

    //渲染选中日期样式
    renderSelected: function() {
        var curDate = this.data.date;
        this.table.find('td').each(function() {
            $(this).removeClass('selected');
            if (parseInt($(this).text(), 10) === curDate && !$(this).is('.disabled')) {
                $(this).addClass('selected');
            }
        });  
    },

    //更新当前日期
    updateCurDate: function(curDate) {
        this.data.Date = curDate;
        this.data.year = curDate.getFullYear();
        this.data.month = curDate.getMonth();
        this.data.date = curDate.getDate();
        this.getDateArr();
        this.getCurDate();
    },

    //获取当前日期所在月份的日期数据
    getDateArr: function() {
        var CFG = this.CFG,
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
            this.data.dateArr.unshift(firstDate.getDate());
        }

        //如果最后一天不是周六，则从下月补齐至周日
        while (lastDate.getDay() !== 6) {
            lastDate.setDate(lastDate.getDate() + 1);
            this.data.dateArr.push(lastDate.getDate());
        }     
    },

    //选中日期
    selectDate: function(e) {
        var $target = $(e.target);               
        if (!$target.is('.disabled')) {
            this.data.Date.setDate(parseInt($target.text(), 10));
            this.updateCurDate(this.data.Date);
            this.renderSelected();
        }
    },

    //指定选中日期并显示
    setDate: function(date) {        
        this.updateCurDate(date);
        this.renderTableData();
        this.updateHeaderValue();        
    },


    //更新头部月份值与年份值
    updateHeaderValue: function() {
        $('#month-input').val(this.data.month + 1 + '月');
        $('#year-input').val(this.data.year + '年');
    },

    //获取选中日期
    getCurDate: function() {
        console.log(this.data.year + '年' + (this.data.month + 1) + '月' + this.data.date + '日');
    },

    //切换至下个月日历
    goNextMonth: function() {
        this.data.Date.setMonth(this.data.month + 1);
        this.setDate(this.data.Date);

    },

    //切换至上个月日历
    goPrevMonth: function() {
        this.data.Date.setMonth(this.data.month - 1);
        this.setDate(this.data.Date);
    },

    //切换至下一年日历
    goNextYear: function() {
        this.data.Date.setYear(this.data.year + 1);
        this.setDate(this.data.Date);
    },

    //切换至上一年日历
    goPrevYear: function() {
        this.data.Date.setYear(this.data.year - 1);
        this.setDate(this.data.Date);
    },
    
    //事件绑定
    bindEvent: function() {
        this.table.on('click', 'td', this.selectDate.bind(this));
        this.header.on('click', '.icon-enter', this.goNextMonth.bind(this));
        this.header.on('click', '.icon-return', this.goPrevMonth.bind(this));
        this.header.on('click', '.month-controller .icon-packup', this.goPrevMonth.bind(this));        
        this.header.on('click', '.month-controller .icon-unfold', this.goNextMonth.bind(this));
        this.header.on('click', '.year-controller .icon-packup', this.goPrevYear.bind(this));
        this.header.on('click', '.year-controller .icon-unfold', this.goNextYear.bind(this));
    }
}