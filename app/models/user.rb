class User < ApplicationRecord
  has_secure_password
  has_many :containers
  validates :username, presence: true, length: {minimum: 2}
  validates :username, uniqueness: true
  validates :username, format: {without: /\s/, message: "cannot contain spaces"}
  validates :password, length: {minimum: 4, maximum: 16}, format: {without: /\s/, message: "cannot contain spaces"}
end
