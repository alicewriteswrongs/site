---
layout: post
title: "Vim-LaTeXsuite and Mupdf"
date: 2014-10-17T12:56:14-04:00
tags:
    - vim
    - latex
---

#Using muPDF with Vim-LaTeXSuite

I thought to start off this new blog I would share a small tip I recently discovered
for editing LaTeX files on Linux systems using Vim, in particular I'm running Arch Linux.

I'm a big fan of both Vim and LaTeX, so, naturally, I like to write my 
.tex files using Vim. The [Vim-LaTeX suite](http://vim-latex.sourceforge.net/) is 
a great piece of software to add some macros and handy shortcuts to make this easier.

I also like to use [muPDF](http://mupdf.com/) to read PDFs and view images on my machine,
it's a simple GUI-free application that is fast and has vim-like keybindings. I often
found myself hitting `ctrl-z` and running:

    $ mupdf myLaTeXProject.pdf &

but I recently discovered that by adding the following to your `.vimrc`:

    {% highlight latex %}
    let g:Tex_DefaultTargetFormat='pdf'
    let g:Tex_Flavor='latex'
    let g:Tex_ViewRule_pdf='mupdf'
    {% endhighlight %}

we can automate this process! Now when we hit `<Leader>ll` the `.tex` file currently
opened will be automatically compiled to pdf, and by hitting `<Leader>lv` we can open
the pdf in muPDF! Nice!
