class ContainerSerializer < ActiveModel::Serializer
  belongs_to :team
  has_many :contents
  has_many :products, through: :contents
  has_many :creation_logs
  attributes :id, :shelf, :row, :expires
end
