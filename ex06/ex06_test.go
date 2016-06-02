package main

import "testing"

func TestBitcount(t *testing.T) {
	bc := bitCount(1)
	if bc != 1 {
		t.Error("expected 1 for 1, got", bc)
	}

	bc = bitCount(2)
	if bc != 1 {
		t.Error("expected 1 for 2, got", bc)
	}

	bc = bitCount(52)
	if bc != 3 {
		t.Error("expected 3 for 52, got", bc)
	}

	bc = bitCount(255)
	if bc != 8 {
		t.Error("expected 8 for 255, got", bc)
	}

}

func TestHammingDistance(t *testing.T) {
}
