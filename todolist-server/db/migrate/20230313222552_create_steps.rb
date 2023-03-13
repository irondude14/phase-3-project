class CreateSteps < ActiveRecord::Migration[6.1]
  def change
    create_table :steps do |t|
      t.string :name
      t.boolean :done
      t.integer :task_id
      t.timestamps
    end
  end
end
