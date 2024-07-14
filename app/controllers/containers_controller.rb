class ContainersController < ApplicationController
  before_action :set_container, only: [:show, :edit, :update, :destroy]
  before_action :find_user_by_session_id

  def index
    containers = Container.all
    render json: containers
  end

  def show
    render json: @container
  end

  # def create
  #   container = @user.containers.create!(container_params)
  #   build_contents(container, params[:container][:contents_attributes])
  #   render json: container, status: :created
  # end
  def create
    container = @user.containers.create!(container_params)
    render json: container, status: :created
  end

  def update
   container = @user.containers.find(params[:id])
   container.update!(container_params)
   render json: container, status: :accepted
  end

  def destroy
    container = @user.containers.find(params[:id])
    container.destroy
    render json: container, status: :no_content
  end

  private

  def find_user_by_session_id
      @user = User.find_by(id: session[:user_id])
  end


  def container_params
    params.require(:container).permit(:user_id, :shelf, :row, contents_attributes: [:product_id, :concentration])
  end


  # def set_container
  #   @container = Container.find(params[:id])
  # end

  # def container_params
  #   params.permit(:user_id, :shelf, :row, contents_attributes: [:product_id, :concentration]).merge(user_id: :user_id)
  # end

  # def build_contents(container, contents_attributes)
  #   contents_attributes.each do |_, content_params|
  #     container.contents.build(content_params)
  #   end
  # end
end
