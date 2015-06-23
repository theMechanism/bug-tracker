require 'spec_helper'

RSpec.describe Dashboard::ProjectsController, :type => :controller do

  before do |example|
    unless example.metadata[:skip_login]
      sign_in create(:admin)
    end
    unless example.metadata[:no_create]
      @project = create(:project)
    end
    if example.metadata[:with_bug]
      @bug = create(:bug)
      @project = @bug.project
    end
  end

  describe 'admin not signed in', :skip_login do 
    it 'redirects to admin login' do 
      get :index
      expect(response).to redirect_to(new_admin_session_path)
    end
  end

  describe 'GET index' do
    it 'renders index page' do
      get :index
      expect(response).to render_template("index")
      expect(response).to render_template(layout: 'dashboard')
    end
    it 'assigns @projects' do
      get :index
      expect(assigns(:projects)).to eq([@project])
    end
  end

  describe 'GET new', :no_create do
    it 'renders partial w/out layout' do 
      get :new
      expect(response).to render_template('new')
      expect(response).to render_template(layout: nil)
    end
    it 'assigns new @project' do 
      get :new
      expect(assigns(:project)).to be_a(Project)
    end
  end
  describe 'GET edit' do
    it 'renders partial w/out layout' do 
      get :edit, id: @project.id
      expect(response).to render_template('edit')
      expect(response).to render_template(layout: nil)
    end
    it 'assigns @project' do 
      get :edit, id: @project.id
      expect(assigns(:project)).to eq(@project)
    end
  end

  describe 'GET show', :no_create, :with_bug do
    before(:each) do 
      get :show, id: @project.id
    end
    it 'renders template' do    
      expect(response).to render_template('show')
      expect(response).to render_template(layout: 'dashboard')
    end
    it 'assigns @project' do 
      expect(assigns(:project)).to eq(@project)
    end
    it 'assigns @bugs' do 
      expect(assigns(:bugs)).to eq([@bug])
    end
    it 'assigns @admins' do 
      expect(assigns(:admins)).to eq(Admin.all)
    end
    it 'assigns @modal_urls' do 
      expected_json = {
        edit_project: edit_dashboard_project_path(@project),
        new_bug: new_dashboard_project_bug_path(@project)
      }.to_json
      expect(assigns(:modal_urls)).to eq(expected_json)
    end

  end
end

# @project
# @bugs
# @admins
# @modal_urls 









