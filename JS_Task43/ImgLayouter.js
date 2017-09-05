/*
* @Author: midoDaddy
* @Date:   2017-08-31 14:46:20
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-05 23:52:50
*/
var ImgLayouter = function(cfg) {    
    this.cfg = {
        container: null,
        data: null,
        width: 600,
        height: 450,
    },
    this.CFG = $.extend(this.cfg, cfg);
    this.imgElems = [];
    this.init();
      
}

ImgLayouter.prototype = {

    constructor: ImgLayouter,
    
    //初始化
    init: function() {
        this.createWrapper();
        this.createImgs();
        this.layoutImag();
    },
    
    //创建图片容器
    createWrapper: function() {
        var CFG = this.CFG;
        this.wrapper = $('<div class="layouter-wrapper"></div>')
            .appendTo(CFG.container)
            .css({
                width: CFG.width + 'px',
                height: CFG.height + 'px'
            });;
    },

    //创建图片元素
    createImgs: function() {
        var data = this.CFG.data,
            self = this;
        data.forEach(function(el, index) {
            var imgElem = $('<img src="' + el.url + '">').appendTo(self.wrapper);
            self.imgElems.push(imgElem);
        });
    },

    //布局图片
    layoutImag: function() {
        switch(this.imgElems.length) {
            case 1: this.byOne();
                break;
            case 2: this.byTwo();
                break;
            case 3: this.byThree();
                break;
            case 4: this.byFour();
                break;
            case 5: this.byFive();
                break;
            case 6: this.bySix();
                break;
        }
    },
    
    //一张图片
    byOne: function() {
        this.clipImgTo(this.imgElems[0], this.CFG.width, this.CFG.height);
    },

    //两张图片
    byTwo: function() {

    },

    //三张图片
    byThree: function() {

    },

    //四张图片
    byFour: function() {

    },

    //五张图片
    byFive: function() {

    },

    //六张图片
    bySix: function() {

    },

    //剪切图片至目标尺寸
    clipImgTo: function(el, width, height) {
        var elWidth, elHeight, heightDiff, widthDiff, 
            clipTop, clipBottom, clipLeft, clipRight;
        el.on('load', function() {
            var self = $(this);
            elWidth = $(this).width();
            elHeight = $(this).height();
            if (elWidth/elHeight < width/height) {
                self.width(width);
                self.height(width*elHeight/elWidth);
                heightDiff = self.height() - height;
                clipTop = heightDiff/2 + 'px';
                clipBottom = self.height() - heightDiff/2 + 'px';
                self.css({
                    clip: 'rect(' + clipTop + ',' + width + 'px,' + clipBottom + ',0)',
                    top: '-' + clipTop
                });
            } else {
                self.height(height);
                self.width(height*elWidth/elHeight);
                widthDiff = self.width() - width;
                clipLeft = widthDiff/2 + 'px';
                clipRight = self.width() - widthDiff/2 + 'px';
                self.css({
                    clip: 'rect(0,' + clipRight + ',' + height + 'px,' + clipLeft + ')',
                    left: '-' + clipLeft
                });
            }
        })
        

        
    }

}