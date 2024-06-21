class Product < ApplicationRecord
  has_many :contents
  has_many :containers, through: :contents
  validates :name, presence: true, length: {minimum: 2}
  validates :name, uniqueness: true
end
