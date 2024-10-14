class Container < ApplicationRecord
  belongs_to :team
  has_many :contents, dependent: :destroy
  has_many :products, through: :contents
  has_many :creation_logs
  accepts_nested_attributes_for :contents, allow_destroy: true
  validates :shelf, presence: true
  validates :row, presence: true
  validate :unique_products_per_container

   private

  # Custom validation method to ensure no duplicate products in contents
  def unique_products_per_container
    product_ids = contents.map(&:product_id)

    if product_ids.uniq.length != product_ids.length
      errors.add(:contents, "cannot contain duplicate products.")
    end
  end
end