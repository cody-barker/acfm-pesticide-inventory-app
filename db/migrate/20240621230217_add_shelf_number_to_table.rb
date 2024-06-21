class AddShelfNumberToTable < ActiveRecord::Migration[6.1]
  def change
    add_column :shelves, :number, :integer
  end
end
