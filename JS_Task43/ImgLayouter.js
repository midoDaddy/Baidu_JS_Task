/*
* @Author: midoDaddy
* @Date:   2017-08-31 14:46:20
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-06 14:36:31
*/
var ImgLayouter = function(cfg) {    
    this.cfg = {
        container: $('#wrapper'),
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
        this.layoutImg();
    },
    
    //创建图片容器
    createWrapper: function() {
        var CFG = this.CFG;
        this.wrapper = $('<div class="layouter-wrapper"></div>')
            .appendTo(CFG.container)
            .css({
                width: CFG.width + 'px',
                height: CFG.height + 'px',
                position: 'relative'
            });;
    },

    //创建图片元素
    createImgs: function() {
        var data = this.CFG.data,
            self = this;
        data.forEach(function(el, index) {
            var imgElem = $('<img src="' + el.url + '">').appendTo(self.wrapper)
                .css({
                    position: 'absolute',
                    top: 0,
                    left: 0
                });
            self.imgElems.push(imgElem);
        });
    },

    //布局图片
    layoutImg: function() {
        switch(this.imgElems.length) {
            case 1: this.forOne();
                break;
            case 2: this.forTwo();
                break;
            case 3: this.forThree();
                break;
            case 4: this.forFour();
                break;
            case 5: this.forFive();
                break;
            case 6: this.forSix();
                break;
        }
    },
    
    //一张图片
    forOne: function() {
        this.clipImgTo(this.imgElems[0], this.CFG.width, this.CFG.height);
    },

    //两张图片
    forTwo: function() {
        var CFG = this.CFG,
            width = CFG.width,
            height = CFG.height,
            firstImg = this.imgElems[0],
            secondImg = this.imgElems[1],
            that = this;
        
        this.clipImgTo(firstImg, width*2/3, height); 

        firstImg.on('load', function() {
            var self = $(this),
                thisWidth = self.width(),
                thisHeight = self.height();
            if (thisWidth/thisHeight > width/height) {
                var widthDiff = thisWidth - width;
                that.setClipPath(self, 0, 0, width + widthDiff/2, 0, thisWidth/2, height, 0, height);
                self.css('left', -widthDiff/2 + 'px');
            } else {
                var heightDiff = thisHeight - height;
                that.setClipPath(self, 0, heightDiff/2, width, heightDiff/2, 
                    width/2, height + heightDiff/2, 0, height + heightDiff/2);
                self.css('top', -heightDiff/2 + 'px');
            }
        })

        secondImg.css('left', width/2 + 'px');
        this.clipImgTo(secondImg, width, height); 
        secondImg.on('load', function() {
            var self = $(this),
                thisWidth = self.width(),
                thisHeight = self.height();
            if (thisWidth/thisHeight > width/height) {
                var widthDiff = thisWidth - width;
                that.setClipPath(self, thisWidth/2, 0, width, 0, width, height, widthDiff/2, height);
                self.css('left', parseInt(self.css('left'), 10) - widthDiff/2 + 'px');
            } else {
                var heightDiff = thisHeight - height;
                that.setClipPath(self,  width/2, heightDiff/2, width, heightDiff/2, 
                    width, height + heightDiff/2, 0, height + heightDiff/2);
                self.css('top', -heightDiff/2 + 'px');
            }
        })
        
    },

    //三张图片
    forThree: function() {
        var CFG = this.CFG,
            width = CFG.width,
            height = CFG.height,
            firstImg = this.imgElems[0],
            secondImg = this.imgElems[1],
            thirdImg = this.imgElems[2],
            firstImgWidth = width - height/2;

        this.clipImgTo(firstImg, firstImgWidth, height);

        secondImg.css('left', firstImgWidth + 'px');
        this.clipImgTo(secondImg, height/2, height/2);

        thirdImg.css({
            top: height/2 + 'px', 
            left: firstImgWidth + 'px'
        });
        this.clipImgTo(thirdImg, height/2, height/2);
    },

    //四张图片
    forFour: function() {
        var CFG = this.CFG,
            width = CFG.width,
            height = CFG.height,
            firstImg = this.imgElems[0],
            secondImg = this.imgElems[1],
            thirdImg = this.imgElems[2],
            fourthImg = this.imgElems[3];

        this.clipImgTo(firstImg, width/2, height/2);

        secondImg.css('left', width/2 + 'px');
        this.clipImgTo(secondImg, width/2, height/2);

        thirdImg.css('top', height/2 + 'px');
        this.clipImgTo(thirdImg, width/2, height/2);

        fourthImg.css({
            top: height/2 + 'px', 
            left: width/2 + 'px'
        });
        this.clipImgTo(fourthImg, width/2, height/2);
    },

    //五张图片
    forFive: function() {
        var CFG = this.CFG,
            width = CFG.width,
            height = CFG.height,
            firstImg = this.imgElems[0],
            secondImg = this.imgElems[1],
            thirdImg = this.imgElems[2],
            fourthImg = this.imgElems[3],
            fifthImg = this.imgElems[4];

        this.clipImgTo(firstImg, width*2/3, height*2/3);

        secondImg.css('top', height*2/3 + 'px');
        this.clipImgTo(secondImg, width/3, height/3);

        thirdImg.css({
            top: height*2/3 + 'px', 
            left: width/3 + 'px'
        });
        this.clipImgTo(thirdImg, width/3, height/3);

        fourthImg.css('left', width*2/3 + 'px');
        this.clipImgTo(fourthImg, width/3, width/3);

        fifthImg.css({
            top: width/3 + 'px', 
            left: width*2/3 + 'px'
        });
        this.clipImgTo(fifthImg, width/3, height - width/3);
    },

    //六张图片
    forSix: function() {
        var CFG = this.CFG,
            width = CFG.width,
            height = CFG.height,
            firstImg = this.imgElems[0],
            secondImg = this.imgElems[1],
            thirdImg = this.imgElems[2],
            fourthImg = this.imgElems[3],
            fifthImg = this.imgElems[4],
            sixthImg = this.imgElems[5];

        this.clipImgTo(firstImg, width*2/3, height*2/3);

        secondImg.css('top', height*2/3 + 'px');
        this.clipImgTo(secondImg, width/3, height/3);

        thirdImg.css({
            top: height*2/3 + 'px', 
            left: width/3 + 'px'
        });
        this.clipImgTo(thirdImg, width/3, height/3);

        fourthImg.css('left', width*2/3 + 'px');
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

        el && el.on('load', function() {
            var self = $(this);
            elWidth = $(this).width();
            elHeight = $(this).height();
            
            //如果图片过长，裁剪高度
            if (elWidth/elHeight < width/height) {
                self.width(width);
                self.height(elHeight*width/elWidth);
                heightDiff = self.height() - height;
                clipTop = heightDiff/2 + 'px';
                clipBottom = self.height() - heightDiff/2 + 'px';
                self.css({
                    clip: 'rect(' + clipTop + ',' + width + 'px,' + clipBottom + ',0)',
                    top: parseInt(self.css('top'), 10) - heightDiff/2 + 'px'
                });
            } 
            
            //如果图片过宽，裁剪宽度
            else {
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
    },
    
    //设置clip-path样式
    setClipPath: function(el, x1, y1, x2, y2, x3, y3, x4, y4) {
        el && el.css({
            'clip-path': 'polygon(' + x1 + 'px ' + y1 + 'px,' + x2 + 'px ' + y2 + 'px,' +
                x3 + 'px ' + y3 + 'px,' + x4 + 'px ' + y4 + 'px)'
        })
    }

}