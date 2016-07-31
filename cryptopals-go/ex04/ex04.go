/*
---
layout: matasano_exercise
title: "Exercise 4"
key: "ex04"
---

# Exercise 4

In [exercise 4](http://cryptopals.com/sets/1/challenges/4) we're given
326 60-character hex encoded strings, and we're tasked with figuring out
which one has been encoded with single-byte XOR (as seen in [exercise 3](/matasano/ex03.html)).

Should be fun!
*/

package ex04

import (
	"bufio"
	"encoding/hex"
	"fmt"
	"os"
	"sort"
	"strings"
)

/*
This problem seems daunting at first, but it's really not that bad. Let's get
going!

First off, we're going to be re-using our `arrayXOR` function from exercise 3:
*/

func arrayXOR(in []byte, n byte) []byte {
	out := make([]byte, len(in))
	for i, v := range in {
		out[i] = v ^ n
	}
	return out
}

/*
Then we need a function to compute a score. This function will be passed a
putative plaintext value, and we want to score the 'plaintext-ey-ness' of it.
This isn't super complicated, basically we have a short list of common letters,
and we're going to sum the count of those common letters and the number of
spaces in the plaintext:
*/

func resultScore(result []byte) int {
	common := "etaoinshrd"
	score := 0
	score += strings.Count(string(result), " ")
	for _, c := range common {
		score += strings.Count(string(result), string(c))
	}
	return score
}

/*
It sort of seems like it should be harder than that, but this actually works!

Anyway moving on, here we're going to declare a struct which will hold a result:
a `Key`, a potential plaintext (decrypted with that key), and a `Score`,
computed with our function above:
*/

type XORResult struct {
	Key    byte
	Score  int
	Result []byte
}

type XORResults []XORResult

/*
When we solve the problem we're going to be building a big array of `XORResult`
structs, and we need a way to find the correct one. Since we're already storing
the `score` of each putative plaintext / key combination, we can implement a few methods
on the struct to satisfy `sort.Sort`:
*/

func (x XORResults) Len() int {
	return len(x)
}

func (x XORResults) Swap(i, j int) {
	x[i], x[j] = x[j], x[i]
}

func (x XORResults) Less(i, j int) bool {
	return x[j].Score < x[i].Score
}

/*
Then, finally, we can put it all together.
*/

func BreakXOR(input []byte) XORResults {
	results := XORResults{}

	for i := byte(0); i < 255; i++ {
		plain := arrayXOR(input, i)
		result := XORResult{i, resultScore(plain), plain}
		results = append(results, result)
	}
	return results
}

/*
Great! Now all we're going to do in `main` is read in the file,
and then for each line we'll run our `BreakXOR` function, and then
merge the output together (in `results`). Then we just need to sort
`results` and print out the first result!
*/

func solveExercise() {
	f, _ := os.Open("./exercise_4.txt")

	input := bufio.NewScanner(f)
	results := XORResults{}
	for input.Scan() {
		line, _ := hex.DecodeString(input.Text())
		result := BreakXOR(line)
		for _, r := range result {
			results = append(results, r)
		}
	}
	f.Close()

	sort.Sort(results)
	fmt.Printf("key: %d\tplaintext: %s\n", results[0].Key, results[0].Result)
}

/*
And it works! Hooray!
*/
