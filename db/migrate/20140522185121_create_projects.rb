class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :name
      t.string :blurb
      t.belongs_to :client
      t.date :expiration
      t.timestamps
    end
  end
end
