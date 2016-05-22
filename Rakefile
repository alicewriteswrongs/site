task :default => [:build_markdown]

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
  go_files.each do |go_file|
    sh "mark_set_go #{go_file} > matasano/#{cryptopals_go_filename go_file}"
  end
end

task :build_json do |t|
end

task :build_markdown => [:build_cryptopals_markdown, :build_json]

task :clean do |t|
  sh "rm -rf matasano"
end

