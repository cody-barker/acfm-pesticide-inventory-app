class Product < ApplicationRecord
  has_many :contents
  has_many :containers, through: :contents
  validates :name, presence: true, length: {minimum: 2}
  validate :name_uniqueness_case_insensitive

    def name_uniqueness_case_insensitive
    if Product.where('LOWER(name) = ?', name.downcase).where.not(id: id).exists?
      errors.add(:name, 'has already been taken')
    end
  end
end
