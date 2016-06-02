package main

import "testing"

func TestBitcountOne(t *testing.T) {
	bc := bitCount(1)
	if bc != 1 {
		t.Error("expected 1 for 1, got", bc)
	}
}

func TestBitcountTwo(t *testing.T) {
	bc := bitCount(2)
	if bc != 1 {
		t.Error("expected 1 for 2, got", bc)
	}
}

func TestBitcountThree(t *testing.T) {
	bc := bitCount(52)
	if bc != 3 {
		t.Error("expected 3 for 52, got", bc)
	}
}

func TestBitcountFour(t *testing.T) {
	bc := bitCount(255)
	if bc != 8 {
		t.Error("expected 8 for 255, got", bc)
	}
}

func TestHammingDistanceOne(t *testing.T) {
	distance := hamming([]byte("foo"), []byte("bar"))
	if distance != 8 {
		t.Error("expected 8, got", distance)
	}
}

func TestHammingDistanceTwo(t *testing.T) {
	distance := hamming([]byte("foo"), []byte("foo"))
	if distance != 0 {
		t.Error("expected 0, got", distance)
	}
}

func TestHammingDistanceThree(t *testing.T) {
	distance := hamming([]byte("fizzbuzz"), []byte("fozzbozz"))
	if distance != 5 {
		t.Error("expected 5, got", distance)
	}
}
