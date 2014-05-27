class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :name
      t.string :blurb
      t.integer :client_id, null:false
      t.datetime :expiration
      t.timestamps
    end
  end
end
