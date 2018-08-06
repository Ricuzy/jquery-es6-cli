import '../scss/index.scss';

$(function () {
    var $quickNav = $('#quick-nav'),
        $quickNavContentContainer = $('#quick-nav-content-container'),
        $cancleNav = $('#cancle-nav'),
        $playProgress = $('#play-progress'),
        $gotoContainer = $('#goto-container'),
        $startPlay = $('#start-play'),
        doc = document,
        $placeholder = $('#placeholder'),
        $adviceContent = $('#advice-content'),
        $playDuration = $('#play-duration'),
        $progressBar = $('#progress-bar'),
        $progressCircle = $('#progress-circle'),
        $submitAdvice = $('#submit-advice'),
        $listContainer = $('#list-container'),
        $initPlay = $('#init-play'),
        $messageAlert = $('#message-alert'),
        $progress = $('#progress'),
        $playTime = $('#play-time'),
        $playHeader = $('#play-header'),
        $recommendItemContainer = $('#recommend-item-container'),
        $gotoChildren = $('#goto-children'),
        // $audio = doc.getElementsByTagName('audio')[0],
        animateOut = function () {
            $quickNavContentContainer.removeClass('animate-in').addClass('animate-out');
            setTimeout(function () {
                $quickNavContentContainer.hide();
            }, 700);
        };
       
	var YS = function () {
        this.startX = 0;
        this.startY = 0;
        this.moveEndX = 0;
        this.moveEndY = 0;
        this.leftDistance = 0;
        this.duration = 0;
        this.durationArray = [22, 30, 25, 30, 72, 33, 42, 115];
        this.audioHeader = ['认识晓雅MINI', '如何启动晓雅MINI', '晓雅MINI的操作助手', '怎样连接WIFI',
            '怎样用晓雅MINI听书', '晓雅MINI还能点播音乐', '晓雅MINI的生活助手功能', '小朋友也能听懂的使用说明'];
        this.locationHref = [
            'http://m.ximalaya.com/album/7371372',
            'http://m.ximalaya.com/album/9417880',
            'http://m.ximalaya.com/album/4445398',
            'http://m.ximalaya.com/album/7968002',
            'http://m.ximalaya.com/album/11232008',
            'http://m.ximalaya.com/album/14604271',
            'http://m.ximalaya.com/album/14559843',
            'http://m.ximalaya.com/album/8259730'
        ]    
        this.playIndex = 0;
        this.audio = new Audio();
        this.stack = [
            {
                title: '认识晓雅MINI',
                duration: 22,
                url: 'http://audio.xmcdn.com/group45/M01/12/DA/wKgKjltDi1HjU9JeAALZIYur_I4104.m4a',
                soundid: 1
            },
            {
                title: '如何启动晓雅MINI',
                duration: 30,
                url: 'http://audio.xmcdn.com/group45/M04/12/91/wKgKlFtDi2bBKqcTAAPPVt3uGEI073.m4a',
                soundid: 2
            },
            {
                title: '晓雅MINI的操作助手',
                duration: 25,
                url: 'http://audio.xmcdn.com/group46/M00/13/54/wKgKlltDi8nxauK0AAMjvb5fMrE853.m4a',
                soundid: 3
            },
            {
                title: '怎样连接WIFI',
                duration: 30,
                url: 'http://audio.xmcdn.com/group45/M04/12/90/wKgKlFtDi1yA9N8tAAPTveHgJA8389.m4a',
                soundid: 4
            },
            {
                title: '怎样用晓雅MINI听书',
                duration: 72,
                url: 'http://audio.xmcdn.com/group45/M06/12/E0/wKgKjltDi43yNR5oAAkJFDAm8qE379.m4a',
                soundid: 5
            },
            {
                title: '晓雅MINI还能点播音乐',
                duration: 33,
                url: 'http://audio.xmcdn.com/group46/M0A/13/35/wKgKj1tDi0Kh5SedAAQl9of26to888.m4a',
                soundid: 6
            },
            {
                title: '晓雅MINI的生活助手功能',
                duration: 42,
                url: 'http://audio.xmcdn.com/group46/M05/13/4D/wKgKlltDi3aS2ym_AAVUdwpo-yo927.m4a',
                soundid: 7
            },
            {
                title: '小朋友也能听懂的使用说明',
                duration: 115,
                url: 'http://audio.xmcdn.com/group46/M06/13/51/wKgKlltDi7izuoxqAA48DmTtDWk753.m4a',
                soundid: 8
            },
        ],
        this.init();
    };
    
    
	
	YS.prototype = {
		constructor: YS,
		
		init: function () {
            this.bindEvents();
            this.musicAutoPlay();
        },
        
        musicAutoPlay: function () {
            var me = this,
                currentAudioObj = me.stack[me.playIndex];
            me.audio.src = currentAudioObj.url;
            $startPlay.attr('src', '../assets/home_btn_zant_nor.png').addClass('playing');

            document.addEventListener('WeixinJSBridgeReady', function () {
                me.audio.play();
            }, false);
            me.audio.play();
            $playTime.text('00:' + me.durationArray[0]);
            $initPlay.css({'background': '#F7F5F1'});
            $($initPlay.find('div')[0]).text('').addClass('selected-playing current-play');
            me.bindChangeEvents(me.audio, currentAudioObj.duration);
        },

        timeupdateFun: function (duration) {
            var me = this;
        
            var currentTime = Math.floor(me.audio.currentTime);
            console.log(currentTime);
            if (currentTime <= 9 && currentTime >=0) {
                $playDuration.text('00:0' + currentTime);
            }else if (currentTime >= 10 && currentTime <= 59) {
                $playDuration.text('00:' + currentTime);
            }else if (currentTime >= 60 && currentTime <= 600) {
                var second = (currentTime % 60) <= 9 ? '0' + currentTime % 60 : currentTime % 60; 
                $playDuration.text('0' + Math.floor(currentTime / 60) + ':' + second);
            }
            $progressBar.css({'width' : currentTime / duration * 6.29 + 'rem'});
            $progressCircle.css({'left' : currentTime / duration * 6.29 + 'rem'});
            me.leftDistance =  Math.floor(parseFloat($progressCircle.css('left').split('p')[0]));
            
        },

        bindChangeEvents: function () {
            var me = this,
                currentAudioObj = me.stack[me.playIndex],
                duration = currentAudioObj.duration;
        
            setTimeout(function () {
                $startPlay.attr('src', '../assets/home_btn_zant_nor.png').addClass('playing');
            }, 100);
            
            if (duration <= 9 && duration >=0) {
                $playTime.text('00:0' + duration);
            }else if (duration >= 10 && duration <= 59) {
                $playTime.text('00:' + duration);
            }else if (duration >= 60 && duration <= 600) {
                var second = (duration % 60) <= 9 ? '0' + duration % 60 : duration % 60; 
                $playTime.text('0' + Math.floor(duration / 60) + ':' + second);
            }
        },
		
		bindEvents: function () {
            var me = this;

            me.audio.ontimeupdate = function () {
                var duration = me.stack[me.playIndex].duration;
                me.timeupdateFun(duration); 
            };

            $progressCircle.on('touchend', function () {
                var duration = me.stack[me.playIndex].duration;
                var left = Math.floor(parseFloat($progressCircle.css('left').split('p')) + 8),
                    all = Math.floor(parseFloat($progress.css('width').split('p')));

                me.audio.currentTime = duration * left / all;
            });

            me.audio.onended = function () {
                var $prePlay =  $($listContainer.find('.selected-playing')),
                    $currentPlay = $($listContainer.find('.play-list-item')[me.playIndex + 1]),
                    $num = $($currentPlay.find('div')[0]);

                me.playIndex ++;
                me.audio.src = me.stack[me.playIndex].url;
                me.audio.play();
                me.bindChangeEvents();
                $playDuration.text('00:00');
                $playHeader.text(me.stack[me.playIndex].title);
                $prePlay.removeClass('selected-playing').removeClass('current-play').text($prePlay.data('value'));
                $currentPlay.css({ 'background': '#F7F5F1' }).siblings().css({'background': 'none'});
                $num.text('').addClass('selected-playing current-play');
                $startPlay.attr('src', '../assets/home_btn_zant_nor.png').addClass('playing');
            };

            $progressCircle.on("touchmove", function(e) {
                e.preventDefault();
                me.moveEndX = e.originalEvent.changedTouches[0].pageX;
                me.moveEndY = e.originalEvent.changedTouches[0].pageY;
                var left = parseInt(me.moveEndX - me.startX) + me.leftDistance,
                    leftRem = left / 37.5;

                if (leftRem <= -0.22 || leftRem >= 6.5) {
                    return false;
                }

                $progressBar.css({'width' : leftRem + 'rem'});
                $(this).css({'left': leftRem + 'rem'});
            });

            $progressCircle.on("touchstart", function(e) {
                e.preventDefault();
                me.startX = e.originalEvent.changedTouches[0].pageX;
                me.startY = e.originalEvent.changedTouches[0].pageY;
            });

            $listContainer.on('click', '.play-list-item', function () {
                var self = $(this),
                    $num = $(self.find('div')[0]),
                    $prePlay = $(self.parent().find('.selected-playing'));
                    $($listContainer.find('.selected-playing'));
                // console.log(self);    
                me.playIndex = parseInt($num.data('value')) - 1;
                me.audio.src = me.stack[me.playIndex].url;
                me.audio.play();
                me.bindChangeEvents();
                $playHeader.text(me.stack[me.playIndex].title);
                $prePlay.removeClass('selected-playing').removeClass('current-play').text($prePlay.data('value'));
                self.css({ 'background': '#F7F5F1' }).siblings().css({'background': 'none'});
                $num.text('').addClass('selected-playing current-play');
                $startPlay.attr('src', '../assets/home_btn_zant_nor.png').addClass('playing');
            });
            
			$placeholder.on('click', function () {
                $adviceContent.focus();
            });

            $adviceContent.on('focus', function () {
                $placeholder.hide();
            });

            $adviceContent.on('blur', function () {
                if ($(this).text().trim().length === 0) {
                    $placeholder.show();
                }
            });
            
            $quickNavContentContainer.on('touchmove', function (e) {
                e.stopPropagation();
                e.preventDefault();
            });

            $startPlay.on('click', function () {
                var self = $(this),
                    $num = $($listContainer.find('.selected-playing'));

                if (self.hasClass('playing')) {
                    self.attr('src', '../assets/home_btn_bofang_nor.png').removeClass('playing');
                    me.audio.pause();
                    $num.removeClass('selected-playing').text($num.data('value')).addClass('current-play');
                }else {
                    me.audio.play();
                    $($listContainer.find('.current-play')).text('').addClass('selected-playing');
                    $num.text('').addClass('selected-playing');
                    self.attr('src', '../assets/home_btn_zant_nor.png').addClass('playing');
                }
            });

            $recommendItemContainer.on('click', '.recommend-item', function () {
                location.href = me.locationHref[parseInt($(this).data('index'))];;
            });

			$quickNav.on('click', function () {
                var windowTop = doc.documentElement.scrollTop || doc.body.scrollTop;
				$quickNavContentContainer.show().css({"top": windowTop + 'px' }).removeClass('animate-out').addClass('animate-in');
            });
            
			$cancleNav.on('click', function () {
				animateOut();
            });

            $gotoContainer.on('click', 'li', function() {
                animateOut();
            });

            $gotoChildren.on('click', function () {
                location.href = 'http://m.ximalaya.com/album-quan/kid/rank';
            });

            $submitAdvice.on('click', function () {
                var comment = $adviceContent.text().trim();

                if (comment.length <= 0) {
                    me.showAlert('请输入文字');
                    return false;
                }
                $.ajax({
                    url: '/wws-c/comment/submit',
                    type: 'POST',
                    data: {
                        entryId: 12,
                        comment: comment
                    },
                    success: function (res) {
                        if (res.code === 200) {
                            me.showAlert('已提交');
                            $placeholder.show();
                            $adviceContent.text('');
                        }else {
                            me.showAlert('接口错误');
                        }
                    }
                })
            });
        },

        showAlert: function (str) {
            $messageAlert.text(str).addClass('message-alert-trans');
            setTimeout(function () {
                $messageAlert.removeClass('message-alert-trans');
            }, 2000);
        }
	}
	
	new YS();
});
