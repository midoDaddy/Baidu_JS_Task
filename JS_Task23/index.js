/*
* @Author: 63431
* @Date:   2017-08-08 22:02:21
* @Last Modified by:   63431
* @Last Modified time: 2017-08-13 13:41:52
*/

'use strict';
(function(){
    
    function $(id) {
        return document.getElementById(id);
    }

    var root = $('root'),
        data = [],
        index = 0,
        timer = null;
    
    //先序遍历   
    function preOrder(root) { 
        if (root) {
            data.push(root);
            var child = root.firstElementChild;
            while (child) {
                preOrder(child);
                child = child.nextElementSibling;
            }           
        }     
    }

    //后序遍历   
    function postOrder(root) { 
        if (root) {           
            var child = root.firstElementChild;
            while (child) {
                postOrder(child);
                child = child.nextElementSibling;
            } 
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
        data.forEach(function(item, index) {
            item.style.background = '#fff';
        });       
        data.length = 0;
    }

    //获取文本子节点
    function getText(elem) {
        if (elem.childNodes) {
            var children = elem.childNodes;
            for (var i = 0; i < children.length; i++) {
                if (children[i].nodeType === 3 && children[i].nodeValue.trim()) {
                    return children[i].nodeValue.trim();
                }
            }
        }      
    }
    
    //动画演示
    function treeAnimate(target) {
        var count = 0,
            len = data.length,
            targetFlag = false;
        if (timer) {
            clearInterval(timer);
        }
        timer = setInterval(function() {
            if (count < len) {
                data[count].style.background = 'tomato';
                if (count > 0) {
                    data[count - 1].style.background = '#fff';
                }   
                if (target) {
                    if (getText(data[count]).indexOf(target) > -1) {
                        targetFlag = true;
                        setTimeout(function(){
                            if (!confirm('已发现目标，是否继续查找下一目标？')) {
                                clearInterval(timer);
                            }
                        }, 300)
                    }
                }      
                count++;
            } else {
                clearInterval(timer);
                reset();
                if (target && !targetFlag) {
                    alert('未发现目标呦~~');
                }               
            }
        }, 500)
    }
   
    //初始化：添加事件函数
    function init() {
        $('pre-order').onclick = function() {
            reset();
            preOrder(root);
            treeAnimate();
        }
        $('post-order').onclick = function() {
            reset();
            postOrder(root);
            treeAnimate();
        }
        $('breadth-order').onclick = function() {
            reset();
            breadthOrder(root);
            treeAnimate();
        }
        $('pre-order-search').onclick = function() {
            var value = $('search-input').value.trim();
            reset();
            preOrder(root);
            treeAnimate(value);
        }
        $('post-order-search').onclick = function() {
            var value = $('search-input').value.trim();
            reset();
            postOrder(root);
            treeAnimate(value);
        }
        $('breadth-order-search').onclick = function() {
            var value = $('search-input').value.trim();
            reset();
            breadthOrder(root);
            treeAnimate(value);
        }
    }
    
    init();

})();