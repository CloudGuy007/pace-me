"use strict";

var app = angular.module('paceMeApp');

app.controller('homeCtrl', function($scope){
	(function () {
    window.addEventListener('scroll', function (event) {
        var depth, layer, movement, translate3d;
        var topDistance = this.pageYOffset;
				console.log("topDistane", topDistance);
        var layers = document.querySelectorAll('[data-type=\'parallax\']');
				var len;
        for (var i = 0, len = layers.length; i < len; i++) {

            layer = layers[i];
            depth = layer.getAttribute('data-depth');
            movement = -(topDistance * depth);
            translate3d = 'translate3d(0, ' + movement + 'px, 0)';
            layer.style['-webkit-transform'] = translate3d;
            layer.style['-moz-transform'] = translate3d;
            layer.style['-ms-transform'] = translate3d;
            layer.style['-o-transform'] = translate3d;
            layer.style.transform = translate3d;
        }
    });
}.call(this));

});
