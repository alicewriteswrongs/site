---
title: 'TIL: pointers and stuff (RC day 14?)'
date: 2015-06-12T14:57:31-04:00
layout: post
---

I may be counting the days wrong? Ehh not that important I guess.

Today I read a section in K&R (the C programming language) that was quite
illuminating! Some of the content presented in this book is so *nice*,
they just give you these gorgeous super minimal functions for doing common
things. In chapter 5, section 5.7 we get this lovely pair of functions for
converting the day of the year to month/day, and vice versa:

{% highlight c %}
#include <stdio.h>

static char daytab[2][13] = {
{0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31},
    {0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31}
};

int day_of_year(int year, int month, int day)
{
    int i, leap;
    leap = year%4 == 0 && year%100 != 0 || year%400 == 0;

    for (i = 0; i < month; i++)
        day += daytab[leap][i];
    return day;
}

void month_day(int year, int yearday, int *pmonth, int *pday)
{
    int i, leap;

    leap = year%4 == 0 && year%100 != 0 || year%400 == 0;
    for (i = 1; yearday > daytab[leap][i]; i++)
        yearday -= daytab[leap][i];
    *pmonth = i;
    *pday = yearday;
}
{% endhighlight %}

I love relying on a boolean expression to get an array index! Nice and
elegant. Anyway, in trying to get this to work I learned something useful.
I originally had this as `main`:

{% highlight c %}
void main()
{
    printf("March 14th is day %d!\n", day_of_year(2015, 3, 14));
    int *pmonth, *pday;
    month_day(2010, 246, pmonth, pday);
    printf("The 246th day of 2012 is %d/%d/12!\n", *pmonth, *pday);
}
{% endhighlight %}

This segfaults, and I wasn't super clear on why that happened initially
- I've created two pointers of type `int *myptr`, and the passed them into
the function `month_day`. That seems good, then I should be able to just
assign the two values I'm after to the dereferenced pointer (we need to do
this to get around C restriction to returning one value). 

Why doesn't it work? Because the pointers aren't pointing at anything! All
I've done is declared the two pointers, but I haven't declared anything
for them to point to! I'm not sure if they are initialized as empty, or if
they just point to garbage, but either way there isn't something declared
yet that I can clearly dereference to in order to get the output from my
`month_day` function. We can fix this by changing `main` around:

{% highlight c %}
void main()
{
    printf("March 14th is day %d!\n", day_of_year(2015, 3, 14));
    int month, day;
    int *pmonth = &month;
    int *pday = &day;
    month_day(2010, 246, pmonth, pday);
    printf("The 246th day of 2012 is %d/%d/12!\n", *pmonth, *pday);
}
{% endhighlight %}

It works! Nice! Remember to make your pointers point at things! Otherwise
you're just tossing your results off a cliff! Or something?
