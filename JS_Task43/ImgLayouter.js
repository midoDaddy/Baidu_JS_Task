/*
* @Author: midoDaddy
* @Date:   2017-08-31 14:46:20
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-06 00:59:59
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
        var CFG = this.CFG,
            width = CFG.width,
            height = CFG.height,
            firstImg = this.imgElems[0],
            secondImg = this.imgElems[1],
            thirdImg = this.imgElems[2],
            firstImgWidth = width - height/2;

        firstImg.css({
            top: 0, 
            left: 0
        });
        this.clipImgTo(firstImg, firstImgWidth, height);

        secondImg.css({
            top: 0, 
            left: firstImgWidth + 'px'
        });
        this.clipImgTo(secondImg, height/2, height/2);

        thirdImg.css({
            top: height/2 + 'px', 
            left: firstImgWidth + 'px'
        });
        this.clipImgTo(thirdImg, height/2, height/2);
    },

    //四张图片
    byFour: function() {
        var CFG = this.CFG,
            width = CFG.width,
            height = CFG.height,
            firstImg = this.imgElems[0],
            secondImg = this.imgElems[1],
            thirdImg = this.imgElems[2],
            fourthImg = this.imgElems[3];

        firstImg.css({
            top: 0, 
            left: 0
        });
        this.clipImgTo(firstImg, width/2, height/2);

        secondImg.css({
            top: 0, 
            left: width/2 + 'px'
        });
        this.clipImgTo(secondImg, width/2, height/2);

        thirdImg.css({
            top: height/2 + 'px', 
            left: 0
        });
        this.clipImgTo(thirdImg, width/2, height/2);

        fourthImg.css({
            top: height/2 + 'px', 
            left: width/2 + 'px'
        });
        this.clipImgTo(fourthImg, width/2, height/2);
    },

    //五张图片
    byFive: function() {
        var CFG = this.CFG,
            width = CFG.width,
            height = CFG.height,
            firstImg = this.imgElems[0],
            secondImg = this.imgElems[1],
            thirdImg = this.imgElems[2],
            fourthImg = this.imgElems[3],
            fifthImg = this.imgElems[4];

        firstImg.css({
            top: 0, 
            left: 0
        });
        this.clipImgTo(firstImg, width*2/3, height*2/3);

        secondImg.css({
            top: height*2/3 + 'px', 
            left: 0
        });
        this.clipImgTo(secondImg, width/3, height/3);

        thirdImg.css({
            top: height*2/3 + 'px', 
            left: width/3 + 'px'
        });
        this.clipImgTo(thirdImg, width/3, height/3);

        fourthImg.css({
            top: 0, 
            left: width*2/3 + 'px'
        });
        this.clipImgTo(fourthImg, width/3, width/3);

        fifthImg.css({
            top: width/3 + 'px', 
            left: width*2/3 + 'px'
        });
        this.clipImgTo(fifthImg, width/3, height - width/3);
    },

    //六张图片
    bySix: function() {
        var CFG = this.CFG,
            width = CFG.width,
            height = CFG.height,
            firstImg = this.imgElems[0],
            secondImg = this.imgElems[1],
            thirdImg = this.imgElems[2],
            fourthImg = this.imgElems[3],
            fifthImg = this.imgElems[4],
            sixthImg = this.imgElems[5];

        firstImg.css({
            top: 0, 
            left: 0
        });
        this.clipImgTo(firstImg, width*2/3, height*2/3);

        secondImg.css({
            top: height*2/3 + 'px', 
            left: 0
        });
        this.clipImgTo(secondImg, width/3, height/3);

        thirdImg.css({
            top: height*2/3 + 'px', 
            left: width/3 + 'px'
        });
        this.clipImgTo(thirdImg, width/3, height/3);

        fourthImg.css({
            top: 0, 
            left: width*2/3 + 'px'
        });
        this.clipImgTo(fourthImg, width/3, height/3);

        fifthImg.css({
            top: height/3 + 'px', 
            left: width*2/3 + 'px'
        });
        this.clipImgTo(fifthImg, width/3, height/3);

        sixthImg.css({
            top: height*2/3 + 'px', 
            left: width*2/3 + 'px'
        });
        this.clipImgTo(sixthImg, width/3, height/3);
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
                    top: parseInt(self.css('top'), 10) - heightDiff/2 + 'px'
                });
            } else {
                self.height(height);
                self.width(height*elWidth/elHeight);
                widthDiff = self.width() - width;
                clipLeft = widthDiff/2 + 'px';
                clipRight = self.width() - widthDiff/2 + 'px';
                self.css({
                    clip: 'rect(0,' + clipRight + ',' + height + 'px,' + clipLeft + ')',
                    left: parseInt(self.css('left'), 10) - widthDiff/2 + 'px'
                });
            }
        })        
    }

}