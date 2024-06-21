class Container < ApplicationRecord
  belongs_to :user
  validates :shelf, presence: true
  validates :row, presence: true
end
