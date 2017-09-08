/*
* @Author: midoDaddy
* @Date:   2017-08-31 14:46:09
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-08 23:15:35
*/
$(function() {

    //测试数据
    var data = {
        init: [
            {src: 'images/sample_1.jpg', initWidth: 580, initHeight: 900},
            {src: 'images/sample_2.jpg', initWidth: 658, initHeight: 438},
            {src: 'images/sample_3.jpg', initWidth: 404, initHeight: 674},
            {src: 'images/sample_4.jpg', initWidth: 555, initHeight: 900},
            {src: 'images/sample_5.jpg', initWidth: 427, initHeight: 440},
            {src: 'images/sample_6.jpg', initWidth: 534, initHeight: 800},
            {src: 'images/sample_7.jpg', initWidth: 492, initHeight: 900},
            {src: 'images/sample_8.jpg', initWidth: 527, initHeight: 900},
            {src: 'images/sample_9.jpg', initWidth: 343, initHeight: 572},
            {src: 'images/sample_10.jpg', initWidth: 658, initHeight: 1097},
            {src: 'images/sample_11.jpg', initWidth: 464, initHeight: 774},
            {src: 'images/sample_12.jpg', initWidth: 658, initHeight: 658},
            {src: 'images/sample_13.jpg', initWidth: 347, initHeight: 579},
            {src: 'images/sample_14.jpg', initWidth: 603, initHeight: 900},
            {src: 'images/sample_15.jpg', initWidth: 510, initHeight: 762},
            {src: 'images/sample_16.jpg', initWidth: 540, initHeight: 900},
            {src: 'images/sample_17.jpg', initWidth: 346, initHeight: 572},
            {src: 'images/sample_18.jpg', initWidth: 485, initHeight: 599},
            {src: 'images/sample_19.jpg', initWidth: 658, initHeight: 895},
            {src: 'images/sample_20.jpg', initWidth: 532, initHeight: 800}
        ],
        plus: [
            {src: 'images/sample_21.jpg', initWidth: 586, initHeight: 636},
            {src: 'images/sample_22.jpg', initWidth: 531, initHeight: 800},                 
            {src: 'images/sample_23.jpg', initWidth: 600, initHeight: 900},
            {src: 'images/sample_24.jpg', initWidth: 400, initHeight: 400},
            {src: 'images/sample_25.jpg', initWidth: 435, initHeight: 333},
            {src: 'images/sample_26.jpg', initWidth: 1280, initHeight: 595},
            {src: 'images/sample_27.jpg', initWidth: 658, initHeight: 494},
            {src: 'images/sample_28.jpg', initWidth: 500, initHeight: 460},
            {src: 'images/sample_29.jpg', initWidth: 496, initHeight: 330},
            {src: 'images/sample_30.jpg', initWidth: 658, initHeight: 697},
            {src: 'images/sample_31.jpg', initWidth: 658, initHeight: 983},
            {src: 'images/sample_32.jpg', initWidth: 658, initHeight: 838},                 
            {src: 'images/sample_33.jpg', initWidth: 612, initHeight: 900},
            {src: 'images/sample_34.jpg', initWidth: 658, initHeight: 896},
            {src: 'images/sample_35.jpg', initWidth: 600, initHeight: 900},
            {src: 'images/sample_36.jpg', initWidth: 596, initHeight: 900},
            {src: 'images/sample_37.jpg', initWidth: 658, initHeight: 877},
            {src: 'images/sample_38.jpg', initWidth: 658, initHeight: 883},
            {src: 'images/sample_39.jpg', initWidth: 598, initHeight: 900},
            {src: 'images/sample_40.jpg', initWidth: 658, initHeight: 439}
        ]
    }

    //创建木桶布局
    var bucketLayout = new BucketLayout({
        container: $('#wrapper'),
        data: data,
        totalWidth: 1000,
        padding: 5,
        maxHeight: 300,
        maxCount: 6,
        minCount: 3
    });

})