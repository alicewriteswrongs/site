require 'json'
require 'pry'

task :default => [:build_markdown, :build_json]

directory "matasano"

# git related things
def git_pull(dir = Dir.pwd)
  Dir.chdir(dir) do
    status = %x{git pull}
    puts status unless status =~ /Already up-to-date\./
  end
end

task :update_cryptopals do |t|
  git_pull("cryptopals-go")
end
task :update_submodules => [:update_cryptopals]

# build markdown files
def cryptopals_go_filename(go_file)
  go_file.split("/").last.gsub(/\.go$/, ".md")
end

task :build_cryptopals_markdown => ["matasano", :update_submodules] do |t|
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
task :build_json => [:build_matasano_json]

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

# build the website for production
task :publish => [:clean, :dist_clean, :build_markdown, :build_json, :build_routes]

def getJSON(path)
  JSON.parse(File.read(path))
end

task :build_matasano_routes do |t|
  matasano_json = getJSON('./src/data/matasano.json')
end

task :build_routes => [:build_matasano_routes]




