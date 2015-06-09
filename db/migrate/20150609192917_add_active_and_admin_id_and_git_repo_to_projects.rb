class AddActiveAndAdminIdAndGitRepoToProjects < ActiveRecord::Migration
  def change
    add_column :projects, :active, :boolean
    add_reference :projects, :admin, index: true
    add_column :projects, :git_repo_url, :string
    add_column :projects, :dev_server_url, :string
  end
end
