task :build do
  cd 'rails' do
    Bundler.with_unbundled_env do
      sh %(sed -i '' -e 's/sdoc.*$/sdoc", github: "toshimaru\\/sdoc", branch: "railsdoc"/g' ./Gemfile)
      sh 'bundle install && bundle update sdoc'
      rm_rf 'doc'
      sh 'bundle exec rake rdoc'
    end
  end

  cp_r Dir.glob('rails/doc/rdoc/*'), 'src/'

  cd 'src' do
    cp 'files/railties/RDOC_MAIN_rdoc.html', 'index.html'
    mv 'navigation.html', '_includes/navigation.html', force: true
  end

  sh 'bundle exec jekyll build'
end

task :switch_rails do
  require 'yaml'

  config = YAML.load_file('./_config.yml')
  target_rails_version = config["target_rails_version"]

  cd 'rails' do
    sh "git switch v#{target_rails_version} -c v#{target_rails_version}"
  end
end
