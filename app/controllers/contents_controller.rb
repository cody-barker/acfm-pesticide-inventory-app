class ContentsController < ApplicationController
  before_action :set_content, only: [:show, :update, :destroy]
  before_action :set_container, only: [:create, :update, :destroy]

  # GET /contents
  def index
    @contents = Content.all
    render json: @contents
  end

  # GET /contents/:id
  def show
    render json: @content
  end

  # POST /containers/:container_id/contents
  def create
    content = @container.contents.create!(content_params)
    render json: content, status: :created
  end

  # PATCH/PUT /containers/:container_id/contents/:id
  def update
    if @content.update(content_params)
      render json: @content, status: :ok
    else
      render json: { error: 'Failed to update content' }, status: :unprocessable_entity
    end
  end

  # DELETE /containers/:container_id/contents/:id
  def destroy
    @content.destroy
    head :no_content
  end

  private

  # Set the content based on the provided ID
  def set_content
    @content = Content.find(params[:id])
  end

  # Set the container based on the provided container ID
  def set_container
    @container = Container.find(params[:container_id])
  end

  # Only allow a list of trusted parameters through
  def content_params
    params.require(:content).permit(:product_id, :concentration)
  end
end
