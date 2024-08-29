class Team < ApplicationRecord
  belongs_to :user
  has_many :containers
  has_many :creation_logs
  has_many :contents, through: :containers
end
