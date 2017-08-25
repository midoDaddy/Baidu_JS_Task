/*
* @Author: midoDaddy
* @Date:   2017-08-23 11:23:49
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-08-24 00:33:47
*/
$(function() {
    var mediator = new Mediator();
    var commander = new Commander({
        receiver: mediator
    });
});

