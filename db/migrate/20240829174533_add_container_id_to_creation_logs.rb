class AddContainerIdToCreationLogs < ActiveRecord::Migration[6.1]
  def change
    add_column :creation_logs, :container_id, :integer
    add_index :creation_logs, :container_id
  end
end
