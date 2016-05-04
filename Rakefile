task :default => [:build_markdown]

directory "_matasano"

# git related things
task :update_cryptopals do |t|
  sh "cd cryptopals-go && git pull origin master "
end
task :update_submodules => [:update_cryptopals]

# build markdown files

def cryptopals_go_filename(go_file)
  go_file.split("/").last.gsub(/\.go$/, ".md")
end

task :build_cryptopals_markdown => ["_matasano", :update_submodules] do |t|
  go_files = FileList['./cryptopals-go/*/*.go']
  go_files.each do |go_file|
    ruby "script/go_to_markdown.rb #{go_file} > _matasano/#{cryptopals_go_filename go_file}"
  end
end
task :build_markdown => [:build_cryptopals_markdown]

task :clean do |t|
  sh "rm -rf _matasano"
end
