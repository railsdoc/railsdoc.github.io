task :build do
  cd 'rails' do
    sh %(sed -i '' -e 's/sdoc.*$/sdoc", github: "toshimaru\\/sdoc", branch: "railsdoc"/g' ./Gemfile)
    sh 'bundle install'
    rm_rf 'doc'
    sh 'bundle exec rake rdoc'
  end

  cp_r Dir.glob('rails/doc/rdoc/*'), 'src/'
  sh 'bundle exec jekyll build'
end
