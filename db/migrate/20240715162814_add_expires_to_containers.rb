class AddExpiresToContainers < ActiveRecord::Migration[6.1]
  def change
    add_column :containers, :expires, :datetime, default: -> { "CURRENT_TIMESTAMP + INTERVAL '2 years'" }
  end
end
