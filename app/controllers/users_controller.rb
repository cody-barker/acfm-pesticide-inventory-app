class UsersController < ApplicationController
  # skip_before_action :authorize, only: [:create, :index]

  # GET /users
  def index
    render json: User.all
  end

  # GET /users/:id
  def show
    user = find_user
    if user
      render json: user
    else
      render json: { error: 'User not found' }, status: :not_found
    end
  end

  # POST /users
  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  private

  # Find user based on the provided ID
  def find_user
    User.find_by(id: params[:id])
  end

  # Only allow a list of trusted parameters through
  def user_params
    params.require(:user).permit(:username, :password)
  end
end
