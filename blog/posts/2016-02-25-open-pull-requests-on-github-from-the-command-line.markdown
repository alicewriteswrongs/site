---
layout: post
title: Open pull requests on Github from the command line
date: 2016-02-25T17:00:39-05:00
---

I just got a nifty little bit of shell magic working that I wanted to
share! Basically it's a set of shell functions that give you a command
(`ghpull`) which will open the pull request for your current git branch in
your browser. Nifty, right? No more switch to Chrome -> ctrl-l ->
https://github.com/pulls -> click on pr for us!

First we need to add pull requests (which are actually just remote
branches that Github automatically creates) to our remotes. I have an
alias that lets me quickly add them to any repo:

    {% highlight bash %}
    alias get_pulls='git config --add remote.origin.fetch "+refs/pull/*/head:refs/remotes/origin/pull/*"'
    {% endhighlight %}

Then if you do `git fetch origin` you'll get the pull request branches
too. Great!

So now we need to figure out which of the remote PR branches correspond to
our current feature branch. First we'll write a little function to find
the most recent non-fixup commit on our current branch:

    {% highlight bash %}
    function origin_exists () {
        [[ -d .git/refs/remotes/origin ]]
    }

    function current_branch  () {
        git rev-parse --abbrev-ref HEAD
    }

    function last_non_fixup_commit_on_branch () {
        if [[ $(current_branch) != 'master' ]]; then
            if [[ origin_exists ]]; then
                git log $(current_branch) --not origin/master --format=oneline | ag -v fixup! | head -n 1 | sed -e 's/\s.*$//'
            else
                git log $(current_branch) --not master --format=oneline | ag -v fixup! | head -n 1 | sed -e 's/\s.*$//'
            fi
        else
            git log --format=%H | head -n 1
        fi
    }
    {% endhighlight %}

Whew! That's kind of a lot, but it's really not that bad. First we check
to make sure we're not on master, then if we have a remote repo called
`origin` we use `git log` to find commits on our current branch which
aren't found on `origin/master`. We format the commit info on one line,
and use `ag` (`grep` would be fine too!) to exclude lines with `fixup!` in
the commit message. Then we get the top commit, and use `sed` to slice out
the SHA1 hash. Nice! Then when we run this function we'll get a full 40
character hash, which we can use to do whatever we want.

In this case, we can use this to find which branches have this commit in
them. This looks like:

    {% highlight bash %}
    function pull_request_number() {
        git branch --remotes --contains $(last_non_fixup_commit_on_branch) | ag pull | sed -e 's/^.*\///'
    }
    {% endhighlight %}

We pass the `--remotes` flag to consider remote branches (which we've
never checked out locally) and then we just get the list of all such
branches which contain our commit (by doing `--contains`). Nifty! This
will give us something that looks like this:

    {% highlight bash %}
    origin/my-feature-branch # the actual feature branch
    origin/pull/324          # the branch for the pull request
    {% endhighlight %}

Great! We're getting close now. We just need to pull out the number (324)
from that output. So we pipe the list of branches into `ag` (to get only
branches with `pull` in them) and then use `sed` again to pull out just
the number. Awesome! Sometimes unix is fun.

Anyway, now we just need to use that number to construct the url for the
pull request on Github correctly. First a helper function:

    {% highlight bash %}
    function github_repo_location () {
        git remote -v | ag origin | head -n 1 | sed -e 's/^.*://' | sed -e 's/\..*//'
    }
    {% endhighlight %}

This uses the `-v` flag to get a verbose list of our remote repos, which
will look something like this:

![git remotes](/images/verbose_git_remote.png)

Nice, so now we just need to slice off the first and last parts of those
lines. We grab the first one with `origin` in it and again use `sed` twice
to slice off the parts we won't use in the URL.

Then we can finally write this:

    {% highlight bash %}
    function ghpull () {
        git fetch origin
        xdg-open "https://github.com/`github_repo_location`/pull/`pull_request_number`"
    }
    {% endhighlight %}

Wow so cool! Now when you're on a feature branch you can just mash
`ghpull` to open the pull request for it on your remote repo!
Unfortunately this does get a little slow on big repos (the step where we
find branches containing our commit of interest gets slow). If you're on
a Mac you should be able to just replace `xdg-open` with `open`.

Disclaimer: I'm bad at shell stuff, it's not my fault if you blow
something up.
