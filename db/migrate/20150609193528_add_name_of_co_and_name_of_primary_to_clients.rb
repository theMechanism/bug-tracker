class AddNameOfCoAndNameOfPrimaryToClients < ActiveRecord::Migration
  def change
    add_column :clients, :name_of_co, :string
    add_column :clients, :name_of_primary_contact, :string
    add_column :clients, :misc_info, :text
    add_column :clients, :phone, :string
  end
end
