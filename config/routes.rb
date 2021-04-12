Rails.application.routes.draw do
  root to: 'posts#index' # <- 編集
  # get 'posts/new', to: 'posts#new' <-削除(「投稿完了しました」ページは使用しない為)
  post 'posts', to: 'posts#create'
  get 'posts', to: '#posts#checked' #既読機能のエンドポイントをqueryパラメータを使用して記述
end