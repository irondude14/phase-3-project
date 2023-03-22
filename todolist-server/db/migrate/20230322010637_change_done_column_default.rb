class ChangeDoneColumnDefault < ActiveRecord::Migration[6.1]
  def change
    change_column_default :steps, :done, from: nil, to: false
  end
end
