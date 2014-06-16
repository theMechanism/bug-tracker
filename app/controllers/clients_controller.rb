class ClientsController < Devise::RegistrationsController
	
	def show
		@client = Client.find(params[:id])
	end
end
