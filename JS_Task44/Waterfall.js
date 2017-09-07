/*
* @Author: midoDaddy
* @Date:   2017-08-31 14:46:20
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-07 15:22:11
*/
var Waterfall = function(cfg) {    
    this.cfg = {
        data: null,
        container: null,
        imgWidth: 200,
        padding: 10
    },
    this.CFG = $.extend(this.cfg, cfg);
    this.heightData = [];
    this.imgsArr = [];
    this.init();     
}

Waterfall.prototype = {

    constructor: Waterfall,
    
    //初始化
    init: function() {
        this.getCols();
        this.renderUI();    
        this.bindEvent();
    },

    //计算图片列数
    getCols: function() {
        var CFG = this.CFG,
            totalWidth = CFG.container.width() || $('body').width();
        this.cols = Math.floor(totalWidth/(CFG.imgWidth + CFG.padding*2));
    },

    //渲染UI
    renderUI: function() {
        var CFG = this.CFG,
            self = this;

        //添加包裹层
        this.wrapper = $('<div class="waterfall-wrapper"></div>')
            .appendTo(CFG.container)
            .css({
                position: 'relative',
                width: (CFG.imgWidth + CFG.padding*2)*this.cols,
                margin: '0 auto'
            });

        //添加图片
        this.renderImg(CFG.data.init);
        this.setImgPos();
    },

    //添加图片
    renderImg: function(data) {
        var html = '';
        $.each(data, function(index, item) {
            html += '<div class="img-con"><img src="' + item.src + '"></div>';
        })
        $(html).appendTo(this.wrapper);
        this.wrapper.find('.img-con').css({
                position: 'absolute',
                padding: this.CFG.padding
            }).find('img').css({
                width: this.CFG.imgWidth,
                height: 'auto',
                cursor: 'pointer'
            });;       
    },


    //图片定位
    setImgPos: function() {
        var CFG = this.CFG,
            self = this;
        this.wrapper.find('img').on('load', function() {
            var $imgCon = $(this).parent(),
                innerWidth = $imgCon.innerWidth(),
                innerHeight = $imgCon.innerHeight(),
                length = self.heightData.length;
            if (length < self.cols) {
                self.heightData.push(innerHeight);
                $imgCon.css('left', length*innerWidth + 'px');
            } else {
                var minHeight = Math.min.apply(null, self.heightData);
                    minIndex = self.heightData.indexOf(minHeight);
                $imgCon.css({
                    top: minHeight + 'px',
                    left: innerWidth*minIndex + 'px'
                });
                self.heightData[minIndex] = minHeight + innerHeight;
            } 
            self.imgsArr.push($(this));           
        });        
    },


    //页面滚动到底部时，加载更多图片
    loadMore: function() {
        var scrollTop = $(window).height() + $(window).scrollTop(),
            length = this.wrapper.find('img').length; 

        //当前数据中的图片全部加载完成后，执行是否加载更多的判断
        if (this.imgsArr.length === length) {
            var lastImg = this.imgsArr[length - 1];
            if (scrollTop > lastImg.offset().top) {
                this.renderImg(this.CFG.data.plus);
                this.setImgPos();
            }
        }       
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
        $(window).on('scroll', this.loadMore.bind(this));
    }

}