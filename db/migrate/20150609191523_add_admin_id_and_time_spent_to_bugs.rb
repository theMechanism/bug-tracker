class AddAdminIdAndTimeSpentToBugs < ActiveRecord::Migration
  def change
    add_reference :bugs, :admin, index: true
    add_column :bugs, :time_spent, :float
  end
end
