class Shelf < ApplicationRecord
  # has_many :containers
  # has_many :users, through: :containers
  # has_many :contents, through: :containers
  validates :number, presence: true
  validates :number, uniqueness: true
end
