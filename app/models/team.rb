class Team < ApplicationRecord
  has_many :containers
  has_many :creation_logs
end
