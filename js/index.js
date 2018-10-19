// class GlobalPlayer {
//     constructor () {
//         this.Player = new Audio();
//         /**
//          * READY: 0, //已设置好声音数据,处于可播放状态
//          * LOADING: 1,   //加载中,1.播放，2.恢复播放，3.seek 引起的声音加载
//          * PLAYING: 2,   //播放中
//          * PAUSED: 3,    //暂停
//          * STOPED: 4,    //停止,切换声音后触发
//          * FINISHED: 5, //结束,完整播放后触发
//          * LOADERROR: 6 //下载资源发生错误
//          * @type {number}
//          */
//         this.playState = 0;
//         this.isPlaying = false;
//         this.playStateChangeFuncCallBack = null;
//         this.setPlayList();
//         this.bindAudioEvents();
//         this.on = this.on.bind(this);
//         this.timeUpdateFunc = this.timeUpdateFunc.bind(this);
//         this.playStateChangeFunc = this.playStateChangeFunc.bind(this);
//         this.playEndFunc = this.playEndFunc.bind(this);
//         this.bindAudioEvents = this.bindAudioEvents.bind(this);
//
//         window.emitter = {
//             on: (type, callback) => {
//                 this.on(type, callback);
//             }
//         };
//     }
//
//     setPlayList = () => {
//         this.Player.src = `http://audio.xmcdn.com/group45/M06/16/01/wKgKjluqSEvhWK0gAEVE9w-DU4o346.m4a`;
//     }
//
//     playStateChangeFunc (callback) {
//         //注册事件的时候，把状态改变的函数赋值，方便状态改变时，再次调用
//         this.playStateChangeFuncCallBack = callback;
//         let player = this.Player;
//
//         callback({
//             playState: this.playState
//         });
//     }
//
//     playEndFunc () {
//         let player = this.Player;
//
//         player.onended = function () {
//
//         }
//     }
//
//     seekDuration (time) {
//         let player = this.Player;
//
//         player.currentTime = time;
//     }
//
//     bindAudioEvents () {
//         let player = this.Player;
//
//         player.addEventListener('error', function () {
//
//         }, false);
//     }
//
//     timeUpdateFunc (callback) {
//         let player = this.Player;
//
//         player.ontimeupdate = function () {
//             callback({
//                 currentTime: player.currentTime,
//                 buffered: {
//                     bufferedTime: player.buffered.end(0),
//                     bufferedLength: player.buffered.length,
//                     bufferddStart: player.buffered.start(0)
//                 },
//                 duration: player.duration,
//                 currentSrc: player.currentSrc,
//                 ended: player.ended,
//                 loop: player.loop,
//                 networkState: player.networkState,
//                 paused: player.paused,
//                 playbackRate: player.playbackRate,
//                 played: player.played,
//                 preload: player.preload,
//                 readyState: player.readyState,
//                 volume: player.volume,
//             });
//         };
//     }
//
//     on (type, callback) {
//         switch (type) {
//             case 'timeupdate':
//                 this.timeUpdateFunc(callback);
//                 break;
//             case 'playstatechange':
//                 this.playStateChangeFunc(callback);
//             default:
//                 break;
//         }
//     }
//
//
//     play () {
//         if (this.playState !== 2) {
//             this.Player.play();
//             this.playState = 2;
//             this.isPlaying = true;
//             this.playStateChangeFunc(this.playStateChangeFuncCallBack);
//         }
//     }
//
//     pause () {
//         //只有播放状态下，才把播放停掉
//         if (this.playState === 2) {
//             this.Player.pause();
//             this.playState = 3;
//             this.isPlaying = false;
//             this.playStateChangeFunc(this.playStateChangeFuncCallBack);
//         }
//     }
//
// }
//
// window.XmPlayer = new GlobalPlayer();
//
// !function() {
//     emitter.on('timeupdate', function (obj) {
//         console.log(obj);
//     });
//
//     emitter.on('playstatechange', function (e) {
//         console.log(e);
//     })
//
//     let app = document.getElementById('app');
//     let pause = document.getElementById('pause');
//
//     app.addEventListener('click', function (e) {
//         if (XmPlayer.isPlaying) {
//             XmPlayer.pause();
//         }else {
//             XmPlayer.play();
//         }
//     });
// }();


(function (win, doc) {
    var __ENV__ = 1;
    var app = doc.getElementById('app');
    var style = doc.getElementById('style');
    
    
    // funa.bind(this);
    //
    // onclick = function () {
    //     return self.apply(that, argv.concat(slice.call(arguments, 0)));
    // };
    
    // Function.prototype.bind = function () {
    //     if (typeof this !== 'function') {
    //         throw new TypeError('is not callable');
    //     }
    //     var self = this;
    //     var slice = [].slice;
    //     // 模拟es6的解构效果
    //     var that = arguments[0];
    //     var argv = slice.call(arguments, 1);
    //
    //     return function () {
    //         return self.apply(that, argv.concat(slice.call(arguments, 0)));
    //     };
    // };
    
    Function.prototype.bind = function(oThis) {
        if (typeof this !== 'function') {
            // closest thing possible to the ECMAScript 5
            // internal IsCallable function
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }

        var aArgs   = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP    = function() {},
            fBound  = function() {
                console.log(fToBind.apply(this instanceof fNOP
                    ? this
                    : oThis,
                    // 获取调用时(fBound)的传参.bind 返回的函数入参往往是这么传递的
                    aArgs.concat(Array.prototype.slice.call(arguments))));
                // this instanceof fNOP === true时,说明返回的fBound被当做new的构造函数调用
                return fToBind.apply(this instanceof fNOP
                    ? this
                    : oThis,
                    // 获取调用时(fBound)的传参.bind 返回的函数入参往往是这么传递的
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        // 维护原型关系
        if (this.prototype) {
            // Function.prototype doesn't have a prototype property
            fNOP.prototype = this.prototype;
        }
        // 下行的代码使fBound.prototype是fNOP的实例,因此
        // 返回的fBound若作为new的构造函数,new生成的新对象作为this传入fBound,新对象的__proto__就是fNOP的实例
        fBound.prototype = new fNOP();
        return fBound;
    };

    var MyApp = function () {
        this.currentIndex = 0;
        this.localId = '';
        this.timer = null;
        this.init();
    };

    MyApp.prototype = {
        constructor: MyApp,
        
        __handle_space__: {
            handleAppClick: function (index, profile) {
                console.log(index);
                console.log(this);
            },
    
            handleStyleClick: function (e) {
                console.log(this);
            }
        },
        
        __common_utils__: {
            queryParams: function (param) {
        
            }
        },
    
        init: function () {
            this.bindEvents();
        },

        bindEvents: function () {
            var _self = this;
            var handle_space = _self.__handle_space__;
            //绑定XX事件函数
            app.addEventListener('click', handle_space.handleAppClick.bind(_self, 1, 2, 3), false);
            //绑定XX事件函数
            style.addEventListener('click', handle_space.handleStyleClick.bind(_self), false);
        },

        getWxConfig: function () {

        }
    };


    new MyApp();
})(window, document);
