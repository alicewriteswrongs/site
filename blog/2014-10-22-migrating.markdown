---
layout: post
title: "Migrating Arch Linux install to an SSD"
date: 2014-10-22T13:44:56-04:00
tags:
    - archlinux
    - linux
---

Today I got a new 60GB mSATA ssd in the mail and set about migrating
my root partition from the HDD on which it resided to the new shiny
SSD. This turned out to be a little more complicated than I thought it
should be!

First off, my initial partition layout looked like this, on a 320GB HDD:

    /dev/sda1: /, 30G
    /dev/sda2: swap, 8G
    /dev/sda3: /home, 260G

We'll be adding a new device, sdb, and what we want, ultimately, is:

    /dev/sdb1: /, 30G
    /dev/sdb2: /home/user/fast_home, 28G
    /dev/sda1: swap, 8G
    /dev/sda2: /home. 290G

Right! So the first thing we want to do is create a new partition table and
a partition on sdb. I'm using GUID for my partition table, and I'll be sticking
with a basic ext4 filesystem. We can do this with either something like gparted
or with a console tool like gdisk, but the result will be the same either way.

Once we have a partition on `/dev/sdb1` formatted to `ext4` we want to use GParted
to make sure the the `legacy_boot` flag is set for the partition. That's all we'll 
need to do for partitioning! Now on to copying files.

We can use dd to copy over everything in the root directory (except for stuff we
don't want) pretty easily. With the `/dev/sdb1` partition unmounted we do:

    sudo dd if=/dev/sda1 of=/dev/sdb1

This will take a good bit of time, depending on how much stuff you have. I had around
15G in / and it took about 5 minutes.

When it's done, we need to do a couple of things to make `/dev/sdb1` into a bonafide,
bootable partition. We'll start by editing `/etc/fstab`, which tells Arch which 
partitions to mount where. Start by mounting the partition:

    sudo mount /dev/sdb1 /mnt

(create /mnt if you don't have it already) and then open `fstab` in your favorite text
editor:

    sudo vim /mnt/etc/fstab

We can find the UUIDs of all partitions on our system
by running:

    lsblk -o NAME,UUID

you should get something like 

    NAME   UUID
    sda    
    ├─sda1 15027501-e241-4b6c-b04d-02f27e3ee55e
    ├─sda2 c5fcc964-af01-41e3-a9ef-489f8e4e2829
    └─sda3 c96a3307-3a8b-4f1f-a52a-baeda4cf27c0
    sdb    
    └─sdb1 15027501-e241-4b6c-b04d-02f27e3ee55e
    sr0    

wait, `/dev/sda1` and `/dev/sdb1` share the same UUID! ehhhh? This gets copied over when
we use `dd` to clone `/dev/sda1`. Never fear though, we can run:

    sudo tune2fs -U random /dev/sdb1

Which we'll give us a new UUID for `/dev/sdb1`.
Now we'll change the first line of `/etc/fstab`, which should 
be currently for `/dev/sda1`, to point
to `/dev/sdb1` instead, by just changing out the UUID. Make sure that the `<type>`
option matches the filesystem you used, and that you add the `discard` option to
activate TRIM (for SSD health and speed!). Once we've done all that we can `:wq` and
move on to editing our bootloader!

I use syslinux on my machine, so I'm not sure what to do here if you use GRUB or something
else. For syslinux we need to do a couple things. First we:

    sudo vim /mnt/boot/syslinux/syslinux.cfg

and we search for `LABEL arch`. After `APPEND` you should see:
    
    root=/dev/sda1

which we just change to `/dev/sdb1`. Next we need to install syslinux to the MBR of 
`/dev/sdb`. First off, lets check that we set the bootable flag by running:

    sudo sgdisk /dev/sdb --attributes=1:show

you should see something saying `legacy BIOS bootable`. If we're all good here we can
run:

    sudo dd bs=440 conv=notrunc count=1 if=/usr/lib/syslinux/bios/gptmbr.bin of=/dev/sdb

To copy the syslinux MBR to `/dev/sdb`. Nice! The system should now be bootable from the
SSD, and you should totes go test it now!

Alright, so if that all worked, then all you have left is to enjoy the speed of your new rig!
Well, I mean, you should probably delete your old / and swap, make a new swap at the beginning
of `/dev/sda`, and increase the size of your home partition, but I leave that to you.
