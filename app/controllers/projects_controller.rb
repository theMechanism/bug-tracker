class ProjectsController < ApplicationController
	before_filter :authenticate_user!, 
              :only => [:show]
	def index
		@projects = Project.all
	end

	def show
	end

	def new
		@project = Project.new
	end

	def create
		@project = Project.new(project_params)

		respond_to do |format|
	      if @project.save
	        format.html { redirect_to @project, notice: 'Project was successfully created.' }
	        format.json { render action: 'show', status: :created, location: @project }
	      else
	        format.html { render action: 'new' }
	        format.json { render json: @project.errors, status: :unprocessable_entity }
	      end
	    end 
	end

	def edit
	end

	def update
		respond_to do |format|
	      if @project.update(project_params)
	        format.html { redirect_to @project, notice: 'Post was successfully updated.' }
	        format.json { head :no_content }
	      else
	        format.html { render action: 'edit' }
	        format.json { render json: @project.errors, status: :unprocessable_entity }
	      end
	    end
	end

	def destroy
		@project.destroy
	    respond_to do |format|
	      format.html { redirect_to posts_url }
	      format.json { head :no_content }
	    end
	end

	private
	def project_params
		params.require(:bug).permit!
	end
end
