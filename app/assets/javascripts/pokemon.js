// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
PokemonApp.Pokemon = function (pokemonUri) {
 this.id = PokemonApp.Pokemon.idFromUri(pokemonUri);
};
PokemonApp.Pokemon.prototype.render = function () {
 	// console.log("Rendering pokemon: #" + this.id);
 	var self = this;
 	var img = parseInt(this.id)+ 1;
 	// console.log(self);


 	$.when($.ajax("/api/pokemon/"+this.id), $.ajax("/api/sprite/"+img+"/"), $.ajax("/api/description/" + 315 )).then(function(a1,a2,a3){
 	 // console.log(a1);
 	 // console.log(a2);
 	 // console.log(a1[0].name);
 	 // console.log(a2[0].image);
 	// });

 	// $.ajax({
	 // 	url: "/api/pokemon/" + this.id,
	 // 	success: function (response) {
	 // 	self.info = response;
	 // 	console.log("Pokemon info:");
	 // 	// console.log(self.info);
	 	$("#pokemon-modal").modal("show");
	 	$("#pkmn-name").text(a1[0].name);
 		$("#pkmn-number").text(a1[0].pkdx_id);
 		$("#pkmn-height").text(a1[0].height);
 		$("#pkmn-weight").text(a1[0].weight);
 		$("#pkmn-hp").text(a1[0].hp);
 		$("#pkmn-atack-defense").text(a1[0].attack +' - '+ a1[0].defense);
 		$("#pkmn-sp-atack-defense").text(a1[0].sp_atk +' - '+ a1[0].sp_def);
		$("#pkmn-spd").text(a1[0].speed);
 		$("#pkmn-type").text(a1[0].types.map(function(type){return type.name}).join(", "));
 		// console.log($("#pkmn-img").children('img'));
		$("#pkmn-desc").text(a3[0].description);
 		$("#pkmn-img").children('img').attr('src', "http://pokeapi.co"+a2[0].image);
 		
 		// console.log(response);
 	// }

 	});
};

PokemonApp.Pokemon.idFromUri = function (pokemonUri) {
 var uriSegments = pokemonUri.split("/");
 console.log(uriSegments);
 var secondLast = uriSegments.length - 2;
 console.log(secondLast);
 return uriSegments[secondLast];
};

$(document).on("ready", function () {
 	$(".js-show-pokemon").on("click", function (event) {
 		var $button = $(event.currentTarget);
 		// var $button = $(this);
 		var pokemonUri = $button.data("pokemon-uri");
 		var pokemon = new PokemonApp.Pokemon(pokemonUri);
 		pokemon.render();
 	});
});