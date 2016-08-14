---
title: 'Reinstalling Arch: Or, oh god, again, why?'
date: 2015-06-24T21:37:46-04:00
layout: post
---

So on Monday I got a new computer, which is great! But new computer means
it's time to reinstall Arch. Which is not great. I think that
on a properly set-up Arch system you don't need to do too much more
system config work than other distros, but the initial install can be
a really big pain.

The computer I bought (a Lenovo Yoga 2 Pro) turned out to be a fairly
non-cooperative partner in this process! The first issue I encountered woke me
up in the middle of the night on Monday. I had left my old laptop and the
new laptop on in my room, and files were transferring to the new computer
over scp. At roughly 3:30AM the new computer started making this horrible
crackling/chirping noise, which woke me up. I spent a lot of time
yesterday sorting this out - it turns out it's due to some bug in the
intel audio driver, and it's specifically something relating to the two
sound devices on the machine (sound over HDMI and the standard soundcard). 
If I blacklist all the kernel modules
relating to HDMI sound, no horrible noise! Success!

Having solved that I just had to deal with the HiDPI screen. Since I spend
most of my time in the terminal I just cranked up the font size for
`urxvt` to 16, which is nice and readable. For `chromium` we can do

    chromium --force-device-scale-factor=1.5

to activate the HiDPI scaling support which was added fairly recently.
I like 1.5, which makes the UI elements small but the page text is still
nice and readable. I couldn't figure out how to make this setting
permanent within `chromium`, so I wrote a shellscript called
`legible_chromium` that executes the above command.

This computer also does the flippy thing! It has a hinge that allows the
screen to flip around so that it becomes a tablet, of sorts. The 16:9
aspect ratio makes it a little strange in portrait mode (so narrow) but
it's kind of nice to read an article with the keyboard tucked away.
I wrote two little shellscripts to make this work. The first is
`tablet_mode`:

{% highlight bash %}
#!/bin/sh

xrandr --output eDP1 --rotate left
synclient TouchpadOff=$(synclient -l | grep -c 'TouchpadOff.*=.*0')
{% endhighlight %}

This rotates the screen to one of the possible portrait layouts, and the
second line toggles the touchpad off. A quirk of the Yoga design is that
the keyboard is turned off by the screen being flipped back (somewhere
close to all the way around) but the hardware doesn't do anything about
the touchpad, so we need to take care of that ourselves. This actually
just toggles the touchpad state, so if you already have it off it might
get out of sync - I have another shellscript which just runs that command
in that case.

The second script is really similar! Here's `laptop_mode`:

{% highlight bash %}
#!/bin/sh

xrandr --output eDP1 --rotate normal
synclient TouchpadOff=$(synclient -l | grep -c 'TouchpadOff.*=.*0') 
{% endhighlight %}

In order for this to work properly you also need to have the
[xrandr-align](https://github.com/wolneykien/xrandr-align) program
running, so that the touchscreen input is rotated along with the display.
I haven't tried many programs, but `chromium` works great with the
touchscreen as long as the `usbtouchscreen` module is loaded (you need to
restart `chromium` in order for loading the module to take effect). This
lets you drag a finger to scroll. I'm not sure how useful the convertible
aspect of the machine will be, but it wasn't too bad to set it up. 

Anyway, the computer is mostly set up now! Hooray, time to actually write
some code!
