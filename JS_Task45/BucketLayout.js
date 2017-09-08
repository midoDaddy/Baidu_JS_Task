/*
* @Author: midoDaddy
* @Date:   2017-08-31 14:46:20
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-08 16:29:44
*/
var BucketLayout = function(cfg) {    
    this.cfg = {
        data: null,
        container: null,
        totalWidth: 1000,
        padding: 5,
        maxHeight: 300,
        maxCount: 6,
        minCount: 3
        
    },
    this.CFG = $.extend(this.cfg, cfg);
    this.rowGroup = [];
    this.init();   
}

BucketLayout.prototype = {

    constructor: BucketLayout,
    
    //初始化
    init: function() {
        this.renderUI();
        this.bindEvent();
    },

 
    //渲染UI
    renderUI: function() {
        var CFG = this.CFG,
            self = this;
        this.wrapper = $('<div class="bucket-layout-wrapper"></div>')
            .appendTo(CFG.container)
            .width(CFG.container.width());
        this.renderImg(CFG.data.init);       
    },

    renderImg: function(data) {
        var html = '';
        $.each(data, function(index, item) {
            html += '<div class="img-con"><img src="' + item.src + '"></div>'
        });
        this.wrapper.html(html).find('.img-con')
            .css({
                float: 'left',
                padding: this.CFG.padding
            })
            .find('img').css('width', 'auto');
    },

    layoutImg: function() {
        var CFG = this.CFG,
            self = this,
            rowGroup = this.rowGroup;
        this.wrapper.find('img').each(function() {
            var $this = $(this);
            rowGroup.push($this.parent());
            if (rowGroup.length >= CFG.minCount) {
                self.setRowHeight(rowGroup);
            }
        });
        if (rowGroup.length > 0) {
            $.each(rowGroup, function(index, item) {
                item.find('img').css({
                    width: 'auto',
                    height: CFG.maxHeight + 'px'
                });                  
            })
        }
    },

    setRowHeight: function(data) {
        var CFG = this.CFG,
            totalRatio = 0,
            length = data.length,
            rowHeight;
        $.each(data, function(index, item) {
            var $img = item.find('img');
            totalRatio += $img.width()/$img.height();                    
        })
        rowHeight = (CFG.totalWidth - CFG.padding*2*length)/totalRatio;
        if (rowHeight <= CFG.maxHeight || rowHeight >= CFG.maxHeight && length === CFG.maxCount) {
            $.each(data, function(index, item) {
                item.find('img').css({
                    width: 'auto',
                    height: rowHeight + 'px'
                });                  
            })
            this.rowGroup.length = 0;
        }
    },

    //绑定事件
    bindEvent: function() {
        $(window).on('load', this.layoutImg.bind(this))
    }

}