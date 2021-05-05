# frozen_string_literal: true

SOURCE_DIR = "src"
INDEX_HTML = 'files/railties/RDOC_MAIN_rdoc.html'

task :build do
  generate_rails_rdoc
  generate_src

  sh 'bundle exec jekyll build'
end

task :switch_rails do
  target_rails_version = config["target_rails_version"]
  switch_rails(target_rails_version)
end

task :build_multi do
  config["rails_versions"].each do |version, detail|
    dir = "#{SOURCE_DIR}/#{version}"
    mkdir dir unless Dir.exist?(dir)

    bulid_version = detail["specific_version"]
    switch_rails(bulid_version)
    generate_rails_rdoc
    generate_src(target_version: version)
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

def generate_src(target_version: nil)
  copy_sources = Dir.glob('rails/doc/rdoc/*').reject { |path| path.end_with?("panel", "js", "created.rid") }
  target_dir = "#{SOURCE_DIR}/#{target_version}"
  cp_r copy_sources, target_dir

  cd target_dir do
    cp INDEX_HTML, 'index.html'

    if target_version.nil?
      mv 'navigation.html', '_includes/navigation.html', force: true
    else
      mv 'navigation.html', "../_includes/navigation_#{target_version}.html", force: true
    end
  end
end
