ActiveAdmin.register Bug do
  menu :priority => 2
  
  # See permitted parameters documentation:
  # https://github.com/gregbell/active_admin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  permit_params [:project_id, :url, :browser, :status, :params, :width, :height, :description]
  index do
    selectable_column
    id_column
    column :project
    column :url
    column :created_at
    column("Status")   {|bug| status_tag(bug.status)} 
    actions
  end
  form do |f|
      f.inputs "Bug" do
        f.input :description
        f.input :status, :as=> :select, :collection => ['Open', "Closed", "Verify"]
      end
      f.actions
    end
  end
