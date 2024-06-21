class CreateContainers < ActiveRecord::Migration[6.1]
  def change
    create_table :containers do |t|
      t.integer :user_id
      t.integer :shelf
      t.string :row
      t.timestamps
    end
  end
end
