class TeamSerializer < ActiveModel::Serializer
  has_many :containers
  has_many :creation_logs
  attributes :id, :name
end
