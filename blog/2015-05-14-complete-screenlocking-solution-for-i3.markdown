---
layout: post
title: Complete screenlocking solution for i3
date: 2015-05-14T12:50:41-04:00
tags:
    - security
    - i3wm
---

I've been using [i3](https://i3wm.org) for a while now, and while I'm
a complete tiling window manager convert, I've had trouble with a couple
small things which are mostly 'automatic' on heavier desktop environments.

One of those is screenlocking. If you use Gnome, for instance, you get
a nice screenlocker that is reasonable secure (can't switch to a tty, for
instance), and lets you switch accounts, etc. While my user account is the
only one on my machine, I wanted to have a complete solution for keeping
my laptop secure.

##i3lock

Thankfully, i3 ships with a utility called i3lock, which is what it sounds
like (a lightweight screenlocker to use with i3). Basically you just call:

    i3lock

To lock the screen with default options (a white background). I wanted
something a little fancier, so I use this shellscript (i3lock.sh) instead:

    #!/bin/bash
    scrot /tmp/screen.png
    convert /tmp/screen.png -scale 10% -scale 1000% /tmp/screen.png
    i3lock -d -i /tmp/screen.png

I found this on either reddit or Github, but I can't remember where! If
I did I would give credit to the original author. Essentially what this
does is take a screen shot, shrink it down to 10% of the original size,
and then blow that back up to the original size. Here's what this looks
like:

![Before conversion](/images/i3lockscreenbefore.png)

![After conversion](/images/i3lockscreenafter.png)

I think this is pretty slick! It's really fast, and the unlock effect of
the pixelated image giving way to your desktop is pretty nice (I'm not
tired of it yet, anyway!).

##Activating i3lock

OK, so if we've got a nice little shellscript written, how do we actually
lock the screen? I do it three different ways to cover all my bases.

###Key combo

In my `i3config`:

    bindsym $mod+ctrl+Shift+l exec i3lock.sh

Note that the directory in which my shellscripts are saved is in my $PATH,
so this works. I like having a key command because sometimes if I'm
getting up from my desk I'd like to lock the screen, but I don't
necessarily want to suspend the machine.

###Xautolock

Sometimes, though, I do a bad thing and walk away from my open, running
laptop. Oh no, anyone can get in!

In order to have the screen lock automatically after 10 minutes of
inactivity (even if the computer hasn't gone to sleep or had the lid
closed) I use
[xautolock](https://www.archlinux.org/packages/community/x86_64/xautolock/),
with the following in my .xinitrc:

    {% highlight bash %}
    xautolock -time 10 -locker "i3lock.sh" &
    {% endhighlight %}

I also do:

    {% highlight bash %}
    xset dpms 300 600 0 &
    {% endhighlight %}

So the computer is set to blank the screen after 5 minutes (the 300 is in
seconds) and then lock after 10 minutes. 

###Systemd service

So that covers two ways of starting the locker, but I'd also like to make
sure that the screen is locked anytime I close the lid or suspend the
computer. To do that we can write a new systemd service, like so:

    [Unit]
    Description=i3lock
    Before=sleep.target

    [Service]
    User=alice
    Type=forking
    Environment=DISPLAY=:0
    ExecStart=/home/alice/Code/shellscripts/i3lock.sh

    [Install]
    WantedBy=sleep.target

Then we just do:
    
    sudo systemctl enable i3lock.service
    sudo systemctl start i3lock.service

And we should be good! Now our screen will lock anytime we press the key
combo, leave the computer on for 10 minutes, or close the lid. Great!
