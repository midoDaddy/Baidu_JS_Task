/*
* @Author: midoDaddy
* @Date:   2017-08-29 16:46:20
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-08-30 16:17:47
*/

var FloatLayer = function(cfg) {

    //默认配置参数
    this.cfg = {
        width: 400,
        minWidth: 250,
        height: 250,
        minHeight: 150,
        x: null,
        y: null,
        theme: null,
        title: '这是标题',
        content: '这是内容',
        hasMask: true,
        hasConfirmBtn: true,       
        confirmBtnTxt: '确定',
        confirmBtnHandler: function() {
            alert('confirmBtnHandler');
        },
        hasCancelBtn: true,
        cancelBtnTxt: '取消',
        cancelBtnHandler: function() {
            alert('cancelBtnHandler');
        },        
        hasCloseBtn: true,
        closeBtnHandler: function() {
            alert('closeBtnHandler');
        },
        dragMove: true,
        dragCornerZoom: true,   
        dragBorderZoom: true   
    }
    this.CFG = $.extend(this.cfg, cfg);
    this.init();
}

FloatLayer.prototype = {

    constructor: FloatLayer,

    init: function() {
        this.render();
        this.bindEvent();
    },
    
    //渲染浮出层
    render: function() {

        var CFG = this.CFG;
        this.wrapper = $('<div class="float-layer-wrapper"></div>').appendTo('body');

        //渲染遮罩层
        if (CFG.hasMask) {
            this.mask = $(' <div class="float-layer-mask"></div>').appendTo(this.wrapper);
        }

        //渲染窗口
        this.box = $('<div class="float-layer-box">' + 
                        '<div class="float-layer-header">' +
                            '<span class="header-txt">' + CFG.title + '</span>' + 
                        '</div>' + 
                        '<div class="float-layer-content">' +
                            '<span class="content-txt">' + CFG.content + '</span>' +
                        '</div>' +
                        '<div class="float-layer-footer"></div>' +
                    '</div>').appendTo(this.wrapper)
                    .css({
                        width: CFG.width + 'px',
                        height: CFG.height + 'px',
                        left: CFG.x || ($(window).width() - CFG.width)/2 + 'px',
                        top: CFG.y || ($(window).height() - CFG.height)/2 + 'px',
                    }) ; 

        //渲染关闭按钮
        if (CFG.hasCloseBtn) {
            this.closeBtn = $('<i class="close-btn"></i>')
                .appendTo(this.box.find('.float-layer-header'));
        } 

        //渲染确认按钮
        if (CFG.hasConfirmBtn) {
            this.confirmBtn = $('<div class="footer-btn confirm-btn">' + CFG.confirmBtnTxt + '</div>')
                .appendTo(this.box.find('.float-layer-footer'));
        }  

        //渲染取消按钮
        if (CFG.hasCancelBtn) {
            this.cancelBtn = $('<div class="footer-btn cancel-btn">' + CFG.cancelBtnTxt + '</div>')
                .appendTo(this.box.find('.float-layer-footer'));
        }

        //添加主题样式
        if (CFG.theme) {
            this.wrapper.addClass(CFG.theme)
        }

        //渲染角缩放控件
        if (CFG.dragCornerZoom) {
            $('<ul class="corner-zoom-list">' +
               '<li class="corner-zoom-item left-top"></li>' + 
               '<li class="corner-zoom-item right-top"></li>' +
               '<li class="corner-zoom-item right-bottom"></li>' + 
               '<li class="corner-zoom-item left-bottom"></li>' + 
            '</ul>').appendTo(this.box);
        }
        
        //渲染边缩放控件
        if (CFG.dragBorderZoom) {
            $('<ul class="border-zoom-list">' +
               '<li class="border-zoom-item left"></li>' + 
               '<li class="border-zoom-item right"></li>' +
               '<li class="border-zoom-item bottom"></li>' + 
               '<li class="border-zoom-item top"></li>' + 
            '</ul>').appendTo(this.box);
        }
    },
    
    //清除浮出层
    remove: function() {
        this.wrapper.remove();
    },

    //拖拽移动事件函数
    dragMove: function(e) {
        var distX = e.clientX - parseInt(this.box.css('left'), 10),
            distY = e.clientY - parseInt(this.box.css('top'), 10),
            self = this;
        $(document).on('mousemove', function(e) {
            var left = e.clientX - distX,
                top = e.clientY - distY,
                maxX = $(window).width() - self.box.width(),
                maxY = $(window).height() - self.box.height();
            left = Math.min(maxX, Math.max(left, 0));
            top = Math.min(maxY, Math.max(top, 0));
            self.box.css({
                left:  left + 'px',
                top:  top + 'px'
            })
        })       
    },

    //向左拖拽缩放
    zoomLeft: function(e) {
        var finalX = this.box.width() + parseInt(this.box.css('left'), 10),
            self = this;
        $(document).on('mousemove', function(e) {
            self.box.css({
                width: Math.max(finalX - e.clientX, self.CFG.minWidth) + 'px',
                left: e.clientX + 'px',
            });
        })
    },

    //向右拖拽缩放
    zoomRight: function(e) {
        var self = this;
        $(document).on('mousemove', function(e) {
            var width = e.clientX - parseInt(self.box.css('left'), 10);
            self.box.css({
                width: Math.max(width, self.CFG.minWidth) + 'px',
            });
        })
    },

    //向上拖拽缩放
    zoomTop: function(e) {
        var finalY = this.box.height() + parseInt(this.box.css('top'), 10),
            self = this;
        $(document).on('mousemove', function(e) {
            self.box.css({
                height: Math.max(finalY - e.clientY, self.CFG.minHeight)+ 'px',
                top: e.clientY+ 'px',
            });
        })
    },

    //向下拖拽缩放
    zoomBottom: function(e) {
        var self = this;
        $(document).on('mousemove', function(e) {
            var height = e.clientY - parseInt(self.box.css('top'), 10);
            self.box.css({
                height: Math.max(height, self.CFG.minHeight) + 'px',
            });
        })
    },

    
    //绑定事件
    bindEvent: function() {
        var self = this,
            CFG = this.CFG;

        //关闭窗口事件
        this.wrapper.on('click', function(e) {
            switch(e.target.className) {
                case 'close-btn': 
                    self.remove();
                    CFG.closeBtnHandler && CFG.closeBtnHandler();
                    break;
                case 'footer-btn confirm-btn':
                    self.remove();
                    CFG.confirmBtnHandler && CFG.confirmBtnHandler();
                    break;
                case 'footer-btn cancel-btn':
                    self.remove();
                    CFG.cancelBtnHandler && CFG.cancelBtnHandler();
                    break;
                case 'float-layer-mask':
                    self.remove();
                    break;
            }
        });

        //拖拽移动事件
        if (CFG.dragMove) {
            this.box.on('mousedown', '.float-layer-header', self.dragMove.bind(self));
        }

        //拖拽角缩放事件
        if (CFG.dragCornerZoom) {
            this.box.on('mousedown', function(e) {
                switch(e.target.className) {
                    case 'corner-zoom-item left-top': 
                        self.zoomLeft(e);
                        self.zoomTop(e);
                        break;
                    case 'corner-zoom-item right-top': 
                        self.zoomRight(e);
                        self.zoomTop(e);
                        break;
                    case 'corner-zoom-item left-bottom': 
                        self.zoomLeft(e);
                        self.zoomBottom(e);
                        break;
                    case 'corner-zoom-item right-bottom': 
                        self.zoomRight(e);
                        self.zoomBottom(e);
                        break;
                }
            })
        }

        //拖拽边缩放事件
        if (CFG.dragBorderZoom) {
            this.box.on('mousedown', function(e) {
                switch(e.target.className) {
                    case 'border-zoom-item left': self.zoomLeft();
                        break;
                    case 'border-zoom-item right': self.zoomRight();
                        break;
                    case 'border-zoom-item top': self.zoomTop();
                        break;
                    case 'border-zoom-item bottom': self.zoomBottom();
                        break;
                }
            })          
        }   
        
        //解除鼠标移动事件
        if(CFG.dragMove || CFG.dragCornerZoom || CFG.dragBorderZoom) {
            $(document).on('mouseup', function() {
                $(this).unbind('mousemove');
            });
        }       
    }

}