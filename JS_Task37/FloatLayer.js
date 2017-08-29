/*
* @Author: midoDaddy
* @Date:   2017-08-29 16:46:20
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-08-29 23:03:05
*/

var FloatLayer = function(cfg) {

    //默认配置参数
    this.cfg = {
        width: 400,
        height: 250,
        x: null,
        y: null,
        theme: null,
        title: '这是标题',
        content: '这是内容',
        hasMask: true,
        hasConfirmBtn: true,       
        confirmBtnTxt: '确定',
        confirmBtnHandler: function() {
            console.log('confirm');
        },
        hasCancelBtn: true,
        cancelBtnTxt: '取消',
        cancelBtnHandler: function() {
            console.log('cancel');
        },        
        hasCloseBtn: true,
        closeBtnHandler: function() {
            console.log('close');
        }        
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
    },
    
    //清除浮出层
    remove: function() {
        this.wrapper.remove();
    },
    
    //绑定事件
    bindEvent: function() {
        var self = this,
            CFG = this.CFG;
        this.confirmBtn.on('click', function() {
            self.remove();
            CFG.confirmBtnHandler && CFG.confirmBtnHandler();
        });
        this.cancelBtn.on('click', function() {
            self.remove();
            CFG.cancelBtnHandler && CFG.cancelBtnHandler();
        });
        this.closeBtn.on('click', function() {
            self.remove();
            CFG.closeBtnHandler && CFG.closeBtnHandler();
        });
        this.mask.on('click', function() {
            self.remove();
        });
    }

}