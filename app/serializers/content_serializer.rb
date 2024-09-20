class ContentSerializer < ActiveModel::Serializer
  belongs_to :container
  belongs_to :team

  attributes :id, :container_id, :product_id, :concentration

end
