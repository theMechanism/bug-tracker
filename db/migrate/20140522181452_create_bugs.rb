class CreateBugs < ActiveRecord::Migration
  def change
    create_table :bugs do |t|
      t.integer :project_id, null:false
      t.string :url
      t.string :browser
      t.string :status, default: 'Open'
      t.string :params
      t.integer :width
      t.integer :height
      t.string :description
      t.timestamps
    end
  end
end
