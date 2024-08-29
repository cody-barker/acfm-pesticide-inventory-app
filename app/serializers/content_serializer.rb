class ContentSerializer < ActiveModel::Serializer
  belongs_to :container

  attributes :id, :container_id, :product_id, :concentration


end
