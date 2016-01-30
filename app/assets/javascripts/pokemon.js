// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
PokemonApp.Pokemon = function (pokemonUri) {
 this.id = PokemonApp.Pokemon.idFromUri(pokemonUri);
};
PokemonApp.Pokemon.prototype.render = function () {
 	console.log("Rendering pokemon: #" + this.id);
 	var self = this;
 	var img = this.id + 1;

 	$.when($.ajax("/api/pokemon/"+this.id), $.ajax("/api/sprite/"+img)).then(function(a1,a2){
 	 // console.log(a1);
 	 // console.log(a2);
 	 console.log(a1[0].name);
 	 console.log(a2[0].image);
 	});

 	$.ajax({
	 	url: "/api/pokemon/" + this.id,
	 	success: function (response) {
	 	self.info = response;
	 	console.log("Pokemon info:");
	 	// console.log(self.info);
	 	$("#pokemon-modal").modal("show");
	 	$("#pkmn-name").text(self.info.name);
 		$("#pkmn-number").text(self.info.pkdx_id);
 		$("#pkmn-height").text(self.info.height);
 		$("#pkmn-weight").text(self.info.weight);
 		$("#pkmn-hp").text(self.info.hp);
 		$("#pkmn-atack-defense").text(self.info.attack +' - '+ self.info.defense);
 		$("#pkmn-sp-atack-defense").text(self.info.sp_atk +' - '+ self.info.sp_def);
		$("#pkmn-spd").text(self.info.speed);
 		$("#pkmn-type").text(self.info.types.map(function(type){return type.name}).join(", "));
 		// console.log(response);
 	}

 	});
};

PokemonApp.Pokemon.idFromUri = function (pokemonUri) {
 var uriSegments = pokemonUri.split("/");
 var secondLast = uriSegments.length - 2;
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