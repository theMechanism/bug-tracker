ActiveAdmin.register Project do
  menu :priority => 3
  
  # See permitted parameters documentation:
  # https://github.com/gregbell/active_admin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
   permit_params [:name, :blurb, :expiration, :client_id]
  #
  # or
  #
  # permit_params do
  #  permitted = [:permitted, :attributes]
  #  permitted << :other if resource.something?
  #  permitted
  # end
  
  index do
    selectable_column
    id_column
    column :name
    column :client
    column :expiration
    column("Total Bugs"){|project| link_to("#{project.bugs.length} bugs", admin_project_bugs_path(project.id)) } 
    column("Open Bugs"){|project| link_to("#{project.bugs.where(status:'Open').length} bugs", "/admin/projects/#{project.id}/bugs?utf8=✓&q%5Bproject_id_eq%5D=#{project.id}&q%5Bstatus_contains%5D=Open&commit=Filter&order=id_desc") } 
    actions
  end
  form do |f|
      f.inputs "Project" do
        f.input :client_id, :as=> :select,:include_blank => false, :collection => Client.all, member_label: :email
        f.input :name
        f.input :blurb
        f.input :expiration, :as => :datepicker
        
      end
      f.actions
    end
  controller do
    def create
      @project = Project.new(name: params[:project][:name], blurb: params[:project][:blurb], 
        expiration: Date.parse(params[:project][:expiration]),
        client_id: params[:project][:client_id] )
     
      create! #or super
    end
  end
end
