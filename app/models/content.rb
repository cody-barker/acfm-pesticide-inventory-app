class Content < ApplicationRecord
  belongs_to :container
  belongs_to :product
  validates :concentration, presence: true
end
