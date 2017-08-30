/*
* @Author: midoDaddy
* @Date:   2017-08-30 16:44:45
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-08-30 23:45:45
*/
var SortTable = function(cfg) {
    this.cfg = {
        data: null,
        container: null,
        className: 'sort-table',
        head: [],
        sortItems: [],
        sortMethods: {},
        width: 600,
        fontSize: 14,
        lineHeight: 2.5,
        color: '#333',
        theme: null
    }
    this.CFG = $.extend(this.cfg, cfg);  
    this.init();
}

SortTable.prototype = {

    constructor: SortTable,

    init: function() {
        this.data = this.CFG.data; 
        this.renderUI();
        this.bindEvent();
        
    },

    renderUI: function() {
        var CFG = this.CFG,
            bodyHtml = '',
            headHtml = '';
        
        //如果表格没有创建，则创建新表格
        if (!this.table) {

            this.table = $('<table></table>').appendTo(CFG.container)
                .addClass(CFG.className)
                .css({
                    width: CFG.width + 'px',
                    lineHeight: CFG.lineHeight,
                    fontSize: CFG.fontSize + 'px',
                    color: CFG.color
                });
            CFG.theme && this.table.addClass(CFG.theme);
            
            //创建表格头部
            for (var item in CFG.head) {
                var iconHtml = '';
                if (CFG.sortItems.indexOf(item) > -1) {
                    iconHtml = '<i class="sort-icon"></i>'
                }
                headHtml += '<th data-type="' + item + '">' + CFG.head[item] + iconHtml + '</th>';
            }
            this.tableHead = $('<tr>' + headHtml + '</tr>').appendTo(this.table)
                .addClass('freeze-head');
    
            //创建表格主体
            this.tableBody = $('<tbody></tbody>').appendTo(this.table);     
        }
        
        //更新表格数据
        this.data.forEach(function(item) {
            var itemHtml = '';
            for (var i in item ) {
                itemHtml += '<td>' + item[i] + '</td>';
            }
            bodyHtml += '<tr>' + itemHtml + '</tr>';
        })
        this.tableBody.html(bodyHtml);

    },

    //排序
    sortData: function(e) {
        var CFG = this.CFG,
            type = $(e.target).parent().data('type');

        //如果传入了排序方法，则使用传入的方法，否则使用默认排序方法（降序）
        if (CFG.sortMethods[type]) {
            this.data.sort(CFG.sortMethods[type]);            
        } else {           
            this.sortByDefault(type);
        }
        this.renderUI();
    },   

    //默认排序方法：降序与升序切换
    sortByDefault: function(type) {
        if (this.sortFlag) {
            this.data.sort(function(a, b) {
                return b[type] - a[type]
            });
            this.sortFlag = false;
        } else {
            this.data.sort(function(a, b) {
                return a[type] - b[type]
            });
            this.sortFlag = true;
        }
    },

    //事件绑定
    bindEvent: function() {
        var CFG = this.CFG,
            self = this;
        this.table.on('click', '.sort-icon', this.sortData.bind(this));
    }
}