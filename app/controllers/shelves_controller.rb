class ShelvesController < ApplicationController

  def index
    shelves = Shelf.all
    render json: shelves
  end

  def show
    render json: @shelf
  end

  def create
    shelf = Shelf.create!(shelf_params)
    render json: shelf, status: :created
  end

  def update
    @shelf.update(shelf_params)
    render json: @shelf, status: :accepted
  end

  def destroy
    @shelf.destroy
    render json: @shelf, status: :no_content
  end

  private

  def set_shelf
    @shelf = Shelf.find(params[:id])
  end

  def shelf_params
    params.permit(:number, rows: [])
  end
end