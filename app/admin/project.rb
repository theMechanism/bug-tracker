ActiveAdmin.register Project do
  menu :priority => 3
  
  # See permitted parameters documentation:
  # https://github.com/gregbell/active_admin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
   permit_params [:name, :blurb, :expiration, :client]
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
    column("Total Bugs"){|project| link_to("#{project.bugs.length} bugs", "/admin/bugs?utf8=✓&q%5Bproject_id_eq%5D=#{project.id}&commit=Filter&order=id_desc") } 
    column("Open Bugs"){|project| link_to("#{project.bugs.where(status:'Open').length} bugs", "/admin/bugs?utf8=✓&q%5Bproject_id_eq%5D=#{project.id}&q%5Bstatus_contains%5D=Open&commit=Filter&order=id_desc") } 
    actions
  end
  form do |f|
      f.inputs "Project" do
        f.input :client_id, :as=> :select,:include_blank => false, :collection => Client.all, member_label: :email
        f.input :name
        f.input :blurb
        f.input :expiration
        
      end
      f.actions
    end
  controller do
    def create
      @project = Project.new(name: params[:project][:name], blurb: params[:project][:blurb], 
        expiration: DateTime.new(params[:project]["expiration(1i)"].to_i,params[:project]["expiration(2i)"].to_i,params[:project]["expiration(3i)"].to_i, params[:project]["expiration(4i)"].to_i,params[:project]["expiration(5i)"].to_i),
        client_id: params[:project][:client_id] )
     
      create! #or super
    end
  end
end
