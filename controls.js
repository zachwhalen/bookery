(function (tracery, baseEngModifiers){
	var traceryGrammar;

	function createStory() {
		var numberOfStories = parseInt(document.querySelector('#numberOfStories').value);
		var output = document.querySelector('#story');
		
		var stories = [];
		for(var i=0;i<numberOfStories;i++) {
			stories.push('<p>' + traceryGrammar.flatten('#origin#').replace(/\n\n/g,'</p><p>') + '</p>');
		}
		output.innerHTML = stories.join('<hr>');
		var numberOfWords = stories[0].split(" ").length;

		var wordCountHolder = document.querySelector('#wordCount');
		wordCountHolder.innerHTML = numberOfWords;
		console.log(numberOfWords);
	}
	function loadTracery(grammar) {

		traceryGrammar = tracery.createGrammar(grammar);
		traceryGrammar.addModifiers(baseEngModifiers);
		createStory();
		
		document.querySelector('#newStory').addEventListener('click', function() {
			createStory();
		})
	}
	document.addEventListener('DOMContentLoaded', function() {
		if(typeof GRAMMAR === 'undefined') {
			fetch("story.json") // see https://stackoverflow.com/a/42272155
				.then(response => response.json())
				.then(json => loadTracery(json));
		} else if(typeof GRAMMAR === 'object') {
			loadTracery(GRAMMAR);
		} else if(typeof GRAMMAR === 'string') {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', GRAMMAR);
			xhr.onload = function() {
				if (xhr.status === 200) {
					GRAMMAR = JSON.parse(xhr.responseText);
					loadTracery(GRAMMAR);
				}
				else {
					alert('Request failed.  Returned status of ' + xhr.status);
				}
			};
			xhr.send();
		}
	});
})(tracery, baseEngModifiers)