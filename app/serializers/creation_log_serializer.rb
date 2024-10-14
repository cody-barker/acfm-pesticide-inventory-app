class CreationLogSerializer < ActiveModel::Serializer
  belongs_to :team
  belongs_to :container

  attributes :id, :created_at

  # Simplify team serialization by limiting the data returned
  class TeamSerializer < ActiveModel::Serializer
    attributes :id, :name
  end

  class ContainerSerializer < ActiveModel::Serializer
    attributes :id, :shelf, :row, :expires
  end
end
