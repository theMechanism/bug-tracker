ActiveAdmin.register Bug do
  menu :priority => 2
  config.clear_action_items!
  # See permitted parameters documentation:
  # https://github.com/gregbell/active_admin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  
  permit_params [:project_id, :url, :browser, :status, :params, :width, :height, :description, :os, :ua, :browser_version]
  index do
    selectable_column
    id_column
    column :project
    column :url
    column :created_at do |obj|
      obj.created_at.to_date
    end
    column("Status")   {|bug| status_tag(bug.status)} 
    
    actions
  end
  form do |f|
      f.inputs "Bug" do
        f.input :status, :as=> :select,:include_blank => false, :collection => ['Open', "Closed", "Verify"]
      end
      f.actions
    end
  end
