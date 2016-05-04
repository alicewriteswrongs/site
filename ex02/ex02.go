/*
The [2nd Matasano challenge](http://cryptopals.com/sets/1/challenges/2/)!
Now we're doing fixed XOR. Basically, we have two input strings:

```
s1: 1c0111001f010100061a024b53535009181c
s2: 686974207468652062756c6c277320657965
```

We want to do a pairwise XOR on them (`for n in len(s1), do s1[n] XOR s2[n]`)
and check that the output looks like this (when hex encoded):

```
output: 746865206b696420646f6e277420706c6179
```

Great, let's go!
*/

package main

import (
	"encoding/hex"
	"fmt"
)

/*
First, a little function that performs the XOR operation for us.
It just takes in two byte arrays, and iterates through doing the
XOR operation:
*/
func fixedXOR(a1, a2 []byte) (bytes []byte) {
	bytes = make([]byte, len(a1))
	for i, v := range a1 {
		bytes[i] = v ^ a2[i]
	}
	return
}

//We'll declare our variables ahead of time:
var s1, s2, output []byte

const correctAnswer string = "746865206b696420646f6e277420706c6179"

/*
Here's our main function, where we'll do all the work. Go is a bit
like C, in that, if you have `package main` up top, a function called
`main` will automatically be called when you run the binary built from
this file.
*/
func main() {
	/*
	   Go seems to be a bit picky about position returns - here the
	   `hex.DecodeString` method returns two values, a byte slice and
	   a boolean that signals if there were any errors.

	   We're not really expecting any, so we'll use the `_` to signal
	   that we don't care about putting a name to that value.

	   We also get to use the `:=` operator, which lets us skip declaring
	   a type for variables we bind. Anything with an inferrable type (a
	   return from a function, a literal) will cause the type of our variable
	   to be automatically inferred. Handy!
	*/
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

/*
That's it! Not too much to this problem, really.
*/
