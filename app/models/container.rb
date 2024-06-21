class Container < ApplicationRecord
  belongs_to :user
  has_many :contents
  has_many :products, through: :contents
  accepts_nested_attributes_for :contents
  validates :shelf, presence: true
  validates :row, presence: true
end
