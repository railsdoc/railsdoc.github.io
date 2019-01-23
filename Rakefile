task :build do
  cd 'rails' do
    sh %(sed -i '' -e 's/sdoc.*$/sdoc", github: "toshimaru\\/sdoc", branch: "railsdoc"/g' ./Gemfile)
    sh 'bundle install && bundle update sdoc'
    rm_rf 'doc'
    sh 'bundle exec rake rdoc'
  end

  cp_r Dir.glob('rails/doc/rdoc/*'), 'src/'

  cd 'src' do
    cp 'files/railties/RDOC_MAIN_rdoc.html', 'index.html'
    mv 'navigation.html', '_includes/'
  end

  sh 'bundle exec jekyll build'
end
