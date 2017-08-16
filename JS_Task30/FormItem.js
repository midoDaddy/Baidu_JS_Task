/*
* @Author: 63431
* @Date:   2017-08-16 15:24:28
* @Last Modified by:   63431
* @Last Modified time: 2017-08-16 17:48:21
*/

//合并对象
function extend(obj1, obj2) {
    for (var item in obj2) {
        if (obj2.hasOwnProperty(item)) {
            obj1[item] = obj2[item];
        }
    }
    return obj1;
}

//定义表单项构造函数
function FormItem(cfg) {
    this.cfg = {
        id: null,
        maxLength: null,
        minLength: null,
        required: true,
        pattern: null,
        equalTo: null,
        errorTip: '格式错误',
        passTip: '格式正确',
        requiredTip: '必填项，不能为空',
        defaultTip: '',
        tipContainer: null
    };
    this.CFG = extend(this.cfg, cfg);
    this.elem = document.getElementById(this.CFG.id);
    this.tipContainer = this.CFG.tipContainer || this.elem.nextElementSibling;
}

FormItem.prototype = {
    
    constructor: FormItem, 

    //显示提示信息   
    showTip: function(msg, color) {
        this.elem.style.borderColor = color;     
        this.tipContainer.style.color = color;
        this.tipContainer.innerHTML = msg;
    },

    //显示默认提示
    showDefaultTip: function() {       
        this.showTip(this.CFG.defaultTip, '#999');
    },

    //验证表单值
    validate: function(){
        var cfg = this.CFG,
            value = this.elem.value.trim(),
            length = value.replace(/[^\x00-\xff]/g, 'aa').length,
            errorTip = cfg.errorTip;

        //验证必填项是否为空
        if (cfg.required) {
            if (length === 0) {
                this.showTip(cfg.requiredTip, 'red');
                return false;
            }
        }
        //验证最大长度
        if (cfg.maxLength) {
            if (length > cfg.maxLength) {
                this.showTip(errorTip, 'red');
                return false;
            }
        }
        //验证最小长度
        if (cfg.minLength) {
            if (length < cfg.minLength) {
                this.showTip(errorTip, 'red');
                return false;
            }
        }
        //验证是否匹配正则表达式
        if (cfg.pattern) {
            if (!cfg.pattern.test(value)) {
                this.showTip(errorTip, 'red');
                return false;
            }
        }       
        //验证是否等于特定值
        if (cfg.equalTo) {
            if (value !== cfg.equalTo.value.trim()) {
                this.showTip(errorTip, 'red');
                return false;
            }
        }
        //如果验证通过，显示通过提示       
        this.showTip(cfg.passTip, 'green');
        return true;
    },
    
    //绑定事件：获取焦点时显示默认提示，失去焦点时验证表单项值
    bindEvent: function() {
        this.elem.addEventListener('focus', this.showDefaultTip.bind(this));
        this.elem.addEventListener('blur', this.validate.bind(this));
    },
}