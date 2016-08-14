---
title: Literate programming in Python
date: 2015-08-11T18:03:01-04:00
layout: post
---

Literate programming is something I read about a while ago (probably
while reading [Donald Knuth's](200~https://en.wikipedia.org/wiki/Donald_Knuth) 
terrifying overachiever Wikipedia page) and while I thought it sounded 
cool, I never really gave it a try. Well, I have now given it a try!

It's actually really great! I've just started a project to write a DNS
resolver in literate Python. It's not very far along, but you can check
out the program
[here](https://github.com/aliceriot/pyresolve/blob/master/pyresolve.md).
I'm using a package called Pweave to make this all work together. It's
pretty easy, but there are a couple of rough edges. So, how does it work?

##Writing literate Python

I'm doing a pretty simple approach, which is to write the
documentation/markup in Markdown. Pweave also supports LaTeX, ReST, and
a couple of other text formatting languages if you have a strong
preference. Basically what we do is write something like this:

{% highlight bash %}
#My program

This is my great program. Its great!

And now, some code:

<<>>=
def functionone(myarg):
    dostuff(myarg)
    for foo in bar:
        raise ValueError
    return asdfasdf
@

What a great program!
{% endhighlight %}

OK, so basically you just write a Markdown file, and any code you write in
between a `<<>>=` opener and the `@` closer will be the source code. The
Pweave program gives you two command line utilities that are helpful. The
first is `Pweave`, which will do a 'weave' operation on your source code. 

Knuth invented this terminology: he called his hybrid language (composed
of LaTeX and Pascal source) WEB - so in the grand tradition of cute names
in programming the main operations we can do on the WEB are Weaving and
Tangling. Weaving takes the combined source and outputs cleanly formatted
documentation - this could be html, Markdown, or LaTeX/PDF. Tangling does
the opposite operation, and outputs clean source code - chopping out all
of the documentation.

With Pweave, if we have a really interesting `myprogram.mdw`, we can get
a clean .md file with:

{% highlight bash %}
Pweave -f pandoc myprogram.mdw
{% endhighlight %}

The `-f` flag is our output format, so we could also pick html or PDF or
something stranger here. If we want to do a tangle, we do this:

{% highlight bash %}
Ptangle myprogram.mdw
{% endhighlight %}

This will give us a nice clean `myprogram.py` in the same directory. Cool!

##Vim strangeness

So that's great! It's pretty easy to write your documentation and program
at the same time, and it really makes you ensure that you're keeping the
documentation and the code in sync. The problem with all this, though, is
that they file you're editing is effectively two different languages. We
have Markdown for the documentation and Python for the actual program, so
how does your editor decide what syntax highlighting to use? Well, not all
that intelligently.

I ended up adding a couple of bindings to Vim to switch the filetype
between Markdown and Python:

{% highlight vim %}
nnoremap <Leader>lp :setlocal ft=python<cr>
nnoremap <Leader>md :setlocal ft=markdown<cr>
{% endhighlight %}

So I can hit `<Leader>lp` (literate Python) to get to Python mode, and
`<Leader>md` to get to Markdown. It works decently well!

I also added a couple of super handy shell aliases. Since I'm basically
writing the Markdown portion of the project for Github I want to really
frequently check how things are rendering. This alias is handy:

{% highlight bash %}
alias litpush='Pweave -f pandoc *.mdw && git commit -a && git push origin master'
{% endhighlight %}

This will weave (produce clean markdown) any `.mdw` files in the
directory, commit any changes (for previously committed files), and push
the commit to Github. Nice!

##Limitations

Where you can split up the source code in your main file is somewhat
limited. I discovered, for instance, that there isn't a good way to have
documentation interleaved with a class definition. If you
have just the `__init__` method above the documentation, and another
method on that class below, you'll get an 'unexpected indentation' error
when you try to do `Pweave`. This is irritating, especially since
`Ptangle` works just fine in this situation. 

Anyway, small gripes aside, it's been fun! Maybe try it out sometime?
