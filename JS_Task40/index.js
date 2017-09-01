/*
* @Author: midoDaddy
* @Date:   2017-08-31 14:46:09
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-01 11:43:07
*/
$(function() {
    var calender = new Calender({
        container: $('.calender-container'),
        currentDate: new Date(),
        width: 500,
        height: 500,
        themeColor: 'pink'
    });

    calender.setDate(new Date(2016, 0, 26));

})