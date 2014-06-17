ActiveAdmin.register Bug do
  menu :priority => 2
  config.clear_action_items!
  actions :all, :except => [:edit]
  # See permitted parameters documentation:
  # https://github.com/gregbell/active_admin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  

  permit_params [:project_id,:name, :url, :browser, :status, :params, :width, :height, :description, :os, :ua, :browser_version]
  index do
    selectable_column
    id_column
    column :project
    column :url
    column :description do |obj|
      obj.description[0..30].gsub(/\s\w+\s*$/, '...')
    end
    column :created_at do |obj|
      obj.created_at.to_date
    end
    column :status do |resource|
      column_select(resource, :status, ["Verify", "Closed", "Open"])
    end
    actions
  end
 controller do
    def update

      @bug = Bug.find(params[:id])
      if params[:authenticity_token].present?     
        Bug.update(@bug.id, status: params[:bug][:status])
        redirect_to '/admin/bugs'
      else
        Bug.update(@bug.id, status: params[:bug][:status])
        render :nothing => true, :status => 200, :content_type => 'text/html'
      end
    end
  end
  
  show do |bug|
    active_admin_comments
    
    attributes_table do
        row "Project" do
          bug.project.name
        end
        row "Submitted by" do
          bug.name
        end
        row "URL" do
          bug.url
        end
        row :browser
        row :browser_version
        row :params
        row :width
        row :height
        row :description
        row :os
        row :ua
    end
    div do # <- Note the div
      semantic_form_for [:admin, resource], builder: ActiveAdmin::FormBuilder do |f|
        f.inputs "Update Status" do
        f.input :status, :as=> :select,:include_blank => false, :collection => ['Open', "Closed", "Verify"]
        end
        f.actions
      end
    end
  end 
end
