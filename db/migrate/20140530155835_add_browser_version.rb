class AddBrowserVersion < ActiveRecord::Migration
  def change
  	add_column :bugs, :browser_version, :string
  	add_column :bugs, :os, :string
  	add_column :bugs, :ua, :string
  end
end
