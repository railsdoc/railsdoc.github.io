# frozen_string_literal: true

require 'yaml'
require 'bundler'

SOURCE_DIR = 'src'
INDEX_HTML = 'files/railties/RDOC_MAIN_rdoc.html'

desc 'Build railsdoc'
task :build do
  generate_rails_rdoc
  generate_src

  sh 'bundle exec jekyll build'
end

desc 'Switch to default Rails version'
task :switch_default_rails do
  switch_rails(config['default_rails_version'])
end

desc "Build another version's railsdoc"
task :build_multi do
  config['rails_versions'].each do |version, detail|
    dir = "#{SOURCE_DIR}/#{version}"
    mkdir dir unless Dir.exist?(dir)

    bulid_version = detail['specific_version']
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
    sh 'git reset --hard'
    sh "git switch refs/tags/v#{version} -C v#{version}"
  end
end

def generate_rails_rdoc
  cd 'rails' do
    Bundler.with_unbundled_env do
      # TODO: use `BUNDLE_ONLY`(require bundler 2.3.19+).
      ENV['BUNDLE_WITHOUT'] = 'db:job:storage'

      # replace sdoc gem
      gemfile = File.read('Gemfile')
      gemfile.gsub!(/"sdoc.*$/, '"sdoc", github: "toshimaru/sdoc", branch: "railsdoc"')
      File.write('Gemfile', gemfile)

      sh 'bundle install && bundle update sdoc'
      rm_rf 'doc'
      sh 'bundle exec rake rdoc'
    end
  end
end

def generate_src(target_version: nil)
  copy_sources = Dir.glob('rails/doc/rdoc/*').reject { |path| path.end_with?('panel', 'js', 'created.rid') }
  target_dir = "#{SOURCE_DIR}/#{target_version}"
  cp_r copy_sources, target_dir

  cd target_dir do
    cp INDEX_HTML, 'index.html'

    return if target_version.nil?

    # Replace absolute path in navigation.html
    content = File.read('navigation.html')
    content.gsub!('<a href=\"/', "<a href=\"/#{target_version}/")
    File.write('navigation.html', content)
  end
end
