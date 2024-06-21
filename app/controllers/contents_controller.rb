class ContentsController < ApplicationController
  before_action :set_content, only: [:show, :update, :destroy]

  # GET /contents
  def index
    @contents = Content.all
    render json: @contents
  end

  def show
    render json: @content
  end

  def create
    container = Container.find(params[:container_id])
    content = container.contents.create!(content_params)
    render json: content, status: :created
  end

  def update
    container = Container.find(params[:container_id])
    content = container.contents.find(params[:id])
    content.update!(content_params)
    render json: content, status: :accepted
  end

  def destroy
    container = Container.find(params[:container_id])
    content = user.contents.find(params[:id])
    content.destroy
    render json: content, status: :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_content
      @content = Content.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def content_params
      params.permit(:container_id, :product_id, :concentration)
    end
end
