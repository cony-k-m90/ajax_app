class PostsController < ApplicationController

  def index
    @posts = Post.all.order(id: "DESC")
  end

# 削除 newアクション不要のため

  def create
    Post.create(content: params[:content])
    redirect_to action: :index
  end
end