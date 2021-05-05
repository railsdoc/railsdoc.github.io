# frozen_string_literal: true

require 'yaml'
require 'bundler'

SOURCE_DIR = "src"
INDEX_HTML = 'files/railties/RDOC_MAIN_rdoc.html'

task build: [:switch_default_rails] do
  generate_rails_rdoc
  generate_src

  sh 'bundle exec jekyll build'
end

task :switch_default_rails do
  switch_rails(config["default_rails_version"])
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
      # replace sdoc gem
      gemfile = File.read("Gemfile")
      gemfile.gsub!(/"sdoc.*$/, '"sdoc", github: "toshimaru/sdoc", branch: "railsdoc"')
      File.write("Gemfile", gemfile)

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
      # Replace absolute path in navigation.html
      content = File.read("navigation.html")
      content.gsub!("<a href=\"/", "<a href=\"/#{target_version}/")
      File.write("navigation.html", content)

      mv 'navigation.html', "../_includes/navigation#{target_version}.html", force: true
    end
  end
end
