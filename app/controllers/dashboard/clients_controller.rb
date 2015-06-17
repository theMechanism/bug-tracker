module Dashboard
  class ClientsController < ApplicationController
    include ApplicationHelper
    before_filter :deny_access, :unless => :is_admin?
    def index  
        @clients = Client.all
        @modal_urls = {
            new_client_project: new_dashboard_project_path,
            new_client: new_dashboard_client_path
        }.to_json.html_safe
    end

    def create
        @client = Client.new(client_params) 
        if @client.save
            render json: { 
                redirect_url: dashboard_client_path(@client)
            }
        else
            render :new, layout: false
        end
    end

    def show
        @client = Client.find(params[:id]) 
    end
    def update
    end
    def destroy
    end

    def new
        @client = Client.new
        render layout: false
    end

    private

    def client_params
        params.require(:client).permit(:name_of_co, :name_of_primary_contact, :email, :phone, :password, :misc_info)
    end

  end
end
