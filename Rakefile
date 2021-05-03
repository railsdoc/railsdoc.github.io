# frozen_string_literal: true

SOURCE_DIR = "src"

task :build do
  generate_rails_rdoc
  generate_src

  sh 'bundle exec jekyll build'
end

task :switch_rails do
  target_rails_version = config["target_rails_version"]
  switch_rails(target_rails_version)
end

task :mkdir do
  config["collections"].each do |version, detail|
    dir = "#{SOURCE_DIR}/#{version}"
    mkdir dir unless Dir.exist?(dir)
    switch_rails(detail["specific_version"])
  end
end

def config
  require 'yaml'
  YAML.load_file('./_config.yml')
end

def switch_rails(version)
  cd 'rails' do
    sh "git reset --hard"
    sh "git switch refs/tags/v#{version} -C v#{version}"
  end
end

def generate_rails_rdoc
  cd 'rails' do
    Bundler.with_unbundled_env do
      sh %(sed -i '' -e 's/sdoc.*$/sdoc", github: "toshimaru\\/sdoc", branch: "railsdoc"/g' ./Gemfile)
      sh 'bundle install && bundle update sdoc'
      rm_rf 'doc'
      sh 'bundle exec rake rdoc'
    end
  end
end

def generate_src(target_version: '')
  copy_sources = Dir.glob('rails/doc/rdoc/*').reject { |path| path.end_with?("panel", "js", "created.rid") }
  target_dir = "#{SOURCE_DIR}/#{target_version}"
  cp_r copy_sources, target_dir

  cd target_dir do
    cp 'files/railties/RDOC_MAIN_rdoc.html', 'index.html'
    mv 'navigation.html', '_includes/navigation.html', force: true
  end
end
