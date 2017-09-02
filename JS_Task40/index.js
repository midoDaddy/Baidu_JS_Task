/*
* @Author: midoDaddy
* @Date:   2017-08-31 14:46:09
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-02 23:54:36
*/
$(function() {
    var calender = new Calender({
        container: $('.calender-container'),
        currentDate: new Date(),        
        minDate: new Date(2016, 0, 26),
        maxDate: new Date(2017, 5, 23),
        width: 400,
        height: 400
    });

    calender.setDate(new Date(2016, 0, 26));
})