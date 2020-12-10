$("ul").on("click", "li", function(){
	$(this).toggleClass("completed");
});

$(".fa-plus").on("click", function(){
	$("input[type='text']").fadeToggle();
});