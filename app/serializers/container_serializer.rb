class ContainerSerializer < ActiveModel::Serializer
  belongs_to :user
  attributes :id, :shelf, :row
end
