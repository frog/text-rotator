# Text Rotator

Text Rotator is a simple script that loops through an array of words, replacing them on
the DOM using a crazy effect.

## Requirements

The script doesn't have any dependency.

## Compatibility

Tested on Safari 9, Chrome 48, and Firefox 43 on Mac, Safari and Chrome on iOS 9, Chrome on Android Marshmallow.

## How to use

1. Include the script;
2. Initialize it when needed:

		var el = document.querySelector('#element');
		var words = [ "loop", "through", "these", "words" ];
		var rotator = new Rotator( el, words ).start();

## Public methods

	Rotator.start()

Starts the animation

	Rotator.stop()

Stops the animation and removes all the listeners and timeouts set.

## Options

	new Rotator( el, words, speed, wait, alphabet, loop );

* ```el``` - ```DOMObject```:Required - The HTML DOM Object that will contain the texts
* ```words``` - ```Array```:Required - The Array of strings you want to loop through
* ```speed``` - ```Int```:Optional (Default: 20) - The speed in milliseconds of the animation on each single letter
* ```wait``` - ```Int```:Optional (Default: 1500) - Once finished writing a word, how much time should the script wait before start to write the following one?
* ```alphabet``` - ```Array```:Optional (Defaults to an array containing  *LOWER CASE* latin letters) - An Array of characters
* ```loop``` - ```Bool```:Optional (Default: true) - Should the script run forever or just once?

## Working example

You can see the script running here: https://simonelippolis.com/rotator