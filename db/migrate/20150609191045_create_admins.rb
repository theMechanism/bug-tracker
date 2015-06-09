class CreateAdmins < ActiveRecord::Migration
  def change
    create_table :admins do |t|
      t.boolean :is_project_manager
      t.string :name
      t.string :email

      t.timestamps
    end
  end
end
