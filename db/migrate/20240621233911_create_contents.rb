class CreateContents < ActiveRecord::Migration[6.1]
  def change
    create_table :contents do |t|
      t.integer :container_id
      t.integer :product_id
      t.float :concentration
      t.timestamps
    end
  end
end
