package main

import (
	"fmt"
	"testing"
)

// bitCount
type bitCountTestPair struct {
	value       byte
	expectation int
}

var bitCountTestPairs = []bitCountTestPair{
	{1, 1},
	{2, 1},
	{52, 3},
	{255, 8},
}

func TestBitcountOne(t *testing.T) {
	for _, pair := range bitCountTestPairs {
		bc := bitCount(pair.value)
		if bc != pair.expectation {
			t.Error(
				"For", pair.value,
				"expected", pair.expectation,
				"got", bc,
			)
		}
	}
}

// hamming distance
type hammingTestPair struct {
	s1          string
	s2          string
	expectation int
}

var hammingTestPairs = []hammingTestPair{
	{"foo", "bar", 8},
	{"foo", "foo", 0},
	{"fizzbuzz", "fozzbozz", 5},
}

func TestHammingDistance(t *testing.T) {
	for _, pair := range hammingTestPairs {
		dist := hamming([]byte(pair.s1), []byte(pair.s2))
		if dist != pair.expectation {
			t.Error(
				"For", pair.s1, pair.s2,
				"expected", pair.expectation,
				"got", dist,
			)
		}
	}
}

// chunks
func byteSliceEquality(b1 [][]byte, b2 [][]byte) bool {
	if len(b1) != len(b2) {
		fmt.Println("asdf")
		return false
	}
	for i := range b1 {
		if len(b1[i]) != len(b2[i]) {
			return false
		}
		for j := range b1[i] {
			if b1[i][j] != b2[i][j] {
				return false
			}
		}
	}
	return true
}

type chunkTest struct {
	bytes       []byte
	expectation [][]byte
	size        int
}

var chunkTestTriples = []chunkTest{
	{[]byte("foobar"), [][]byte{[]byte("foo"), []byte("bar")}, 3},
	{[]byte("foobar"), [][]byte{[]byte("fo"), []byte("ob"), []byte("ar")}, 2},
	{[]byte("flippit"), [][]byte{[]byte("flippit")}, 7},
	{[]byte("123456789"), [][]byte{
		[]byte("123"),
		[]byte("456"),
		[]byte("789"),
	}, 3},
	{[]byte("abcdefg"), [][]byte{
		[]byte("abc"),
		[]byte("def"),
		[]byte("g"),
	}, 3},
	{[]byte(""), [][]byte{[]byte("")}, 4},
	{[]byte("a longer example"), [][]byte{
		[]byte("a longe"),
		[]byte("r examp"),
		[]byte("le"),
	}, 7},
}

func TestChunks(t *testing.T) {
	for _, pair := range chunkTestTriples {
		testChunks := chunks(pair.size, pair.bytes)
		if !byteSliceEquality(testChunks, pair.expectation) {
			t.Error(
				"expected",
				pair.expectation,
				"got",
				testChunks,
			)
		}
	}
}
