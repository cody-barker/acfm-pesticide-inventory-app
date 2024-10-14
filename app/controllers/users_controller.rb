class UsersController < ApplicationController
    # skip_before_action :authorize, only: [:create]

    def index
        render json: User.all
    end

    def show
        user = User.find_by(id: session[:user_id])
        render json: user, status: :ok
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    private

    def find_user
        User.find(params[:id])
    end

    def user_params
        params.permit(
            :username, 
            :password
        )
    end
end
