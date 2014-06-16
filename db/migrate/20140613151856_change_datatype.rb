class ChangeDatatype < ActiveRecord::Migration
  def change
  	remove_column :bugs, :description
  	add_column :bugs, :description, :text
  end
end
