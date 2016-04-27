// This is the [first Matasano challenge](http://cryptopals.com/sets/1/challenges/1/)
// - a very simple one. We just need to convert the following hex string:

// ```
// 49276d206b696c6c696e6720796f757220627261696e
// 206c696b65206120706f69736f6e6f7573206d757368
// 726f6f6d
// ```

// to base64:

// ```
// SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9p
// c29ub3VzIG11c2hyb29t
// ```

// Let's get started! This isn't a very complicated problem, so our 
// program isn't very complicated either.

package main

import (
    "fmt"
    "encoding/hex"
    "encoding/base64"
)

const (
    hexString string = "49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d"
    base64Answer string = "SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t"
)
var (
    base64Output string
    rawBytes []byte
)

func main () {
    rawBytes, _ := hex.DecodeString(hexString)

    base64Output = base64.StdEncoding.EncodeToString(rawBytes)

    fmt.Println("hex string:")
    fmt.Println(hexString + "\n")
    fmt.Println("the string, translated to base64:")
    fmt.Println(base64Output + "\n")

    if base64Output == base64Answer {
        fmt.Println("it works! hooray!")
    } else {
        fmt.Println("sad :(")
    }
}

// Basically, all we've done is use some functions from the `encoding` module.
// I learned a bit about go syntax, modules, and build stuff doing this.
