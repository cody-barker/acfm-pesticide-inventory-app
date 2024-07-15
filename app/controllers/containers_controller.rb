class ContainersController < ApplicationController
  before_action :set_container, only: [:show, :update, :destroy]
  before_action :find_user_by_session_id

  def index
    containers = Container.all
    render json: containers
  end

  def show
    render json: @container
  end

  def create
    container = @user.containers.create!(container_params)
    render json: container, status: :created
  end

   def update
    if @container.update(container_params)
      render json: @container, status: :ok
    else
      render json: { error: 'Failed to update container' }, status: :unprocessable_entity
    end
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
    params.require(:container).permit(:shelf, :row, contents_attributes: [:id, :product_id, :concentration, :_destroy])
  end

  def set_container
    @container = Container.find(params[:id])
  end
end
