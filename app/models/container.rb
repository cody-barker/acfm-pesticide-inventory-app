class Container < ApplicationRecord
  belongs_to :user
  has_many :contents, dependent: :destroy
  has_many :products, through: :contents
  accepts_nested_attributes_for :contents, allow_destroy: true
  validates :shelf, presence: true
  validates :row, presence: true
end
