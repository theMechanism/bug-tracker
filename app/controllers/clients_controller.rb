class ClientsController < Devise::RegistrationsController
	before_filter :authenticate_user!, 
              :only => [:show]
	def show
		@client = Client.find(params[:id])
	end
end
