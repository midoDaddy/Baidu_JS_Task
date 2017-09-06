/*
* @Author: midoDaddy
* @Date:   2017-08-31 14:46:20
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-06 22:42:09
*/
var Waterfall = function(cfg) {    
    this.cfg = {
        data: null,
        container: null,
        imgWidth: 200,
        margin: 20
    },
    this.CFG = $.extend(this.cfg, cfg);
    this.heightData = [];
    this.init();     
}

Waterfall.prototype = {

    constructor: Waterfall,
    
    //初始化
    init: function() {
        this.getCols();
        this.createWrapper();      
        this.renderImg();
        this.bindEvent();
    },

    //计算图片列数
    getCols: function() {
        var CFG = this.CFG,
            totalWidth = CFG.container.width() || $('body').width();
        this.cols = Math.floor((totalWidth + CFG.margin)/(CFG.imgWidth + CFG.margin));
    },

    //创建包裹层
    createWrapper: function() {
        var CFG = this.CFG;
        this.wrapper = $('<div class="waterfall-wrapper"></div>')
            .appendTo(CFG.container)
            .css({
                position: 'relative',
                width: CFG.imgWidth*this.cols + CFG.margin*(this.cols - 1),
                margin: '0 auto'
            });
    },

    //渲染图片
    renderImg: function() {
        var CFG = this.CFG,
            self = this;
        CFG.data.forEach(function(item, index) {
            $('<img src="' + item + '">').appendTo(self.wrapper)
                .css({
                    position: 'absolute',
                    width: CFG.imgWidth + 'px',
                    height: 'auto',
                    cursor: 'pointer'
                })
                .on('load', function() {
                    if (index < self.cols) {
                        self.heightData.push($(this).height());
                        $(this).css('left', (CFG.imgWidth + CFG.margin)*index + 'px');
                    } else {
                        var minHeight = Math.min.apply(null, self.heightData);
                            minIndex = self.heightData.indexOf(minHeight);
                        $(this).css({
                            top: minHeight + CFG.margin + 'px',
                            left: (CFG.imgWidth + CFG.margin)*minIndex + 'px'
                        });
                        self.heightData[minIndex] = minHeight + $(this).height() + CFG.margin;
                    }
                });            
        })
    },

    //全屏显示
    fullScreenShow: function(e) {
        var CFG = this.CFG,
            $target = $(e.target);

        this.fullScreenWrapper = $('<div class="full-screen-wrapper"></div>')
            .appendTo(CFG.container)
            .css({
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            });

        this.fullScreenMask = $('<div class="full-screen-mask"></div>')
            .appendTo(this.fullScreenWrapper)
            .css({
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.8)'
            })
            .on('click', function(){
                $(this).parent().remove();
            });

        this.fullScreenImg = $('<img>').appendTo(this.fullScreenWrapper)
            .attr('src', $target.attr('src'))
            .css({
                position: 'absolute',
                top: '50%',
                left: '50%'
            })
            .on('load', function() {
                if ($(this).width() > $(window).width()*0.8) {
                    $(this).width($(window).width()*0.8);
                    $(this).css('height', 'auto');
                }

                if ($(this).height() > $(window).height()*0.8) {
                    $(this).height($(window).height()*0.8);
                    $(this).css('width', 'auto');
                }
                $(this).css({
                    marginTop: -$(this).height()/2 + 'px',
                    marginLeft: -$(this).width()/2 + 'px',
                });
            })
    },
    
    //绑定事件
    bindEvent: function() {
        this.wrapper.on('click', 'img', this.fullScreenShow.bind(this));
    }

}