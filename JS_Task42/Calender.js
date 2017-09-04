/*
* @Author: midoDaddy
* @Date:   2017-08-31 14:46:20
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-04 15:40:34
*/
var Calender = function(cfg) {
    this.cfg = {
        container: null,
        showItem: null,
        currentDate: new Date(),
        minDate: null,
        maxDate: null, 
        rangeSelect: false,
        selectHandler: function(data) {
            console.log(data)
        },
        width: 400,
        height: 400,
        fontSize: 16,
        themeColor: null,       
    }
    this.CFG = $.extend(this.cfg, cfg);
    this.data = {};
    this.init();
}

Calender.prototype = {

    constructor: Calender,
    
    //初始化
    init: function() {
        this.updateCurDate(this.CFG.currentDate);
        this.renderUI();
        this.bindEvent();        
    },

    //更新当前日期
    updateCurDate: function(curDate) {
        this.data.Date = curDate;
        this.data.year = curDate.getFullYear();
        this.data.month = curDate.getMonth();
        this.data.date = curDate.getDate();
        this.getDateArr();
    },

    //获取当前月份的所有日期数据
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
   
    //渲染日历UI
    renderUI: function() {
        var CFG = this.CFG;
        this.wrapper = $('<div class="calender-wrapper"></div>')
            .appendTo(this.CFG.container)
            .css({
                width: CFG.width + 'px',
                height: CFG.height + 'px',
            });
        CFG.themeColor&& this.wrapper.addClass(CFG.themeColor);
        this.renderHead();
        this.renderTable();
        CFG.rangeSelect && this.renderBtn();
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
            .css({
                width: this.wrapper.width() - 20 + 'px',
                height: this.wrapper.height() - this.header.height() - 20 + 'px',
                fontSize: CFG.fontSize
            });
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
        this.data.dateEnd && this.renderDateRange();
    },

    //渲染确定取消按钮
    renderBtn: function() {
       $('<div class="btn-wrapper">' +
            '<div class="btn confirm-btn">确定</div>' +   
            '<div class="btn cancel-btn">取消</div>' +   
        '</div>').appendTo(this.wrapper);
       this.wrapper.height(this.wrapper.height() + 40);
    },

    //渲染不可选日期样式
    renderDisabled: function() {
        var CFG = this.CFG,
            curYear = this.data.year,
            curMonth = this.data.month,
            curDate = this.data.date,
            $td = this.table.find('td');
        
        //设置可选日期下限
        if (CFG.minDate) {
            var minDate = CFG.minDate,
                minYear = minDate.getFullYear(),
                minMonth = minDate.getMonth();
            if (curYear < minYear) {
                $td.addClass('disabled');
            } 
            if (curYear === minYear && curMonth < minMonth) {
                $td.addClass('disabled');
            } 
            if (curYear === minYear && curMonth === minMonth) {
                $td.each(function() {
                    if (parseInt($(this).text(), 10) < minDate.getDate()) {
                        $(this).addClass('disabled');
                    }
                });
            } 
        }

        //设置可选日期上限
        if (CFG.maxDate) {
            var maxDate = CFG.maxDate,
                maxYear = maxDate.getFullYear(),
                maxMonth = maxDate.getMonth();
            if (curYear > maxYear) {
                $td.addClass('disabled');
            } 
            if (curYear === maxYear && curMonth > maxMonth) {
                $td.addClass('disabled');
            } 
            if (curYear === maxYear && curMonth === maxMonth) {
                $td.each(function() {
                    if (parseInt($(this).text(), 10) > maxDate.getDate()) {
                        $(this).addClass('disabled');
                    }
                });
            } 
        }  

        //上月日期设为不可选
        this.table.find('tbody tr:first-child').find('td').each(function(){
            if (parseInt($(this).text(), 10) > 7) {
                $(this).addClass('disabled');
            }
        });

        //下月日期设为不可选
        this.table.find('tr:last-child').find('td').each(function(){
            if (parseInt($(this).text(), 10) < 7) {
                $(this).addClass('disabled');
            }
        });
    },

    //渲染选中日期样式
    renderSelected: function() {
        var curDate = this.data.date,
            self = this;
        this.table.find('td').each(function() {
            if (!self.data.dateEnd) {
                $(this).removeClass('selected');
            }           
            if (parseInt($(this).text(), 10) === curDate && !$(this).is('.disabled')) {
                $(this).addClass('selected');
            }
        });  
    },

    //选中单一日期
    selectDateSingle: function(e) {
        var $target = $(e.target),
            CFG = this.CFG;               
        if (!$target.is('.disabled')) {
            this.data.Date.setDate(parseInt($target.text(), 10));
            this.updateCurDate(this.data.Date);
            this.renderSelected();
            this.showSelectedDate();
            CFG.container.hide();
            CFG.selectHandler && CFG.selectHandler(this.data.Date);
        }
    },

    //选择日期范围
    selectDateRange: function(e) {
        var $target = $(e.target),
            CFG = this.CFG,
            data = this.data;               
        if (!$target.is('.disabled')) {
            if (!data.firstFlag && !data.secondFlag) {
                data.firstFlag = true;
                data.Date.setDate(parseInt($target.text(), 10));
                data.date = data.Date.getDate();
                data.dateStart = new Date(data.year, data.month, data.date);
                this.renderSelected();
            } else {
                data.secondFlag = true;
                data.Date.setDate(parseInt($target.text(), 10));
                data.date = data.Date.getDate();
                data.dateEnd = new Date(data.year, data.month, data.date);
                this.renderDateRange();
            } 
        }
    },

    //渲染所选日期范围的样式
    renderDateRange: function() {
        var data = this.data;
        this.table.find('td').each(function() {
            var dateValue = parseInt($(this).text(), 10),
                today = new Date(data.year, data.month, dateValue);
            $(this).removeClass('range-selected').removeClass('selected');
            if (!($(this).is('.disabled'))) {
                if (today > data.dateStart && today < data.dateEnd) {
                    $(this).addClass('range-selected');
                }
                if (+today === +data.dateEnd || +today === +data.dateStart) {
                    $(this).addClass('selected');
                }
            }           
        });
    },

    //日期范围的确认提交
    confirmDateRange: function() {
        var CFG = this.CFG;
        this.showSelectedDate();
        CFG.container.hide();
        CFG.selectHandler && CFG.selectHandler(this.data.Date);
    },

    //清空选择的日期范围
    clearDateRange: function() {
        console.log('clear')
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
    getSelectedDate: function() {
        return this.data.date;
    },

    //显示选中日期
    showSelectedDate: function() {
        if (this.CFG.rangeSelect) {
            this.CFG.showItem.val(this.getDateStr(this.data.dateStart) + ' ~ ' + this.getDateStr(this.data.dateEnd))
        } else {
            this.CFG.showItem.val(this.data.Date);
        }       
    },

    //日期转化为相应格式的字符串
    getDateStr: function(date) {
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
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
    
    //改变月份
    changeMonth: function(e) {
        var value = parseInt(e.target.value, 10);
        if (value > 0 && value <= 12) {
            this.data.Date.setMonth(value - 1);
            this.setDate(this.data.Date);
        } else {
            alert('请输入1~12之间的整数');
        }
    },
    
    //改变年份
    changeYear: function(e) {
        var value = parseInt(e.target.value, 10);
        if (value) {
            this.data.Date.setYear(value);
            this.setDate(this.data.Date);
        } else {
            alert('请输入有效年份');
        }
    },
    
    //事件绑定
    bindEvent: function() {
        var self = this;
        this.table.on('click', 'td', function(e) {
            self.CFG.rangeSelect ? self.selectDateRange(e) : self.selectDateSingle(e);
        });
        this.wrapper.find('.confirm-btn').on('click', this.confirmDateRange.bind(this));
        this.wrapper.find('.cancel-btn').on('click', this.clearDateRange.bind(this));
        $('#month-input').on('blur', this.changeMonth.bind(this));
        $('#year-input').on('blur', this.changeYear.bind(this)); 

        this.header.on('click', function(e) {
            var $target = $(e.target);
            switch(true) {
                case $target.is('.icon-enter'): self.goNextMonth();
                    break;
                case $target.is('.icon-return'): self.goPrevMonth();
                    break;
                case $target.is('.month-controller .icon-packup'): self.goPrevMonth();
                    break;
                case $target.is('.month-controller .icon-unfold'): self.goNextMonth();
                    break;
                case $target.is('.year-controller .icon-packup'): self.goPrevYear();
                    break;
                case $target.is('.year-controller .icon-unfold'): self.goNextYear();
                    break;
            }
        });
              
    }
}