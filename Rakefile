# frozen_string_literal: true

require 'yaml'
require 'bundler'

SOURCE_DIR = 'src'
INDEX_HTML = 'files/railties/RDOC_MAIN_rdoc.html'
NEW_INDEX_HTML = 'files/railties/RDOC_MAIN_md.html'

desc 'Generate documentation for default Rails version and build Jekyll site'
task build: :switch_default_rails do
  generate_rails_rdoc
  generate_src(target_version: default_rails_version)
  sh 'bundle exec jekyll build'
end

desc 'Switch to default Rails version'
task :switch_default_rails do
  switch_rails(default_rails_version)
end

desc 'Generate adn build documentation for older versions of Rails'
task :build_multi do
  # WORKAROUND: use `reverse_each` instead of `each` to avoid nokogiri installation error
  config['rails_versions'].reverse_each do |version, detail|
    if detail['latest']
      puts "=== Skip Rails v#{version} because it's latest version ==="
      next
    else
      puts "=== Build Rails v#{version} documentation ==="
    end

    dir = "#{SOURCE_DIR}/#{version}"
    mkdir dir unless Dir.exist?(dir)

    bulid_version = detail['specific_version']
    switch_rails(bulid_version)
    generate_rails_rdoc
    generate_src(target_version: version)
  end
  puts
  sh 'bundle exec jekyll build'
end

def config
  @config ||= YAML.load_file('./_config.yml')
end

def default_rails_version
  config['default_rails_version']
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
      ENV['BUNDLE_WITHOUT'] = %w[db view job storage cable ujs test rubocop lint mdl].join(':')

      # Replace sdoc gem with my forked one
      gemfile = File.read('Gemfile')
      gemfile.gsub!(/"sdoc".*$/, '"sdoc", github: "toshimaru/sdoc", branch: "railsdoc"')
      File.write('Gemfile', gemfile)

      sh 'bundle install && bundle update sdoc'
      rm_rf 'doc'
      sh 'bundle exec rake rdoc'
    end
  end
end

def generate_src(target_version:)
  copy_sources = Dir.glob('rails/doc/rdoc/*').reject { |path| path.end_with?('panel', 'js', 'created.rid') }
  target_dir = target_version == default_rails_version ? SOURCE_DIR : "#{SOURCE_DIR}/#{target_version}"
  cp_r copy_sources, target_dir

  cd target_dir do
    if Gem::Version.new(target_version) >= Gem::Version.new('7.1')
      cp NEW_INDEX_HTML, 'index.html'
      return
    end

    cp INDEX_HTML, 'index.html'
    # Prepend version number to the absolute path in navigation.html
    content = File.read('navigation.html')
    content.gsub!('<a href="/', "<a href=\"/#{target_version}/")
    File.write('navigation.html', content)
  end
end
