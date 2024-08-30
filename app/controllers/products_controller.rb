class ProductsController < ApplicationController
    # skip_before_action :authorize, only: [:index]

    def index
      render json: products
    end

    def create
      product = Product.create!(product_params)
      render json: product, status: :created
    end

    def update
      product = products.find(params[:id])
      product.update!(product_params)
      render json: product, status: :ok
    end

    def destroy
      product = products.find(params[:id])
      product.destroy
      render json: product, status: :no_content
    end

    private

    def products
      @products ||= Product.all
    end

    def product_params
      params.permit(
        :id,
        :name,
        :epa_reg
      )
    end
end
