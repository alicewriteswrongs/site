require 'json'

task :default => [:build_markdown, :build_json]

directory "matasano"

# build markdown files
def cryptopals_go_filename(go_file)
  go_file.split("/").last.gsub(/\.go$/, ".md")
end

task :build_cryptopals_markdown => ["matasano"] do |t|
  go_files = FileList['./cryptopals-go/*/*.go']
  go_files.exclude { |file| file.match(/_test.go$/) }

  go_files.each do |go_file|
    sh "mark_set_go #{go_file} > matasano/#{cryptopals_go_filename go_file}"
  end
end
task :build_markdown => [:build_cryptopals_markdown]

# build JSON
task :build_matasano_json do |t|
  sh "node ./build/markdown_to_json.js ./matasano ./src/data/matasano.json"
end

task :build_blog_json do
  sh "node ./build/markdown_to_json.js ./blog ./src/data/blog.json"
end

task :build_pages_json do
  sh "node ./build/markdown_to_json.js ./src/pages ./src/data/pages.json"
end

task :build_json => [:build_matasano_json, :build_blog_json, :build_pages_json]

task :clean do |t|
  sh "rm -rf matasano"
  sh "rm -rf src/data/matasano.json"
end

task :dist_clean do |t|
  dist_files = FileList['./dist/*'].exclude { |f| f.match(/.gitkeep/) }
  dist_files.each do |dist_file|
    sh "rm -rf #{dist_file}"
  end
end
