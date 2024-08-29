class AddTeamIdToContainers < ActiveRecord::Migration[6.0]
  def change
    add_column :containers, :team_id, :integer
    add_index :containers, :team_id
  end
end
