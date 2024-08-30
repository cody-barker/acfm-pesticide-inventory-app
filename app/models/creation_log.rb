class CreationLog < ApplicationRecord
  belongs_to :team
  belongs_to :container

  validates :created_at, presence: true
end
