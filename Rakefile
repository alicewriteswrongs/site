task :default => [:build_markdown]

directory "_matasano"

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

task :build_cryptopals_markdown => ["_matasano", :update_submodules] do |t|
  go_files = FileList['./cryptopals-go/*/*.go']
  go_files.each do |go_file|
    sh "mark_set_go #{go_file} > _matasano/#{cryptopals_go_filename go_file}"
  end
end
task :build_markdown => [:build_cryptopals_markdown]

task :clean do |t|
  sh "rm -rf _matasano"
end
