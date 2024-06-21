class UserSerializer < ActiveModel::Serializer
  has_many :containers
  attributes :id, :username, :password
  
end
