module Dashboard
  class ClientsController < ApplicationController
    include ApplicationHelper
    before_filter :deny_access, :unless => :is_admin?
    def index  
        @clients = Client.all
        p "#{@clients.inspect}"
    end

    def create
        @client = Client.new(client_params) 
        p '#'*80
        p 'params'
        p "#{params.inspect}"
        if @client.save
            render json: { 
                redirect_url: dashboard_client_path(@client)
            }
        else
            render :new, layout: false
        end
    end

    def show
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
