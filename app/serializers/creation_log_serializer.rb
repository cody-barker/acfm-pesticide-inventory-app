class CreationLogSerializer < ActiveModel::Serializer
  belongs_to :team
  belongs_to :container
  attributes :id
end
