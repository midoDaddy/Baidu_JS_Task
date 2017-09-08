/*
* @Author: midoDaddy
* @Date:   2017-08-31 14:46:20
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-08 23:04:19
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
    this.maxHeight = 0;
    this.count = 1;
    this.init();   
}

BucketLayout.prototype = {

    constructor: BucketLayout,
    
    //初始化
    init: function() {
        this.renderWrapper();
        this.renderImg(this.CFG.data.init);       
        this.bindEvent();
    },

    //渲染UI
    renderWrapper: function() {
        var CFG = this.CFG,
            self = this;
        this.wrapper = $('<div class="bucket-layout-wrapper"></div>')
            .appendTo(CFG.container)
            .width(CFG.container.width());       
    },

    renderImg: function(data) {
        var CFG = this.CFG,
            self = this;
        $.each(data, function(index, item) {
            self.rowGroup.push(item);
            if (self.rowGroup.length >= CFG.minCount) {
                self.setRowHeight();
            }
        });
    },

    setRowHeight: function() {
        var CFG = this.CFG,
            totalRatio = 0,
            length = this.rowGroup.length,
            rowHeight;
        $.each(this.rowGroup, function(index, item) {
            totalRatio += item.initWidth/item.initHeight; 
        });
        rowHeight = (CFG.totalWidth - CFG.padding*2*length)/totalRatio;
        if (rowHeight <= CFG.maxHeight || rowHeight >= CFG.maxHeight && length === CFG.maxCount) {
            $.each(this.rowGroup, function(index, item) {
                item.height = rowHeight;                  
            });
            this.maxHeight += rowHeight + CFG.padding*2; 
            this.renderRowGroup();
            this.rowGroup.length = 0;
        }
    },

    renderRowGroup: function() {
        var html = '';
        $.each(this.rowGroup, function(index, item) {
            html += '<div class="img-con">' +
                '<img src="' + item.src + '" height="' + item.height + 'px">' +
            '</div>';
        });
        $('<div class="row-group">' + html + '</div>').appendTo(this.wrapper)
            .find('.img-con')
            .css({
                float: 'left',
                padding: this.CFG.padding
            });
    },

    //加载更多图片
    loadMore: function() {
        var maxHeight = this.wrapper.offset().top + this.maxHeight,
            scrollTop = $(window).height() + $(window).scrollTop();       
        if (scrollTop > maxHeight) {
            this.renderImg(this.CFG.data.plus);
        }

    },

    //绑定事件
    bindEvent: function() {
        $(window).on('scroll', this.loadMore.bind(this));
    }

}