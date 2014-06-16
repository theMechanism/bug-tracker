class ClientsController < Devise::RegistrationsController
	 before_filter :authenticate!
	def show
		
		@client = Client.find(params[:id])
	end
	def authenticate!
		if current_client == nil
			redirect_to new_client_session_path, notice: "Please sign in before continuing"
		end
	end
end
