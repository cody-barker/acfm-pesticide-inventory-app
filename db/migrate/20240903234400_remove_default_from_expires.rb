class RemoveDefaultFromExpires < ActiveRecord::Migration[6.1]
  def change
    change_column_default :containers, :expires, from: -> { "CURRENT_TIMESTAMP + '6 months'::interval" }, to: nil
  end
end
