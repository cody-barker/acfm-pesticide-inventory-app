class Content < ApplicationRecord
  belongs_to :container
  belongs_to :product
  validates :concentration, presence: true, numericality: { greater_than: 0, less_than_or_equal_to: 100, message: "must be > 0 and <= 100" }
end
