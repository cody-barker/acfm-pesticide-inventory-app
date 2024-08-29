class CreateCreationLogs < ActiveRecord::Migration[6.1]
  def change
    create_table :creation_logs do |t|

      t.timestamps
    end
  end
end
