#Literate Crypto

This is a web project I started to document my progress in learning Go by
doing the Matasano crypto problemset. Really, this is just a way to
combine my three great areas of CS enthusiasm: literate programming,
cryptography, and overengineered tooling.

There's a Rakefile to automate building markdown files from the Go source
(you need to already have
[mark_set_go](https://github.com/aliceriot/mark_set_go) installed). It
also pulls the most recent commits on the submodule, and then takes the
formatted Markdown, renders it to HTMl, and then saves it all to JSON (for
easy use in JS).
