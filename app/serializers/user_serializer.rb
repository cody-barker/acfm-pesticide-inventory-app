class UserSerializer < ActiveModel::Serializer
  has_many :teams
  has_many :containers, through: :teams
  has_many :creation_logs, through: :teams

  attributes :id, :username
  
end
