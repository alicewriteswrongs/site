/*
---
title: "Exercise 6"
key: "ex06"
---

# Exercise 6

This problem is a little more involved than what we've dealt with so far.
We're presented with a base64 encoded ciphertext, and we're tasked with
breaking the encryption and finidng the plaintext. The ciphertext has been
encrypted using repeating-key XOR, the same cryptosystem we implemented in our
last exercise.

There's a number of things we need to take care of in order to solve the problem,
let's just start running through it!
*/

package main

/*
## Keysize

The first thing we'll need to figure out it is the correct `keysize`, defined as
the length of the `[]byte` serving as our key. We have it narrowed down somewhat by
the question text, which tells us we only have to worry about keys with lengths
ranging from 2 to 40.

We'll need one thing before we can get started:

### Hamming distance

The Hamming distance of two `ASCII` strings is defined as the number of bits
at which those two strings differ. We'll need to calculate this metric when we're
trying to figure out the correct keysize.

First, though, here's a little function that takes a byte and returns a count of
the ones in it's binary representation:
*/

func bitCount(b byte) int {
	count := 0
	notOne := ^byte(1)
	for i := byte(0); i < 8; i++ {
		count += int((b >> i) &^ notOne)
	}
	return count
}

/*
This just takes a byte (`b`), and then we do some bit-twiddling to check
whether each bit in the byte is a one. First, we negate one (`^byte(1)`) to
get a mask `11111110`. Then we can use the `AND NOT` operator (`&^`) to check
the leftmost bit of `b`. `&^` will return `0` when there is a `1` in it's second
operand, so our mask `11111110` will return `0` everywhere except in the leftmost
position. For `&^`, when the bit in the second argument is `0`, it returns the
corresponding value in the first operand. So if that's a `1`, the value of the
whole expression will be one, and otherwise it will be zero. Then we can convert
that result to an integer, and add that to `count`, and we can loop from 0 to 8
and bit-shift our byte to check each bit. Nice!

How are we going to use that to calculate Hamming distance? Well, we can use bitwise
`XOR` to obtain, for two bytes `b1` and `b2`, the byte `b3` where bits are set to `1`
if `b1` and `b2` had a different value at a given position. Then we can just use
our `bitCount` function to count those up!
*/

func hamming(b1 []byte, b2 []byte) int {
	count := 0
	for i := range b1 {
		count += bitCount(b1[i] ^ b2[i])
	}
	return count
}

/*
So how are we going to use this, anyway? Well, the utility of the Hamming distance
function rests on a bit of a wager. We assume that, if \\(k\\) is the correct keysize,
then the average pairwise Hamming distance of the set \\(K\\) of successive chunks of
length \\(k\\) pulled from our ciphertext will be lower than a randomly-chosen keysize.
So in order to find the right keysize, we'll need iterate through the range of possible
keysizes and, for each keysize, chop up our ciphertext into chunks of that size and
record the average pairwise Hamming distance. Then, the keysize with the lowest average
should be correct!

First, let's write a little function that takes a keysize and a `[]byte`, and chunks
it up properly!
*/

func chunks(k int, bytes []byte) [][]byte {
	out := [][]byte{}
	for i := 0; i < len(bytes)/k; i++ {
		out = append(out, bytes[i*k:(i+1)*k])
	}
	return out
}

/*
Now, a function that takes a keysize and a ciphertext, and returns the average pairwise
Hamming distance:
*/

func keysizeDistance(keysize int, bytes []byte) int {
	chunked := chunks(keysize, bytes)
	distance := 0
	for _, chunk := range chunked {
		distance += hamming(chunk, chunked[0])
	}
	return distance
}

// func main() {
// 	f, _ := os.Open("./ex06.txt")

// 	ciphertext := []byte{}

// 	input := bufio.NewScanner(f)
// 	for input.Scan() {

// 	}

// }
