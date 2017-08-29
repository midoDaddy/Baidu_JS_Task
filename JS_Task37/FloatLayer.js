/*
* @Author: midoDaddy
* @Date:   2017-08-29 16:46:20
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-08-29 18:13:51
*/

var FloatLayer = function(cfg) {
    this.cfg = {
        width: 400,
        height: 250,
        title: '这是标题',
        content: '这是内容',
        hasMask: true,
        hasConfirmBtn: true,
        confirmBtnHandler: function() {
            console.log('confirm');
        },
        confirmBtnTxt: '确定',
        hasCancelBtn: true,
        cancelBtnHandler: function() {
            console.log('cancel');
        },
        cancelBtnTxt: '取消',
        hasCloseBtn: true,
        closeBtnHandler: function() {
            console.log('close');
        },
        theme: null,
        x: null,
        y: null,
    }
    this.CFG = $.extend(this.cfg, cfg);
    this.init();
}

FloatLayer.prototype = {

    constructor: FloatLayer,

    init: function() {
        this.create();
        this.bindEvent();
    },

    create: function() {
        var CFG = this.CFG;

        this.wrapper = $('<div class="float-layer-wrapper"></div>').appendTo('body');

        if (CFG.hasMask) {
            this.mask = $(' <div class="float-layer-mask"></div>').appendTo(this.wrapper);
        }

        this.box = $('<div class="float-layer-box">' + 
                        '<div class="float-layer-header">' +
                            '<span class="header-txt">' + CFG.title + '</span>' + 
                        '</div>' + 
                        '<div class="float-layer-content">' +
                            '<span class="content-txt">' + CFG.content + '</span>' +
                        '</div>' +
                        '<div class="float-layer-footer"></div>' +
                    '</div>').appendTo(this.wrapper);

        if (CFG.hasCloseBtn) {
            this.closeBtn = $('<i class="close-btn"></i>')
                .appendTo(this.box.find('.float-layer-header'));
        }

        if (CFG.hasConfirmBtn) {
            this.confirmBtn = $('<div class="footer-btn confirm-btn">' + CFG.confirmBtnTxt + '</div>')
                .appendTo(this.box.find('.float-layer-footer'));
        }

        if (CFG.hasCancelBtn) {
            this.cancelBtn = $('<div class="footer-btn cancel-btn">' + CFG.cancelBtnTxt + '</div>')
                .appendTo(this.box.find('.float-layer-footer'));
        }
    },

    remove: function() {
        this.wrapper.remove();
    },

    bindEvent: function() {
        var self = this,
            CFG = this.CFG;
        this.confirmBtn.on('click', function() {
            self.remove();
            CFG.confirmBtnHandler &&  CFG.confirmBtnHandler();
        });
        this.cancelBtn.on('click', function() {
            self.remove();
            CFG.cancelBtnHandler &&  CFG.cancelBtnHandler();
        });
        this.closeBtn.on('click', function() {
            self.remove();
            CFG.closeBtnHandler &&  CFG.closeBtnHandler();
        });
    }

}