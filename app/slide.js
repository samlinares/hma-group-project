      $(function(){
			$('#temp_gas').click(function(){
		animate('#test','slideInLeft');
		return false;

	});

	function animate(element, animation){
		$(element).addClass('animated'+animation);
		var wait = setTimeout(function(){
			$(element).removeClass('animated' +animation);
		}, 1000);
	}
})