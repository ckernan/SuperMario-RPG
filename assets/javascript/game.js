$(document).ready(function() {

	var playHlth;
	var defHlth;
	var playAtk;
	var defCtrAtk;
	var heroAtk;
	var defName = "";

	var players = [
		{
			id: "first",
			name: "Mario",
			health: 100,
			atkPower: 9,
			ctrAtkPower: 5,
			pic: 'assets/images/mario.jpg'
		},

		{
			id: "second",
			name: "Yoshi",
			health: 130,
			atkPower: 9,
			ctrAtkPower: 7,
			pic: 'assets/images/yoshi.jpg'
				
		},

		{
			id: "third",
			name: "Peach",
			health: 150,
			atkPower: 9,
			ctrAtkPower: 7,
			pic: 'assets/images/peach.jpg'	
		},

		{
			id: "fourth",
			name: "Bowser",
			health: 190,
			atkPower: 15,
			ctrAtkPower: 14,
			pic: 'assets/images/bowser.jpg'	
		},

	];

	function makePlayers() {
		for(var i=0; i<players.length; i++) {
			var img = $('<img>').addClass('players rounded-circle').attr({id: players[i].name, src: players[i].pic, "data-hlth": players[i].health, "data-atk": players[i].atkPower, "data-ctratk": players[i].ctrAtkPower});
			var hlth = $('<div>').addClass('progress-bar bg-success').attr({"role":'progressbar', "aria-valuenow": '40', "aria-valuemin": '0', "aria-valuemax": players[i].health, "style": 'width: 100%'}).text(players[i].health);
			var divHlth = $('<div>').addClass('progress').append(hlth);
			var p = $('<p>').text(players[i].name);
			p.addClass('name');
			var rowDiv = $('<div>');
			rowDiv.addClass('inline pick text-center col-md-3 col-xs-6').append(img).append(divHlth).append(p);
			$('#choosePlayer').append(rowDiv);
		};
	};
	makePlayers();

	$('body').on('click', '.pick', function() {
		$(this).children('.players').css('border', '5px solid #449D44');
		$(this).removeClass('pick col-md-3 col-xs-6').addClass('player');
		$(this).siblings().children('.players').css('border', '5px solid #E50000');
		$(this).siblings().removeClass('pick col-md-3 col-xs-6').addClass('enemy').detach().appendTo('#enemies');
		$(this).detach().appendTo('#character');
		$('.character').removeClass('hide');
		$('.enemies').removeClass('hide');
		$('.defender').removeClass('hide');
		$('#select').addClass('hide');
		playHlth = parseInt($('.player').children('.players').attr('data-hlth'));
		playAtk = parseInt($('.player').children('.players').attr('data-atk'));
		heroAtk = playAtk;
	});

	$('body').on('click', '.enemy', function() {
		$('.attack').removeClass('hide');
		if($.trim($("#defender").html())=='') {
			$('#struck').text('Ready... Fight!');
			$(this).children('.players').css('border', '5px solid #C9302C')
			$(this).removeClass('enemy').addClass('defender');
			$(this).detach().appendTo('#defender');
			defHlth = parseInt($('.defender').children('.players').attr('data-hlth'));
			defCtrAtk = parseInt($('.defender').children('.players').attr('data-ctratk'));
			defName = $('.defender').children('.players').attr('id');
		}
	});

	$('body').on('click', '.strike', function() {
		if(playHlth > 0 && $.trim($("#defender").html()) !='') {
			defMaxHlth = parseInt($('#defender').find('.progress-bar').attr('aria-valuemax'));
			defHlth = parseInt(defHlth) - parseInt(heroAtk);
			playMaxHlth = parseInt($('.player').find('.progress-bar').attr('aria-valuemax'));
			playHlth = parseInt(playHlth) - parseInt(defCtrAtk);
			$('.player').find('.progress-bar').text(playHlth);
			$('.player').find('.progress-bar').css('width', playHlth/playMaxHlth*100 + '%');
			$('.defender').find('.progress-bar').css('width', defHlth/defMaxHlth*100 + '%');
			$('.defender').find('.progress-bar').text(defHlth);
			$('#struck').text('You were counterattacked by ' + defName + ' for ' + defCtrAtk);
			$('#hit').text('You attack ' + defName + ' for ' + heroAtk);
			$('.player img').effect('pulsate');
			$('.defender img').effect('pulsate');
			heroAtk += parseInt(playAtk);
			if(playHlth/playMaxHlth*100 < 50) {
				$('.player').find('.progress-bar').removeClass('bg-success').addClass('bg-warning');
			}
			if(playHlth/playMaxHlth*100 < 20) {
				$('.player').find('.progress-bar').removeClass('bg-warning').addClass('bg-danger');
			}
			if(defHlth/defMaxHlth*100 < 50) {
				$('.defender').find('.progress-bar').removeClass('bg-success').addClass('bg-warning');
			}
			if(defHlth/defMaxHlth*100 < 20) {
				$('.defender').find('.progress-bar').removeClass('bg-warning').addClass('bg-danger');
			}
			if(defHlth <= 0) {
				defHlth = 0;
				$('.defender').find('.progress-bar').text(defHlth);
				$('#struck').text('You defeated ' + defName + '! Choose new opponent to fight.');
				$('#hit').text('');
				//$('.defender img').effect('explode');
				$('#defender').empty();
			}
			if(playHlth <= 0) {
				playHlth = 0;
				$('.player').find('.progress-bar').text(playHlth);
				//$('.player img').effect('explode');
				$('.player').empty();
				alert('YOU LOSE!');
				$('.reset').removeClass('hide');
			}
		}
		if($.trim($("#enemies").html())=='' && $.trim($("#defender").html()) =='' && $.trim($(".player").html()) != '') {
			alert('YOU WIN!!');
			$('.reset').removeClass('hide');
		}
	});

	$('body').on('click', '.redo', function() {
		$('#struck').text('');
		$('#hit').text('');
		$('#character').empty();	
		$('#defender').empty();
		$('#enemies').empty();
		$('#select').removeClass('hide');
		$('.attack').addClass('hide');
		$('.character').addClass('hide');
		$('.enemies').addClass('hide');
		$('.defender').addClass('hide');
		$('.reset').addClass('hide');
		makePlayers();
	});

});