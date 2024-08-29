class Container < ApplicationRecord
  belongs_to :team
  # belongs_to :user
  has_many :contents, dependent: :destroy
  has_many :products, through: :contents
  has_many :creation_logs
  accepts_nested_attributes_for :contents, allow_destroy: true
  validates :shelf, presence: true
  validates :row, presence: true
  belongs_to :team, optional: true

end
