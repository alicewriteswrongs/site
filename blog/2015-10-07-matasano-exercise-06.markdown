---
title: Matasano Exercise 06
date: 2015-10-07T22:58:44-04:00
layout: post
---

#Matasano exercise 06

This is a literate Python explanation of [my
solution](https://github.com/aliceriot/CryptoPals/tree/master/set1/Python/ex06)
to the [sixth](http://cryptopals.com/sets/1/challenges/6/) Matasano
problem. It may look better on [github](https://github.com/aliceriot/CryptoPals/blob/master/set1/Python/ex06/literate_python/matasano_06.md) than it does here, which brings me great shame.

Needless to say, if you are doing the challenges yourself, you should not
read this! It will make it far too easy. If, however, you've been stuck on
this question, you may find this helpful!

##The Problem

Here we have a message which has been encrypted with repeating-key XOR
(which is, more or less, the Vigenere's cipher). It's encoded in Base64,
and we want to figure out how to read it! Great! How do?

Well, actually the Matasano folks give us a really nice explanation of how to
proceed. Basically I'm going to take their overview, modify it somewhat, and
intersperse the code that performs that step. Cool!

First off, we'll read in the ciphertext:


{% highlight python %}
from base64 import b64decode

with open("./ex06.txt") as f:
    ciphertext = b64decode(''.join([l.strip() for l in f.readlines()]))
{% endhighlight %}



We read in the file line-by-line, strip off newlines, and join all the
cleaned lines together. The `b64decode` function returns a `bytes` object.

##KEYSIZE

Keysize is the length of the key. Since this is the repeating-key XOR
cryptosystem this is basically the number of bytes in a key. A message is
encrypted by XORing character `i` with `key[i % keysize]`, so for a keysize of
4 the fourth, eighth, twelfth, and so on characters will all be XORed with
the fourth byte of the key (and same for the first, fifth, ninth, etc.
with the first byte of the key).

Matasano lets us know that we only have to worry about keysize ranging between
2 and 40 (they're so helpful with the hints sometimes!). So we'll need some way
to figure out the most appropriate keysize - once we know that we can get to
the business of figuring out the key.

##Hamming Distance

Hamming distance is a metric for *string difference*, and in this case we want
to essentially count the number of bits where two strings (C-style bytestrings)
are different.

Here's a little function to do that:


{% highlight python %}
def distance(s1, s2):
    return sum(bin(x^y).count('1') for x,y in zip(s1,s2))
{% endhighlight %}



Ok, so we zip string one and string two together, then we XOR them (which
will leave ones wherever they differ), use `bin` to get a string
representation of that, and then count the number of ones. If we sum this
across `zip(s1,s2)` we get our difference. Nice!

##Finding the right KEYSIZE

OK, now that we've defined the Hamming distance, we can use that to find
an appropriate keysize with which to move forward. Basically, we expect
that if we have the right keysize, then if we chunk the ciphertext into
blocks of `keysize` length, we should see a lower Hamming distance between
those chunks than we would between chunks of a randomly selected length.
This is because if we have `keysize` correct, then those chunks will have
been XORed against the same block, and so will have that in common. Great!

This is a class named `Keysieve` which does this for us:


{% highlight python %}
from statistics import mean

class Keysieve(object):
    def __init__(self, ciphertext, minkey, maxkey):
        self.scores = []
        self.keys = range(minkey, maxkey + 1)
        self.ctext = ciphertext
        self.sieve()

    def sieve(self):
        for ksize in self.keys:
            first = self.ctext[:ksize]
            chunks = [self.ctext[i*ksize:(i+1)*ksize] for i in range(10)]
            scores = [distance(first, i)/ksize for i in chunks]
            self.scores.append((ksize, mean(scores)))
        self.scores.sort(key = lambda x: x[1])
{% endhighlight %}

The constructor for `Keysieve` takes a minkey and a maxkey, which are the
bounds on our keysize search space. We also need to have a ciphertext to
work on.

Lets instantiate a `Keysieve` object now:

{% highlight python %}
keysieve = Keysieve(ciphertext, 2,40)
{% endhighlight %}

Great! When we instantiate the object the `sieve` method gets called
automatically. This is going to iterate through the possible keysizes and,
for each one, calculate the average pairwise Hamming distance between the
first chunk of size `keysize` and all other chunks. We assume that the
keysize that results in the lowest score will be our winner, so then we
call the `sort` method on `keysieve.scores`.

Then we can get our putative best keysize by doing:

{% highlight python %}
keysize = keysieve.scores[0][0]
{% endhighlight %}

##Breaking up the Ciphertext

Now that we know the `keysize` we can get on with solving the problem.
First we want to split the ciphertext up into `keysize` different blocks,
where each block is composed of the bytes in the ciphertext whose
remainder modulo `keysize` is a particular number. So there will be
a block of all those bytes whose index modulo `keysize` is 0, all those
whose index modulo `keysize` is 1, and so on, up to `keysize -1`.

Then we have a block which is constructed from the first byte from every
`keysize` chunk, the second byte from every `keysize` chunk, and so on.
Then we can take those blocks and, since they've all been XORed with the
same byte of the key, we can solve them each independently as if they were
separate ciphertexts encrypted with single byte XOR. Great!

###Making the blocks

Here's how we'll make the blocks (naturally, with a class called
`Blocks`):

{% highlight python %}
class Blocks(object):
    """takes ciphertext and best keysizes, makes blocks"""
    def __init__(self, ciphertext, keysize):
        self.ciphertext = ciphertext
        self.keysize = keysize
        self.blocks = [[] for i in range(self.keysize)]
        self.blockify()

    def blockify(self):
        for tup in enumerate(self.ciphertext):
            self.blocks[tup[0] % self.keysize].append(tup[1])
        map(bytearray, self.blocks)
{% endhighlight %}

Now we can make the blocks! Weee!

{% highlight python %}
blocks = Blocks(ciphertext, keysize)
{% endhighlight %}

Cool, we have `blocks`.

##Solving the Blocks

As we said above, we now have a bunch of blocks, each of which we can
solve in the same way we solved single byte XOR. Basically we're going to
rely on a couple of assumptions about what a *correct* key will look like.

First off, we assume that a correct key will, when XORed with the
ciphertext, produce a readable message. Readable messages, in general,
consist of ASCII characters like letters, spaces, and so on.

I tried out a bunch of different scoring schemes for this step, and this
is what gave me the best result:

{% highlight python %}
from collections import Counter

class Singlebyte(object):
    def __init__(self, block):
        self.ctext = block
        self.keys = []
        self.scorekeys()
        self.bestkey = max(self.keys, key = lambda x: x[1])

    def scorekeys(self):
        common = 'etaoinshrd'
        for key in range(256):
            plain = ''.join(map(lambda c: chr(c^key), self.ctext))
            spaces = plain.count(' ')
            upper = sum(plain.count(c) for c in common.upper())
            lower = sum(plain.count(c) for c in common)
            self.keys.append((key, spaces + upper + lower))
{% endhighlight %}

So our `scorekeys` method will score a key by adding the number of
spaces to the number of upper and lower case examples of the letters
`etaoinshrd`.

Seems random right? I thought so too, but it does work!

Anyway, to get a key we do this:

{% highlight python %}
key = bytearray()
for block in blocks.blocks:
    temp = Singlebyte(block)
    key.append(temp.bestkey[0])
{% endhighlight %}

So we iterate through our blocks, solving each one using `Singlebyte`, and
appending the best key to a master key. We're almost there now!

##Decrypting the Ciphertext

Now that we have the correct key we want to use it to get the plaintext
for our ciphertext. I promise this is the last class definition you need
to read:

{% highlight python %}
class Decrypt(object):
    def __init__(self, ciphertext, key):
        self.ctext = ciphertext
        self.key = key
        self.plaintext = ''
        self.decrypt()

    def decrypt(self):
        temp = []
        for i in enumerate(self.ctext):
            temp.append(i[1] ^ self.key[i[0] % len(self.key)])
        self.plaintext = ''.join(map(chr, temp))
{% endhighlight %}

So we pass in the ciphertext and the newly minted key. Then we have
a `decrypt` method which is going to iterate through the ciphertext and
XOR character `i` with `key[i % keysize]`. If all goes well, we will have
a plaintext message waiting for us!

Here's how we'd find the final answer:

{% highlight python %}
decrypt = Decrypt(ciphertext, key)
{% endhighlight %}


Then we could get the plaintext out by doing:

    print("The key was: {}".format(''.join(map(chr, key))))
    print("Plaintext:")
    print(decrypt.plaintext)

but I don't want to spoil *everything* for you, at least go run this code
yourself!
