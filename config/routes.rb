Rails.application.routes.draw do
  root to: 'posts#index'
  # get 'posts/new', to: 'posts#new' <-削除(「投稿完了しました」ページは使用しない為)
  post 'posts', to: 'posts#create'
  get 'posts/:id', to: 'posts#checked'
end