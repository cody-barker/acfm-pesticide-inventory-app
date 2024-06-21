class CreateShelves < ActiveRecord::Migration[6.1]
  def change
    create_table :shelves do |t|
      t.text :rows, array: true, default: ["A", "B", "C", "D", "E"]
      t.timestamps
    end
  end
end
