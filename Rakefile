task :build do
  cd 'rails' do
    Bundler.with_unbundled_env do
      sh %(sed -i '' -e 's/sdoc.*$/sdoc", github: "toshimaru\\/sdoc", branch: "railsdoc"/g' ./Gemfile)
      sh 'bundle install && bundle update sdoc'
      rm_rf 'doc'
      sh 'bundle exec rake rdoc'
    end
  end

  copy_sources = Dir.glob('rails/doc/rdoc/*').reject { |path| path.end_with?("panel", "js", "created.rid") }
  cp_r copy_sources, 'src/'

  cd 'src' do
    cp 'files/railties/RDOC_MAIN_rdoc.html', 'index.html'
    mv 'navigation.html', '_includes/navigation.html', force: true
  end

  sh 'bundle exec jekyll build'
end

task :switch_rails do
  target_rails_version = config["target_rails_version"]
  switch_rails(target_rails_version)
end

task :mkdir do
  config["collections"].each do |version|
    mkdir version.to_s
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
