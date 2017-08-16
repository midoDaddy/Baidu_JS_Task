/*
* @Author: 63431
* @Date:   2017-08-08 22:02:21
* @Last Modified by:   63431
* @Last Modified time: 2017-08-16 17:33:39
*/

'use strict';
(function(){  
    
    //用户名表单项
    var usernameItem = new FormItem({
        id: 'username-input',
        maxLength: 16,
        minLength: 4,
        errorTip: '用户名格式有误，请输入4~16位字符',
        defaultTip: '必填，长度为4~16位字符'
    });
    
    //密码表单项
    var pwdItem = new FormItem({
        id: 'pwd-input',
        maxLength: 16,
        minLength: 6,
        errorTip: '密码格式有误，请输入6~16位英文或数字',
        defaultTip: '必填，长度为6~16位英文或数字'
    });
    
    //重复密码表单项
    var pwdConfirmItem = new FormItem({
        id: 'pwdConfirm-input',
        equalTo: document.getElementById('pwd-input'),
        errorTip: '两次密码输入不一致',
        passTip: '两次密码输入一致',
        defaultTip: '必填，再次输入相同密码'
    });
    
    //邮箱表单项
    var mailItem = new FormItem({
        id: 'mail-input',
        pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        defaultTip: '必填，请输入有效的邮箱地址'
    });
    
    //电话表单项
    var phoneItem = new FormItem({
        id: 'phone-input',
        pattern: /^1[0-9]{10}$/,
        defaultTip: '必填，请输入有效的手机号码'
    });
    
    //所有表单项
    var formItems = [usernameItem, pwdItem, pwdConfirmItem, mailItem, phoneItem];

    //全局验证
    function checkAll() {
        var flag = true;
        formItems.forEach(function(item) {
            if (!item.validate()) {
                flag = false;
            }
        });            
        if (flag) {
            alert('验证通过');
        } else {
            alert('验证失败，请检查后再提交');
        }
    }
 
    //初始化：添加事件函数
    function init() {
        formItems.forEach(function(item) {
            item.bindEvent();
        })
        document.getElementById('validate-btn').addEventListener('click', checkAll);
    }
    
    init();

})();


