package main

import (
	"fmt"
	"reflect"
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
	{"this is a test", "wokka wokka!!!", 37},
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
		if !reflect.DeepEqual(testChunks, pair.expectation) {
			t.Error(
				"expected",
				pair.expectation,
				"got",
				testChunks,
			)
		}
	}
}

// test keysizeDistance

type keysizeDistanceTest struct {
	keysize     int
	bytes       []byte
	expectation int
}

var keysizeTestCases = []keysizeDistanceTest{}

func TestKeysizeDistance(t *testing.T) {
}

func TestKeySize(t *testing.T) {
	bytes := []byte("some bytes to test wow bytes wowowowow")

	keysize := keySize(1, 10, bytes)
	fmt.Println(keysize)

}

// test splitByModulo

type splitByModuloTest struct {
	size        int
	bytes       []byte
	expectation [][]byte
}

var splitByModuloTestCases = []splitByModuloTest{
	{4, []byte("12345678"), [][]byte{
		[]byte("15"),
		[]byte("26"),
		[]byte("37"),
		[]byte("48"),
	}},
	{3, []byte("12345678"), [][]byte{
		[]byte("147"),
		[]byte("258"),
		[]byte("36"),
	}},
}

func TestSplitByModulo(t *testing.T) {
	for _, testCase := range splitByModuloTestCases {
		split := splitByModulo(testCase.size, testCase.bytes)
		if !reflect.DeepEqual(split, testCase.expectation) {
			t.Error(
				"expected",
				testCase.expectation,
				"got",
				split,
			)
		}
	}
}
