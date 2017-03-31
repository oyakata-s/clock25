(function($) {
	$.fn.clock25 = function(option){

		//パラメータとデフォルト値のマージ
		var defaults = {
			normal: false,
			showYear: true,
			showSecond: false,
			flashing: false,
			fadein: false
		};
		var options = $.extend(defaults,option);

		// 要素の生成
		var time = $('<div />').addClass('time');
		var date = $('<div />').addClass('date');
		this.append(time);
		this.append(date);

		// 処理
		var self = this;

		var interval = 1000;
		interval *= (!options.normal) ? (24 / 25) : 1;

		var isVisible = true;
		if (options.fadein) {
			self.css({ opacity: 0 });
			isVisible = false;
		}

		// 表示と更新
		setInterval(function() {
			// 現在の日時を取得
			var curTime = new Date();
			var hour = curTime.getHours();
			var minute = curTime.getMinutes();
			var second = curTime.getSeconds();
			var millisecond = curTime.getMilliseconds();

			if (!options.normal) {
				// 25時間に変換
				var time25 = hour * 3600000 + minute * 60000 + second * 1000 + millisecond;
				time25 = time25 * 25 / 24;
				var hour25 = Math.round((time25 / 3600000) - 0.5);
				var minute25 = Math.round((time25-hour25*3600000)/60000 - 0.5);
				var second25 = Math.round((time25-hour25*3600000-minute25*60000)/1000 - 0.5);
				hour = toPaddingString(hour25);
				minute = toPaddingString(minute25);
				second = toPaddingString(second25);
			} else {
				hour = toPaddingString(hour);
				minute = toPaddingString(minute);
				second = toPaddingString(second);
			}

			// 日付の取得
			var year = curTime.getFullYear();
			var month = curTime.getMonth();
			var dates = curTime.getDate();
			month = convertMonth(month);
			dates = toPaddingString(dates);

			// 文字列を取得
			var flash = "<span class=\"flashing\">:</span>";
			var outTime = hour + flash + minute;
			outTime += (options.showSecond) ? flash + second : "";
			var outDate = month + " " + dates;
			outDate += (options.showYear) ? ", " + year : "";

			// 時計出力！
			self.find(".time").html(outTime);
			self.find(".date").html(outDate);

			// フェードイン
			if (options.fadein && !isVisible) {
				self.animate({ opacity: 1 }, "normal");
				isVisible = true;
			}

			// 点滅のアニメーション
			if (options.flashing) {
				self.find(".flashing").stop().fadeTo(interval * 0.95, 0, function() {
					$(this).stop().fadeTo(interval * 0.05, 1);
				});
			}
		}, interval);

		//メソッドチェーンに対応するためthisを返す
		return(this);
	};

	function convertMonth(value) {
		var ret;
		switch (value) {
		case 0:
			ret = "January";
			break;
		case 1:
			ret = "February";
			break;
		case 2:
			ret = "March";
			break;
		case 3:
			ret = "April";
			break;
		case 4:
			ret = "May";
			break;
		case 5:
			ret = "June";
			break;
		case 6:
			ret = "July";
			break;
		case 7:
			ret = "August";
			break;
		case 8:
			ret = "September";
			break;
		case 9:
			ret = "October";
			break;
		case 10:
			ret = "November";
			break;
		case 11:
			ret = "December";
			break;
		}
		return ret;
	}

	function toPaddingString(value) {
		var string = "";

		if (value < 10) {
			string = "0" + value;
		} else {
			string = value;
		}

		return string;
	}

})(jQuery);

