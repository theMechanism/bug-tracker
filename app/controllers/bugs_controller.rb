class BugsController < ApplicationController
	include ActionController::Helpers
  	include ActionController::Cookies
	
	# before_filter :authenticate_user!, :except => [:show, :index, :create, :new]  
	skip_before_action :verify_authenticity_token
	def new
		@bug = Bug.new
	end

	def create
		@bug = Bug.build(bug_params)


		if @bug.save
			render json: @bug, status: :created, location: @bug, callback: params[:callback] 
		else
			render json: @bug.errors, status: :unprocessable_entity, callback: params[:callback]
		end
	end

	def index
		@bugs = Bug.all
		render json: @bugs, callback: params[:callback]
	end

	def show
		@bug = Bug.find(params[:id])
		render json: @bug, callback: params[:callback] 
	end

	def edit
	end

	def update
		@bug = Bug.find(params[:id])

      if @bug.update(params[:bug])
      	head :no_content
      else
        render json: @bug.errors, status: :unprocessable_entity, callback: params[:callback] 
      end
	    
	end

	def destroy
		@bug = Bug.find(params[:id])
		@bug.destroy
	    head :no_content
	end

	private
		def bug_params
			# params.require(:bug).permit!
			params.fetch(:bug, {})
		end

end
