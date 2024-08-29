class ContainersController < ApplicationController
  before_action :set_container, only: [:show, :update, :destroy]
  before_action :find_user_by_session_id

  def index
    containers = @user.containers
    render json: containers, include: :contents
  end

  def show
    render json: @container, include: :contents
  end

  def create
    # Find the team associated with the current user
    team = @user.teams.find_by(id: container_params[:team_id])
    
    if team
      container = team.containers.new(container_params.except(:team_id))  # Create the container with the found team
      if container.save
        render json: container, status: :created
      else
        render json: { error: 'Failed to create container' }, status: :unprocessable_entity
      end
    else
      render json: { error: 'Team not found' }, status: :not_found
    end
  end

  def update
    if @container.update(container_params)
      render json: @container, status: :ok
    else
      render json: { error: 'Failed to update container' }, status: :unprocessable_entity
    end
  end

  def destroy
    @container.destroy
    head :no_content
  end

  private

  def find_user_by_session_id
    @user = User.find_by(id: session[:user_id])
    head :unauthorized unless @user
  end

  def container_params
    params.require(:container).permit(:shelf, :row, :expires, :team_id, contents_attributes: [:id, :product_id, :concentration, :container_id, :_destroy])
  end

  def set_container
    @container = @user.containers.find(params[:id])
  end
end
