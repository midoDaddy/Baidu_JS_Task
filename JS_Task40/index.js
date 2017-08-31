/*
* @Author: midoDaddy
* @Date:   2017-08-31 14:46:09
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-01 00:13:59
*/
$(function() {
    var calender = new Calender({
        container: $('.wrapper'),
        currentDate: new Date(),
    });
    calender.setDate(new Date(2017, 4, 20))
})