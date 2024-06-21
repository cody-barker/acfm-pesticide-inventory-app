class RemoveFarmsAndBedsTables < ActiveRecord::Migration[6.1]
  def change
    drop_table :farms
    drop_table :beds
  end
end
