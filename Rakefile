task :build do
  cd 'rails' do
    sh 'rake rdoc'
  end

  cp_r Dir.glob('rails/doc/rdoc/*'), 'src/'
  sh 'bundle exec jekyll build'
end
