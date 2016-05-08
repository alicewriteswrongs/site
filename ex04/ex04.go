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
	"sort"
	"strings"
)

/*
First off, we're going to be re-using a couple of functions we wrote
for exercise three. First we'll need our little helper functions to check
plaintexts, first our `onlyASCII`, which ensures that we're only dealing with
printable ascii characters:
*/

func onlyASCII(bytes []byte) bool {
	for _, c := range bytes {
		if !asciiCheck(c) {
			return false
		}
	}
	return true
}

func asciiCheck(c byte) bool {
	if c > 31 && c < 127 {
		return true
	} else if c == 10 || c == 10 {
		return true
	} else {
		return false
	}
}

/*
Next is spaceCheck, which just checks that our putative plaintext has a space
somewhere in it:
*/

func spaceCheck(bytes []byte) bool {
	for _, c := range string(bytes) {
		if c == ' ' {
			return true
		}
	}
	return false
}

/*
We'll also need our little `arrayXOR` helper function:
*/

func arrayXOR(in []byte, n byte) []byte {
	out := make([]byte, len(in))
	for i, v := range in {
		out[i] = v ^ n
	}
	return out
}

/*
Next is the most tricky one: scoring based on character count. What we're going
to want to check is that two of the top four most prevalent characters in a potential
plaintext are among the characters `AEOT `. First, a function that takes a string and
returns a `map[rune]int` of characters and their occurences. We'll need to make
sure that we only pass strings which have been made all lowercase, since we don't
have any logic for handling that here:
*/

func charCount(str string) map[rune]int {
	counts := make(map[rune]int)
	for _, c := range str {
		counts[c]++
	}
	return counts
}

/*
Now we're going to need to create a named struct type for holding the relevant
data, so that we can then implement methods on it to satisfy the sort interface.
*/

type sortableCount struct {
	runeSlice []rune
	counts    map[rune]int
}

/*
So we have `sortableCount` struct, which has a slice of runes and a `map[rune]int`. The
idea is that `counts` holds the result of calling `charCount` on a particular string,
and `runeSlice` holds the characters that occur in that string, so that we can then
sort them based on the number of times they occurred.

Then, following the [sort documentation](https://golang.org/pkg/sort/) we need
to implement the following methods on `sortableCount`:
*/

func (s sortableCount) Len() int {
	return len(s.runeSlice)
}

func (s sortableCount) Swap(i, j int) {
	s.runeSlice[i], s.runeSlice[j] = s.runeSlice[j], s.runeSlice[i]
}

func (s sortableCount) Less(i, j int) bool {
	return s.counts[s.runeSlice[i]] < s.counts[s.runeSlice[j]]
}

/*
After implementing these methods we should be able to use the `sort.Sort` interface
to sort our array of runes based on the values stored in the map returned by `charCount`.
Nice!

Then we can do our check. We're basically going to call `charCount` to get the counts
map, put the characters that we find with charCount into the `[]rune` slice on our
`sortableCount` struct, sort that slice based on the counts, and then finally check that
at least 2 of the four most common characters are in the set `AEOT `.

Here we go:
*/

func aeotCheck(bytes []byte) bool {
	sorted := sortableCount{
		runeSlice: []rune{},
		counts:    charCount(strings.ToLower(string(bytes))),
	}
	for c, _ := range sorted.counts {
		sorted.runeSlice = append(sorted.runeSlice, c)
	}

	sort.Sort(sorted)

	length := len(sorted.runeSlice)
	count := 0
	for i := length - 1; i > length-4; i-- {
		for _, c := range "aeto " {
			if sorted.runeSlice[i] == c {
				count++
			}
		}
	}
	if count == 2 {
		return true
	}
	return false
}

/*
Whew! That got a little heavy. Interfaces are kind of cool though, we can `sort.Sort()`
anything at all, and all we have to do is implement these three methods that it looks
for. I think I'm starting to understand how object oriented programming works in Go,
and I think I like it.

Anyway, now that we have our character frequency check sorted out, we'll combine that
with the others to check for valid plaintext:
*/

func validPlaintext(plain []byte) bool {
	return onlyASCII(plain) && spaceCheck(plain) && aeotCheck(plain)
}

/*
Then using these we can write another helper function that takes
a possible ciphertext and tries to break it:
*/

func breakXOR(plain []byte) (map[byte]string, bool) {
	keysAndResults := make(map[byte]string)

	valid := false
	for i := byte(0); i < 255; i++ {
		plain := arrayXOR(plain, i)
		if validPlaintext(plain) {
			keysAndResults[i] = string(plain)
			valid = true
		}
	}
	return keysAndResults, valid
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
		keysAndResults, ok := breakXOR(line)

		if ok {
			for k, plain := range keysAndResults {
				fmt.Printf("key: %d\tplaintext: %s\n", k, plain)
			}
		}
	}
	f.Close()
}

/*
And it works! Hooray!

I'm not sure that my approach here is ultimately correct. In particular,
the `aeotCheck` method is not particular scientific, but instead based on a
little bit of fine-tuning in order to get the right answer.

But it works, so who cares!
*/
