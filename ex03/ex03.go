// [Matasano exercise 3](http://cryptopals.com/sets/1/challenges/3/). This asks
// us to break a single byte XOR. Basically, this means that we have a
// ciphertext which has been XORed against a single byte. This means we
// can exhaustively try every byte until we get it.

package main

import (
    // "fmt"
    "encoding/hex"
)

// declare the ciphertext
const cipherText = "1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736"
var cipherBytes []byte


func main () {
    cipherBytes, _ = hex.DecodeString(cipherText)
}
