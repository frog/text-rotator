/* 
 * Text Rotator
 *
 * Author: Simone Lippolis - simonelippolis.com
 * Repository URL: https://github.com/frog/text-rotator
 * Please read the license at https://github.com/frog/text-rotator/blob/master/LICENSE
 *
 * Usage:
 *
 * var el = document.querySelector('#element'),
 *     words = [ "loop", "through", "these", "words" ],
 *     rotator = new Rotator( el, words ).start();
 *
 */
var Rotator = function( el, words, speed, wait, alphabet, loop ) {
	var self = {
		// Private properties and methods
		"_alphabet": [],
		"_counter": -1,
		"_createAlphabet": function( alphabet ) {
			if ( alphabet !== null && alphabet !== undefined && Array.isArray(alphabet) ) {
				return  alphabet;
			} else {
				var alphabet = [];
				for (var i=0, l=words.length; i<l; i++) {
					for (var j=0, m=words[i].length; j<m; j++) {
						alphabet.push( words[i][j] );
					}
				}
				return self._getUnique( alphabet );
			}
		},
		"_currentLetterIndex": 0,
		"_currentWordIndex": -1, 
		"_getUnique": function(arr){
			var u = {}, a = [];
			for(var i = 0, l = arr.length; i < l; ++i) {
				if(u.hasOwnProperty(arr[i])) {
					continue;
				}
				a.push(arr[i]);
				u[arr[i]] = 1;
			}
			return a;
		},
		"_el": el,
		"_findLetter": function() {
			self._counter++;
			self._timeout = setTimeout(
			  	function() {
			  		clearTimeout(self._timeout);
			  		if ( self._words[self._currentWordIndex][self._currentLetterIndex] == self._alphabet[self._counter] ) {
						if ( self._currentLetterIndex < self._word.length ) {
							self._word = self._replaceAt( self._word, self._currentLetterIndex, self._alphabet[self._counter]);
						} else {
							self._word = self._word + self._alphabet[self._counter];
						}
						self._el.innerHTML = self._word;
						self._counter = -1;
						self._currentLetterIndex++;
						if ( self._currentLetterIndex < self._words[self._currentWordIndex].length ) {
							self._findLetter();
						} else if ( self._currentLetterIndex == (self._words[self._currentWordIndex].length) ) {
							self._word = self._words[self._currentWordIndex];
							self._el.innerHTML = self._word;
							self._currentLetterIndex = 0;
							self._timeout = setTimeout(
								self._loop,
								self._wait);
						}
					} else {
						if ( self._currentLetterIndex < self._word.length ) {
							self._word = self._replaceAt( self._word, self._currentLetterIndex, self._alphabet[self._counter]);
						} else {
							self._word = self._word + self._alphabet[self._counter];
						}
						self._el.innerHTML = self._word;
						self._findLetter();
					}
			    },
			    self._speed);
		},
		"_init": function() {
			self._alphabet = self._createAlphabet( alphabet );
			return { "start": self.start, "stop": self.stop };
		},
		"_loop": function() {
			clearTimeout(self._timeout);
			self._alphabet = self._shuffle( self._alphabet );
			self._counter = -1;
			self._currentLetterIndex = 0;
			if ( self._currentWordIndex < ( self._words.length - 1 ) ) {
				self._currentWordIndex = (self._currentWordIndex + 1);
				self._findLetter();
			} else if ( self._loopWords ) {
				self._currentWordIndex = 0;
				self._findLetter();
			} else {
				self.stop();
			}
			
		},
		"_loopWords": function() {
			if (loop !== undefined && loop !== null && typeof loop == "boolean") {
				return loop;
			} 
			return true;
		}(),
		"_replaceAt": function(string, index, character) {
			return string.substr(0, index) + character + string.substr(index+character.length);
		},
		"_shuffle": function( array ) {
			var currentIndex = array.length, temporaryValue, randomIndex;
			while (0 !== currentIndex) {
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;
				temporaryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temporaryValue;
			}
			return array;						
		},
		"_speed": function() {
			if (speed !== null && speed !== undefined && !isNaN(speed)) { return speed; }
				else { return 20; }
		}(),
		"_timeout": null,
		"_wait": function() {
			if (wait !== null && wait !== undefined && !isNaN(wait)) { return wait; }
 				else { return 1500; }
		}(),
		"_word": el.innerHTML,
		"_words": words,
		// Pulic properties and methods
		"start": function() {
			clearTimeout(self._timeout);
			self._loop();
		},
		"stop": function() {
			clearTimeout(self._timeout);
		}
	};
	return self._init();
};