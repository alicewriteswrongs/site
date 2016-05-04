#Literate Crypto

This is a web project I started to document my progress in learning Go by
doing the Matasano crypto problemset. Really, this is just a way to
combine my three great areas of CS enthusiasm: literate programming,
cryptography, and overengineered tooling.

There's a Ruby script (`script/go_to_markdown.rb`) to convert a Go
source file to Markdown (comments become markdown source, source code
becomes code blocks) and a Rakefile to automate building markdown files
from the Go source (you need to already have
[mark_set_go](https://github.com/aliceriot/mark_set_go) installed).
