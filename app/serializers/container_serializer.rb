class ContainerSerializer < ActiveModel::Serializer
  belongs_to :user
  has_many :contents
  attributes :id, :shelf, :row, :expires, :contents
end
