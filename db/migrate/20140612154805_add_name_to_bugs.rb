class AddNameToBugs < ActiveRecord::Migration
  def change
  	add_column :bugs, :name, :string
  end
end
