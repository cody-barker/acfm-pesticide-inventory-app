class TeamSerializer < ActiveModel::Serializer
  has_many :containers, serializer: ContainerSerializer
  has_many :contents, through: :containers
  has_many :creation_logs
  attributes :id, :name, :containers, :creation_logs
end
