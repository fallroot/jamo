!function(n,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.jamo=t():n.jamo=t()}(window,function(){return function(n){var t={};function r(e){if(t[e])return t[e].exports;var o=t[e]={i:e,l:!1,exports:{}};return n[e].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=n,r.c=t,r.d=function(n,t,e){r.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:e})},r.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},r.t=function(n,t){if(1&t&&(n=r(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var e=Object.create(null);if(r.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var o in n)r.d(e,o,function(t){return n[t]}.bind(null,o));return e},r.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return r.d(t,"a",t),t},r.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},r.p="",r(r.s=0)}([function(n,t,r){"use strict";r.r(t);var e=[0,1,-1,2,-1,-1,3,4,5,-1,-1,-1,-1,-1,-1,-1,6,7,8,-1,9,10,11,12,13,14,15,16,17,18],o=[0,1,2,3,4,5,6,-1,7,8,9,10,11,12,13,14,15,16,-1,17,18,19,20,21,-1,22,23,24,25,26],u=[0,1,3,6,7,8,16,17,18,20,21,22,23,24,25,26,27,28,29],i=[0,1,2,3,4,5,6,8,9,10,11,12,13,14,15,16,17,19,20,21,22,23,25,26,27,28,29],f=4352,c=4370,a=4449,s=4469,g=4520,p=4546,l=12593,m=12622,d=12623,h=12643,y=44032,j=55215;function v(n){if(n.length<2)return n.join("");var t=T(n[0])-f,r=T(n[1])-a,e=n.length>2?T(n[2])-g+1:0,o=y+21*t*28+28*r+e;return String.fromCodePoint(o)}function b(n){if(w(n))return String.fromCodePoint(f+e[T(n)-l])}function C(n){if(w(n))return String.fromCodePoint(g+o[T(n)-l])}function A(n){if(_(n))return String.fromCodePoint(a+T(n)-d)}function P(n,t){return Array.from(n).map(function(n){if(!F(n))return[n];var r=function(n){var t=T(n)-y,r=t%28,e=(t-r)/28%21;return{choseong:((t-r)/28-e)/21,jungseong:e,jongseong:r}}(n),e=t(r);return r.jongseong||e.pop(),e.map(function(n){return String.fromCodePoint(n)})})}function S(n){return Array.prototype.flat?n.flat():n.reduce(function(n,t){return Array.isArray(t)?n.concat(S(t)):n.concat(t)},[])}function x(n,t,r){return!(!n||!n.length)&&Array.from(n).every(function(n){var e=T(n);return e>=t&&e<=r})}function O(n){return x(n,f,c)}function w(n){return x(n,l,m)}function _(n){return x(n,d,h)}function J(n){return x(n,g,p)}function M(n){return x(n,a,s)}function F(n){return x(n,y,j)}function T(n){return n.codePointAt(0)}t.default={compose:function(){for(var n=arguments.length,t=new Array(n),r=0;r<n;r++)t[r]=arguments[r];for(var e=Array.from(S(t)),o=e.length,u=[],i=[],f=0;f<o;){var c=e[f];O(c)&&(u.push(c),M(c=e[f+1])&&(u.push(c),J(c=e[(f+=1)+1])&&(u.push(c),f+=1))),u.length?(i.push(v(u)),u.length=0):i.push(c),f+=1}return i.join("")},composeWithCompat:function(){for(var n=arguments.length,t=new Array(n),r=0;r<n;r++)t[r]=arguments[r];for(var e=Array.from(S(t)),o=[],u=[],i=0,f=[];i<e.length;){var c=e[i];w(c)&&(o.push(c),u.push(b(c)),_(c=e[i+1])&&(u.push(A(c)),w(c=e[(i+=1)+1])&&!_(e[i+2])&&(u.push(C(c)),i+=1))),u.length>1?f.push(v(u)):o.length?f=f.concat(o):f.push(c),o.length=0,u.length=0,i+=1}return f.join("")},decompose:function(n){return P(n,function(n){return[f+n.choseong,a+n.jungseong,g+n.jongseong-1]})},decomposeAsCompat:function(n){return P(n,function(n){return[l+u[n.choseong],d+n.jungseong,l+i[n.jongseong-1]]})},getChoseongFromCompat:b,getJongseongFromCompat:C,getJungseongFromCompat:A,isChoseong:O,isCompatConsonant:w,isCompatVowel:_,isJongseong:J,isJungseong:M,isSyllable:F}}]).default});