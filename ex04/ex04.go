/*
---
layout: matasano_exercise
title: "Exercise 4"
---

# Exercise 4

In [exercise 4](http://cryptopals.com/sets/1/challenges/4) we're given
326 60-character hex encoded strings, and we're tasked with figuring out
which one has been encoded with single-byte XOR (as seen in [exercise 3](/matasano/ex03.html)).

Should be fun!
*/

package main

import (
	"bufio"
	"encoding/hex"
	"fmt"
	"os"
	"strings"
)

/* First off, we're going to be re-using a couple of functions we wrote
for exercise three. First we'll need our little helper functions to check
plaintexts:
*/

func asciiCheck(bytes []byte) bool {
	for _, c := range bytes {
		if !charCheck(c) {
			return false
		}
	}
	return true
}

func charCheck(c byte) bool {
	if c > 31 && c < 127 {
		return true
	} else if c == 10 || c == 10 {
		return true
	} else {
		return false
	}
}

func spaceCheck(bytes []byte) bool {
	for _, c := range string(bytes) {
		if c == ' ' {
			return true
		}
	}
	return false
}

func charCount(str string) map[rune]int {
	counts := make(map[rune]int)
	for _, c := range str {
		counts[c]++
	}
	return counts
}

func aeotCheck(bytes []byte) bool {
	counts := charCount(strings.ToLower(string(bytes)))
	var biggest rune
	count := 0
	for k, v := range counts {
		if v > count {
			biggest = k
			count = v
		}
	}
	for _, c := range "aeto " {
		if biggest == c {
			return true
		}
	}
	return false
}

func validPlaintext(plain []byte) bool {
	return asciiCheck(plain) && spaceCheck(plain) && aeotCheck(plain)
}

/*
Great! Then based on those we can write another helper function that takes
a possible ciphertext and tries to break it:
*/

func breakXOR(plain []byte) (map[byte]string, bool) {
	keysAndResults := make(map[byte]string)

	found := false
	for i := byte(0); i < 255; i++ {
		plain := arrayXOR(plain, i)
		if validPlaintext(plain) {
			keysAndResults[i] = string(plain)
			found = true
		}
	}
	return keysAndResults, found
}

/*
We'll also need our arrayXOR function:
*/

func arrayXOR(in []byte, n byte) []byte {
	out := make([]byte, len(in))
	for i, v := range in {
		out[i] = v ^ n
	}
	return out
}

/*
Great! Now all we really need to do in `main` is read in the file,
and then iterate through and check if `breakXOR` returns anything. If
it does, we'll print the output:
*/

func main() {
	f, _ := os.Open("./exercise_4.txt")

	input := bufio.NewScanner(f)
	for input.Scan() {
		line, _ := hex.DecodeString(input.Text())
		keysAndResults, _ := breakXOR(line)
		for k, plain := range keysAndResults {
			fmt.Printf("key: %d\tplaintext: %s\n", k, plain)
		}
	}
	f.Close()
}
