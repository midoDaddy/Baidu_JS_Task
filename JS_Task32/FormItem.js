/*
* @Author: 63431
* @Date:   2017-08-16 15:24:28
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-08-18 10:37:38
*/

//合并对象
function extend(obj1, obj2) {
    var newObj = {};
    for (var item in obj1) {
        if (obj1.hasOwnProperty(item)) {
            newObj[item] = obj1[item];
        }
    }
    for (var item in obj2) {
        if (obj2.hasOwnProperty(item)) {
            newObj[item] = obj2[item];
        }
    }
    return newObj;
}

//定义表单项构造函数
function FormItem(cfg) {
    this.cfg = {
        //表单元素
        container: null,
        label: null,
        type: 'input',
        inputType: 'text',
        tipFlag: true,
        options: [], 
        //元素属性
        id: '',
        value: '',
        name: '',         
        optionValues: [],               
        cols: 50,
        rows: 5,            
        //表单样式
        basicTheme: 'form-item-basic',
        specialTheme: '',
        //验证规则
        required: true,
        maxLength: null,
        minLength: null,        
        pattern: null,
        equalTo: null,
        validator: null,
        //提示信息
        errorTip: '格式错误',
        successTip: '格式正确',
        requiredTip: '必填项，不能为空',
        rulesTip: '必填项，不能为空'
    };
    this.CFG = extend(this.cfg, cfg);
    this.init();
}

FormItem.prototype = {
    
    constructor: FormItem, 

    //初始化
    init: function() {
        this.createFormItem();
        this.bindEvent();
    },
    
    //创建表单项
    createFormItem: function() {
        this.createWrapper();
        this.createLabel();
        this.createFormElem();       
        this.createTip();                    
    },
    
    //创建wrapper
    createWrapper: function() {
        var cfg = this.CFG;
        this.wrapper = document.createElement('div');
        this.wrapper.className = cfg.specialTheme ? 
            (cfg.basicTheme + ' ' + cfg.specialTheme) : cfg.basicTheme;
        cfg.container.appendChild(this.wrapper);
    },

    //创建label
    createLabel: function() {
        var cfg = this.CFG;
        if (cfg.label) {
            this.label = document.createElement('label');
            this.label.for = cfg.id;
            this.label.innerHTML = cfg.label; 
            this.wrapper.appendChild(this.label);
        }
    },

    //创建tip
    createTip: function() {
        var cfg = this.CFG;
        if (cfg.tipFlag) {
            this.tip = document.createElement('p');
            this.tip.className = 'tip';
            this.wrapper.appendChild(this.tip);
        }  
    },

    //创建表单元素
    createFormElem: function() {
        var cfg = this.CFG;
        switch(cfg.type) {
            case 'input': this.formElem = this.createInput();
                break;
            case 'select': this.formElem = this.createSelect();
                break;
            case 'textarea': this.formElem = this.createTextarea();
                break;
        } 
        this.formElem.id = cfg.id;
        cfg.name && (this.formElem.name = cfg.name);
        cfg.value && (this.formElem.value = cfg.value);  
        this.wrapper.appendChild(this.formElem);
    },
    
    //创建input表单项
    createInput: function() {
        var item = document.createElement('input');
        item.type = this.CFG.inputType;
        return item;
    },

    //创建textarea表单项
    createTextarea: function() {
        var cfg = this.CFG,
            item = document.createElement('textarea');
        item.cols = cfg.cols;
        item.rows = cfg.rows;
        return item;
    },

    //创建select表单项
    createSelect: function() {
        var cfg = this.CFG,
            item = document.createElement('select'),
            html = '';
        cfg.options.forEach(function(item, index) {
            var valueHtml = cfg.optionValues[index] ? 
                ('value="' + cfg.optionValues[index] + '"') : '';
            html += '<option ' + valueHtml + '>' + item + '</option>';
        });
        item.innerHTML = html;
        return item;
    },

    //显示错误信息
    showErrorTip: function(msg) {
        this.tip.innerHTML = msg ? msg : this.cfg.errorTip;
        this.formElem.className = 'error-item';
        this.tip.className = 'tip error-tip';
    },

    //显示成功信息
    showSuccessTip: function() {
        this.tip.innerHTML = this.cfg.successTip;
        this.formElem.className = 'success-item';
        this.tip.className = 'tip success-tip';
    },

    //显示默认信息
    showRulesTip: function() {
        this.tip.innerHTML = this.cfg.rulesTip;
        this.formElem.className = '';
        this.tip.className = 'tip';
    },

    //更换表单主题样式
    changeTheme: function(className) {
        this.wrapper.className = this.cfg.basicTheme + ' ' + className;
    },
    
    //验证表单值
    validate: function(){
        var cfg = this.CFG,
            value = this.formElem.value.trim(),
            length = value.replace(/[^\x00-\xff]/g, 'aa').length,
            errorTip = cfg.errorTip;

        //验证必填项是否为空
        if (cfg.required) {
            if (length === 0) {
                this.showErrorTip(cfg.requiredTip);
                return false;
            }
        }
        //验证最大长度
        if (cfg.maxLength) {
            if (length > cfg.maxLength) {
                this.showErrorTip();
                return false;
            }
        }
        //验证最小长度
        if (cfg.minLength) {
            if (length < cfg.minLength) {
                this.showErrorTip();
                return false;
            }
        }
        //验证是否匹配正则表达式
        if (cfg.pattern) {
            if (!cfg.pattern.test(value)) {
                this.showErrorTip();
                return false;
            }
        }       
        //验证是否等于特定值
        if (cfg.equalTo) {
            if (value !== cfg.equalTo.value.trim()) {
                this.showErrorTip();
                return false;
            }
        }
        //验证是否符合自定义规则
        if (cfg.validator) {
            if (!cfg.validator(value)) {
                this.showErrorTip();
                return false;
            }
        }
        //如果验证通过，显示通过提示       
        this.showSuccessTip();
        return true;
    },
    
    //绑定事件：获取焦点时显示默认提示，失去焦点时验证表单项值
    bindEvent: function() {
        this.formElem.addEventListener('focus', this.showRulesTip.bind(this));
        this.formElem.addEventListener('blur', this.validate.bind(this));
    },
}