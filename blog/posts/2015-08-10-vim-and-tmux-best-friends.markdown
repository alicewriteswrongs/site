---
title: 'Vim and tmux: best friends'
date: 2015-08-10T11:05:48-04:00
layout: post
---

I just wanted to share a lovely plugin for Vim that makes tmux and vim
even better BFFs than they were before. I'm talking, of course, about
[vim-tmux-navigator](https://github.com/christoomey/vim-tmux-navigator)!

Basically the idea is this: if you use splits ('panes') in tmux and you
also use Vim splits there's a little bit of friction whenever you want to
move around. You need to remember whether that thing where you want to go
is a tmux or vim split, and use the right key combo based on whether
you're in Vim or not. For me, I had `leader-hjkl` set up to move through
Vim splits, and `C-w-hjkl` to change tmux splits. This was all very
confusing and bad.

Enter the plugin! Basically what it lets you do is setup one key combo
across Vim and tmux that you can use to navigate between tmux panes, and
between Vim splits within a Vim instance. It's super super nice! Now you
just need to know wherer you want to go and you can mash keys to get
there. Great!

##Configuration funtimes!

Ofc you can just use the default bindings if you want (which are
`crtl-hjkl`) but this overrides the `crtl-l` clear screen binding.
I discovered I do this almost constantly when I first installed this
plugin, if you don't know what I'm talking about then just go with the
defaults!

I wanted to set it up to use `Alt-hjkl` to move around, which is the
binding I used to use for i3wm. Anyway, here's how we do that!

###Install the plugin

um first you need to install it. do this:

    Plugin 'christoomey/vim-tmux-navigator'

if you use Vundle. If you don't, you probably know how to sort things out
(e.g. with pathogen or what have you) but if you don't use a package
manager, then totally switch to
[Vundle](https://github.com/VundleVim/Vundle.vim)! b/c it is great.

###~/.vimrc

We need some stuff in our `~/.vimrc`. You can check out the relevant file
in my [dotfiles
repo](https://github.com/aliceriot/dotfiles/blob/master/vimrc/laptop_plugin_config.vimrc).
Here's what we need:

    let g:tmux_navigator_no_mappings = 1

this blows away the default mappings, and lets us do our own. Then we need
to set them up! A word of warning: how you accomplish the following will
depend to a certain extent on your terminal emulator. I use the gnome
terminal, which doesn't send a normal Alt through to the terminal, so you
can't use the normal `A-j` or `M-j` notation to say 'hey, bind Alt-j to
such-and-such'. Instead we have to send the right escaped keycode, by
doing `crtl-v` and then typing the key we want. So if you copy paste this
it may not work? Try it! Then try overwriting the bindings with `C-v-Alt`.

Anyway, here's how we bind!

{% highlight vim %}
nnoremap <silent> h :TmuxNavigateLeft<cr>
nnoremap <silent> j :TmuxNavigateDown<cr>
nnoremap <silent> k :TmuxNavigateUp<cr>
nnoremap <silent> l :TmuxNavigateRight<cr>
nnoremap <silent> \ :TmuxNavigateRight<cr>
{% endhighlight %}

Great! Now `Alt-hjkl` will move you around within Vim in a way that makes
sense for Vim people. What about tmux?

###~/.tmux.conf

For tmux we can use the normal `m-h` notation (for meta-h). This looks
like:

{% highlight bash %}
is_vim='echo "#{pane_current_command}" | grep -iqE "(^|\/)g?(view|n?vim?)(diff)?$"'
bind -n m-h if-shell "$is_vim" "send-keys m-h" "select-pane -L"
bind -n m-j if-shell "$is_vim" "send-keys m-j" "select-pane -D"
bind -n m-k if-shell "$is_vim" "send-keys m-k" "select-pane -U"
bind -n m-l if-shell "$is_vim" "send-keys m-l" "select-pane -R"
bind -n m-\ if-shell "$is_vim" "send-keys m-\\" "select-pane -l"
{% endhighlight %}

Great! Basically this defines a little function to figure out if a pane
contains a Vim instance, and then based on that info it decides whether to
send the keybind through to Vim (to move around between Vim splits) or to
move to another tmux pane. Lovely!

I can't really understate my enthusiasm for this setup! It's literally so
great!
















