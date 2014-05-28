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
  controller do
    def create
      binding.pry
      @project = Project.new(name: params[:project][:name], blurb: params[:project][:blurb], expiration: params[:project][:expiration], client_id: params[:project][:client_id] )
      
      create! #or super
    end
  end
end
