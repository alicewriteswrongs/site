// The [2nd Matasano challenge](http://cryptopals.com/sets/1/challenges/2/)!
// Now we're doing fixed XOR. Basically, we have two input strings:

// ```
// s1: 1c0111001f010100061a024b53535009181c
// s2: 686974207468652062756c6c277320657965
// ```

// We want to do a pairwise XOR on them (`for n in len(s1), do s1[n] XOR s2[n]`)
// and check that the output looks like this (when hex encoded):

// ```
// output: 746865206b696420646f6e277420706c6179
// ```

// Great, let's go!
package main

import (
    "encoding/hex"
    "fmt"
)

// First, a little function that performs the XOR operation for us.
// It just takes in two byte arrays, and iterates through doing the
// XOR operation.
func fixedXOR(a1, a2 []byte) (bytes []byte) {
    bytes = make([]byte, len(a1))
    for i, v := range a1 {
        bytes[i] = v^a2[i]
    }
    return
}

// now our variables
var s1, s2, output []byte
const correctAnswer string = "746865206b696420646f6e277420706c6179"

// main!
func main () {
    s1, _ := hex.DecodeString("1c0111001f010100061a024b53535009181c")
    s2, _ := hex.DecodeString("686974207468652062756c6c277320657965")

    output = fixedXOR(s1, s2)
    fmt.Println(hex.EncodeToString(output))

    // we can check that it works:
    if hex.EncodeToString(output) == correctAnswer {
        fmt.Println("It works!")
    } else {
        fmt.Println("It doesn't work so much :(")
    }
}
