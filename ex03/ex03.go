// [Matasano exercise 3](http://cryptopals.com/sets/1/challenges/3/). This asks
// us to break a single byte XOR. Basically, this means that we have a
// ciphertext which has been XORed against a single byte. This means we
// can exhaustively try every byte until we get it.

package main

import (
	"encoding/hex"
	"fmt"
)

// first, we'll need a function that takes a string and returns a count
// of the occurences of each letter.
// We can use a byte -> int map to keep track.
func charCount(str string) map[rune]int {
	counts := make(map[rune]int)
	for _, c := range str {
		_, test := counts[c]
		if test {
			counts[c]++
		} else {
			counts[c] = 1
		}
	}
	return counts
}

func arrayXOR(bytes []byte, n byte) (bytes []byte) {
	return "f"
}

// ## Doing the work

// now that we've written all of the functions we'll need, we can go ahead
// and solve the problem!

// First, declare the ciphertext

func main() {
	const cipherText = "1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736"
	cipherBytes, _ := hex.DecodeString(cipherText)

	fmt.Println("doing a thing")
	charCount(cipherBytes)

}
