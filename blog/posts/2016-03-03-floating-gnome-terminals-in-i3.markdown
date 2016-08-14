---
layout: post
title: Floating Gnome Terminals in i3
date: 2016-03-03T12:17:12-05:00
---

I've been using i3 for a good long while, and my initial choice for
a terminal emulator was urxvt. I liked that it was simple, configured with
a text file (`~/.Xdefaults`), and lightweight, although I grew tired of
the flaky perl extensions, and missing basic functionality like a key
combo to change the font size. So I switched to Gnome Terminal, which I've
been using very happily.

The one final thing I hadn't yet ported over to the Gnome terminal config
was floating terms in i3. With `urxvt` I had just created a symlink to the
normal executable, which would change the title of the window. Then it was
a simple matter of a key combo to execute the symlink and a floating rule
in `i3` to get a key combo to open a terminal floating on top of whatever
other windows I have open (really useful for running on or two commands).
I tried this same approach with `gnome-terminal`, but it turns out to be
a little more insistent on what its window title should look like.

Anyway, I finally figured out a nice (well, sorta) way to get this
functionality in `i3` with `gnome-terminal`! Here's how to do it.

##Setting windows titles with the shell

It turns out that, as with a lot of terminal related stuff, setting the
window title for a lot of different X windows terminal emulators is just
a matter of sending the right escaped key sequence. I found somewhere
online the following function:

{% highlight bash %}
function () title {
    echo -ne "\033]0;$1\007"
}
{% endhighlight %}

then if we do something like `title Foobar` we should get something like
the following:

![window title](/images/foobar_window_title.png)

so we've changed the window's title to Foobar, and we can see it listed if
we list the windows on the system with `wmctrl -l`. Nice!

##Making windows float!

In `i3` it's very simple to make windows float. We just add this line to
the `i3` configuration file (`~/.i3/config`):

    for_window [title="Float"] floating enable

Great - now any window with the title `Float` will float!

##Running the title function on startup

Great, so now we can set the title for a gnome terminal to whatever we
want. All we need to figure out now is how to get that function to run on
startup in gnome-terminal.

Fair warning: I'm a shell noob. I ran into a bunch of character escaping
/ quoting issues, and this how I solved it :P

First, another shell function:

{% highlight bash %}
function floating_gnome_term () {
    gnome-terminal -e "zsh -c '$(declare -f title); title Float; zsh'"
}
{% endhighlight %}

the `-e` option accepts a command that will be run on startup.

Then we need a shell script (in our `$PATH` somehow):

{% highlight bash %}
#!/bin/zsh

source ~/.zshrc
floating_gnome_term
{% endhighlight %}

this just sources all of our `zsh` stuff and then runs the function above.
Now the final step is just adding a keybind to run this shell script in
i3:

    bindsym $mod+Shift+Return exec floating_gnome_term.sh

and that's it! I have `$mod+Return` bound to a normal, tiling terminal
window, so adding `Shift` makes sense to me.

Floating windows everywhere!

![floats](/images/so_much_floating.png)
