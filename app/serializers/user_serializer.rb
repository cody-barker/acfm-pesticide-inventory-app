class UserSerializer < ActiveModel::Serializer
  attributes :id, :username
  has_many :teams, serializer: TeamSerializer
  has_many :containers, through: :teams, serializer: ContainerSerializer
  has_many :creation_logs, through: :teams
end
