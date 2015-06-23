require 'spec_helper'

RSpec.describe Dashboard::BugsController, :type => :controller do

  before do |example|
    unless example.metadata[:skip_login]
      sign_in create(:admin)
    end
    if example.metadata[:associated_bug]
      @bug = create(:bug)
    end
  end

  describe "without current_admin", :skip_login do 
    it 'redirects away from controller actions' do
      get :index
      expect(response).to redirect_to(new_admin_session_path)
    end
  end

  describe 'GET new' do 
    it 'renders partial template w/out layout' do 
      get :new, use_route: 'dashboard'
      expect(response).to render_template('new')
      expect(response).to render_template(layout: nil)
    end
    it 'assigns new Bug' do 
      get :new, use_route: 'dashboard'
      expect(assigns(:bug)).to be_a(Bug)
    end
  end

  describe 'GET show', :associated_bug do 
    before(:each) do 
      get :show, id: @bug.id
    end
    it 'renders template' do 
      expect(response).to render_template('show')
      expect(response).to render_template(layout: 'dashboard')
    end
    it 'assigns @bug' do 
      expect(assigns(:bug)).to eq(@bug)
    end
    it 'assigns @project' do 
      expect(assigns(:project)).to eq(@bug.project)
    end
    it 'assigns @admin' do 
      expect(assigns(:admin)).to eq(@bug.admin)
    end
    it 'assigns @comments' do
      @bug.comments.create(content: 'this is a comment')
      expect(assigns(:comments)).to eq(@bug.comments.order(:created_at))
    end
    it 'assigns @comment' do 
      expect(assigns(:comment)).to be_a(Comment)
    end
  end

  describe 'POST create' do 
    before(:each) do
      @project = create(:project)
      @bug_count = @project.bugs.count
      @bug_params = attributes_for(:bug)
    end
    
    it 'valid params, creates and adds to db' do 
      post :create, {
        project_id: @project.id,
        bug: @bug_params
      }
      expect(Bug.count).to eq(@bug_count + 1)
    end
    it 'valid params, responds with redirect_url to show page' do 
      post :create, {
        project_id: @project.id,
        bug: @bug_params
      }
      expected_json = {
        redirect_url: dashboard_project_path(@project)
      }.to_json
      expect(response.body).to eq(expected_json)
    end
    it 'invalid params, renders :new partial' do 
      post :create, {
        project_id: @project.id,
        bug: @bug_params.except(:description)
      }
      expect(response).to render_template('new')
    end
  end

  describe 'PUT update', :associated_bug do
    before(:each) do 
      @update_params = {
        admin_id: Admin.last.id
      }
    end
    it 'valid params, updates bug' do 
      patch :update, {id: 1, bug: {admin_id: 1}}
        # bug: @update_params
      #, format: :js
      updated_admin = Bug.find(@bug.id).admin
      expect(updated_admin).to eq(@update_params[:admin_id])
    end
  end

end
