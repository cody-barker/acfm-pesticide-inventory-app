class AddTeamIdToCreationLogs < ActiveRecord::Migration[6.1]
  def change
    add_column :creation_logs, :team_id, :integer
    add_index :creation_logs, :team_id
  end
end
