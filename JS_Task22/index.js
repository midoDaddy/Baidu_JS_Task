/*
* @Author: 63431
* @Date:   2017-08-08 22:02:21
* @Last Modified by:   63431
* @Last Modified time: 2017-08-11 23:55:22
*/

'use strict';
(function(){
    
    function $(id) {
        return document.getElementById(id);
    }

    var root = $('root'),
        data = [],
        index = 0;
    
    //先序遍历   
    function preOrder(root) { 
        if (root) {
            data.push(root);
            preOrder(root.firstElementChild);
            preOrder(root.lastElementChild);
        }     
    }

    //中序遍历   
    function inOrder(root) { 
        if (root) {           
            inOrder(root.firstElementChild);
            data.push(root);
            inOrder(root.lastElementChild);
        }     
    }

    //后序遍历   
    function postOrder(root) { 
        if (root) {           
            postOrder(root.firstElementChild);
            postOrder(root.lastElementChild);
            data.push(root);
        }     
    }

    //广度优先遍历
    function breadthOrder(root) {
        if (root) {
            data.push(root);
            breadthOrder(root.nextElementSibling);
            root = data[index++];
            breadthOrder(root.firstElementChild);
        }
    }

    //恢复初始状态
    function reset() {
        data[data.length - 1].style.background = '#fff';
        data.length = 0;
    }
    
    //动画演示
    function treeAnimate() {
        var count = 0,
            len = data.length;
        var timer = setInterval(function() {
            if (count < len) {
                data[count].style.background = 'tomato';
                if (count > 0) {
                    data[count - 1].style.background = '#fff';
                }         
                count++;
            } else {
                clearInterval(timer);
                reset();
            }
        }, 500)
    }
   
    //初始化：添加事件函数
    function init() {
        $('pre-order').onclick = function() {
            preOrder(root);
            treeAnimate();
        }
        $('in-order').onclick = function() {
            inOrder(root);
            treeAnimate();
        }
        $('post-order').onclick = function() {
            postOrder(root);
            treeAnimate();
        }
        $('breadth-order').onclick = function() {
            breadthOrder(root);
            treeAnimate();
        }
    }
    
    init();
    
})();