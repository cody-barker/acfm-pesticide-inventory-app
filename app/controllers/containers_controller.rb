class ContainersController < ApplicationController
  before_action :find_user_by_session_id
  before_action :set_container, only: [:show, :update, :destroy]

  def index
    containers = @user.containers
    render json: containers, include: :contents
  end

  def show
    render json: @container, include: :contents
  end

  def create
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
    team = @user.teams.find_by(id: container_params[:team_id])
    
    if team
      if @container.update(container_params)
        render json: @container, status: :ok
      else
        render json: { error: 'Failed to update container' }, status: :unprocessable_entity
      end
    else
      render json: { error: 'Team not found' }, status: :not_found
    end
  end




  def destroy
    # Check if the container belongs to the current user
    if @user.containers.include?(@container)
      @container.destroy
      head :no_content
    else
      render json: { error: 'Unauthorized to delete this container' }, status: :forbidden
    end
  end

  private

  def find_user_by_session_id
  @user = User.find_by(id: session[:user_id])
  if @user.nil?
    Rails.logger.debug "User not found with session_id: #{session[:user_id]}"
    head :unauthorized
  end
end


  def container_params
  params.require(:container).permit(:shelf, :row, :expires, :team_id, contents_attributes: [:id, :product_id, :concentration, :container_id, :_destroy])
end


  def set_container
    @container = @user.containers.find(params[:id])
  end
end
