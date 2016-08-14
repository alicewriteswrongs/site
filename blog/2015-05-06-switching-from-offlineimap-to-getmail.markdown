---
layout: post
title: "Switching from Offlineimap to Getmail"
date: 2015-05-06T10:36:31-04:00
tags:
    - offlineimap
    - email
    - getmail
    - sup
---

So I've been happily using Offlineimap to get local copies (in Maildirs) of all
my email for a while. Somehow I managed to miss the fact that offlineimap is
actually a *synchronization* program, so if, for instance, your email provider
accidentally loses a quarter of your emails, offlineimap will happily delete
them from your maildir. In my mind this defeats the purpose of having a local
copy of mail at all, but I digress.

As soon as I realized (belatedly) upon deleting some mail from my
[Riseup](www.riseup.net) account to free up space that emails were
disappearing  from my Sup index (nothing too important, thankfully)
I decided to kick offlineimap to the curb and seek a suitable replacement.

##Enter Getmail

[Getmail](http://pyropus.ca/software/getmail/) was written as
a replacement for the aged Fetchmail program. It's got the capability to
download mail using a bunch of different protocols, but I'm going to be
using plain ol' much maligned POP3. Here's how to set up Getmail to fetch
emails from a Gmail account.

##Initial Configuration

First do:

    {% highlight bash %}
    mkdir ~/.getmail
    {% endhighlight %}

Which is where we'll store configuration files for each inbox. These look
like this (for a Gmail account, other providers will be slightly
different):

    [retriever]
    type = SimplePOP3SSLRetriever
    server = pop.gmail.com
    username = username@gmail.com
    port = 995
    password = mypassword111

    [destination]
    type = Maildir
    path = ~/mail/gmail

    [options]
    read_all = False

I called each config file something like `alice_gmail`, something
descriptive that will be clear later. This will tell Getmail to import all
mail that is downloaded into
a [Maildir](https://en.wikipedia.org/wiki/Maildir), which is a pretty
common format for storing emails (Sup, for instance, can just be pointed
at a maildir). I have the maildirs for all my accounts (there are four of
them, don't ask me why) in `~/mail`, with subdirectories for each account.

Note: if you're only downloading one mail account (lucky you!) you can
name your config file `getmailrc`, and your subsequent configuration can
ignore what I've written about facilitating multiple accounts (getmail
will automatically read it's options from any file in `.getmail` named
`getmailrc`).

`read_all = False` makes email downloading faster, by allowing Getmail to
remember which mails it has already downloaded (it writes a file to
~/.getmail for each account).

##Multiple Accounts craziness

OK so while getmail *does* support multiple accounts it's not the most
intuitive thing. As I said above, we need to write a configuration file
for each mail account we want to download from, and we then need to call
getmail with all of these config files as arguments. What I did to make
this easier was write a little shell script, `mygetmail.sh`:

    getmail --rcfile alice_gmail --rcfile other_gmail --rcfile
    hampshire_mail --rcfile riseup_mail

Where each argument to `--rcfile` is a configuration file written
following the example above. Nice! Then I just wrote a symbolic link:

    chmod +x mygetmail.sh
    ln -s ~/path/to/mygetmail.sh /usr/bin/mygetmail

Sweet! Then we can execute that to download mail from all the accounts
we're working with. If these aren't new accounts and you're downloading 50k
or so emails this may take a while, so let it run (check that it's saving
them in the right place!) and go make a cup of coffee or tea.

##Cron!

So we've downloaded all of our email and we're up-to-date. Good stuff, but
how do we keep it up? Now that we've written our handy `mygetmail.sh` we
can set up a Cron job that will run that every so often (well, as often as
we'd like). 

On Arch Linux you'll need to install a package to get Cron, I'm using
[Cronie](https://www.archlinux.org/packages/core/x86_64/cronie/) with no
issues.

If you've got it installed just do

    crontab -e

and your `$EDITOR` will open the file you need to edit. If you just
installed Cron there's probably nothing in there. Lets add the following
line: 

    */2 * * * * /usr/bin/mygetmail

Great! This specifies that the job will run every two minutes. If you
don't care about getting mail that often you can change it to run every
10, or whatever you'd like.

One last thing: although we've added the Cron job, it doesn't mean that
Cron is running yet. For Cronie you need to enable a systemd service:

    sudo systemctl enable cronie.service
    sudo systemctl start cronie.service

And that should be it! Now that you've got all that email saved in lovely
straightforward Maildirs consider pointing [Sup](www.supmua.org) at it!
