/*
* @Author: midoDaddy
* @Date:   2017-08-31 14:46:09
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-08 15:56:31
*/
$(function() {
    var bucketLayout = new BucketLayout({
        container: $('#wrapper'),
        data: {
            init: [
                {src: 'images/sample_1.jpg'},
                {src: 'images/sample_2.jpg'},
                {src: 'images/sample_3.jpg'},
                {src: 'images/sample_4.jpg'},
                {src: 'images/sample_5.jpg'},
                {src: 'images/sample_6.jpg'},
                {src: 'images/sample_7.jpg'},
                {src: 'images/sample_8.jpg'},
                {src: 'images/sample_9.jpg'},
                {src: 'images/sample_10.jpg'},
                {src: 'images/sample_11.jpg'},
                {src: 'images/sample_12.jpg'},
                {src: 'images/sample_13.jpg'},
                {src: 'images/sample_14.jpg'},
                {src: 'images/sample_15.jpg'},
                {src: 'images/sample_16.jpg'},
                {src: 'images/sample_17.jpg'},
                {src: 'images/sample_18.jpg'},
                {src: 'images/sample_19.jpg'},
                {src: 'images/sample_20.jpg'}
            ],
            plus: [
                {src: 'images/sample_21.jpg'},
                {src: 'images/sample_22.jpg'},                 
                {src: 'images/sample_23.jpg'},
                {src: 'images/sample_24.jpg'},
                {src: 'images/sample_25.jpg'},
                {src: 'images/sample_26.jpg'},
                {src: 'images/sample_27.jpg'},
                {src: 'images/sample_28.jpg'},
                {src: 'images/sample_29.jpg'},
                {src: 'images/sample_30.jpg'}
            ]
        }
    });

    var arr1 = [1, 2, 3, 4];
    var arr2 = arr1;
    arr2.push(5)
    console.log(arr1)
})