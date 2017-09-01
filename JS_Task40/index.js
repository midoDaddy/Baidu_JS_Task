/*
* @Author: midoDaddy
* @Date:   2017-08-31 14:46:09
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-02 00:03:06
*/
$(function() {
    var calender = new Calender({
        container: $('.calender-container'),
        currentDate: new Date(),
        width: 500,
        height: 500,
        minDate: new Date(2016, 0, 26),
        maxDate: new Date(2017, 5, 23),
        themeColor: 'pink'
    });

    calender.setDate(new Date(2016, 0, 26));
})