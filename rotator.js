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
		"_alphabet": function() {
			if ( alphabet !== null && alphabet !== undefined && Array.isArray(alphabet) ) {
				return alphabet;
			} else {
				return [ " ", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "à", "á", "ä", "â", "è", "é", "ë", "ê", "ì", "í", "ï", "î", "ò", "ó", "ö", "ô", "ù", "ú", "ü", "û"];
			}
		}(),
		"_counter": -1,
		"_currentLetterIndex": 0,
		"_currentWordIndex": -1, 
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
	return { "start": self.start, "stop": self.stop };
};