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
    before(:each) do |example|
      
      if example.metadata[:admin]
        @update_params = {
          admin_id: create(:admin, :second_dev).id
        }
      end

      if example.metadata[:status]
        @update_params = {
          status: "Verify"
        }
      end

      if example.metadata[:valid]
        @bug.update_attributes(admin: Admin.first)
        patch :update, {
          id: @bug.id, 
          bug: @update_params,
          format: :json
        }
      end
    end

    # SINGLE ATTRIBUTE -- reassign ADMIN_ID

    it 'valid admin, updates bug', :valid, :admin do 
      updated_admin = Bug.find(@bug.id).admin.id
      expect(updated_admin).to eq(@update_params[:admin_id])
    end
    it 'valid_admin params, returns json w updated @bug', :valid, :admin do 
      rsp_bug_hash = JSON.parse(response.body)["bug"]
      dbl_check_db = Bug.find(@bug.id).attributes
      expect(rsp_bug_hash['id']).to eq(dbl_check_db['id'])
    end
    it 'valid_admin params, assigns admins', :valid, :admin do 
      expect(assigns(:admins)).to eq(Admin.all)
    end
    it 'valid, :admin params, returns json w js callback string', :valid, :admin do 
      callback = JSON.parse(response.body)["callback"]
      expect(callback).to eq('bugTable.updateAdminAssign')
    end
    it 'valid_admin params, returns leaderboard partial', :valid, :admin  do
      expect(response).to render_template(:partial => '_leaderboard.html.erb')
    end
    it 'valid_admin params, sends emails to admins, old + new', :valid, :admin  do
      mail_count = ActionMailer::Base.deliveries.count
      expect(mail_count).to eq(2)
    end

    # expect { subject.send_instructions }.to change { ActionMailer::Base.deliveries.count }.by(1)

    # SINGLE ATTRIBUTE -- STATUS

    it 'valid status, updates bug', :status, :valid do 
      updated_status = Bug.find(@bug.id).status
      expect(updated_status).to eq(@update_params[:status])
    end
    it 'valid status params, returns json w updated @bug', :valid, :status do 
      rsp_bug_hash = JSON.parse(response.body)["bug"]
      dbl_check_db = Bug.find(@bug.id).attributes
      expect(rsp_bug_hash['id']).to eq(dbl_check_db['id'])
    end
    
    it 'valid, status params, returns json w js callback string', :valid, :status do 
      callback = JSON.parse(response.body)["callback"]
      expect(callback).to eq('bugTable.updateStatus')
    end
    it 'valid_admin params, returns leaderboard partial', :valid, :status  do
      expect(response).to render_template(:partial => '_status_table_cell.html.erb')
    end


    it 'invalid params, renders form w errors displayed, no change to bug admin' do 
      initial_admin = @bug.admin
      patch :update, {
        id: @bug.id, 
        bug: {admin_id: Admin.last.id + 1},
        format: :json
      }
      unchanged_admin = Bug.find(@bug.id).admin
      errors = JSON.parse(response.body)
      expect(errors).not_to be_empty
      expect(initial_admin).to eq(unchanged_admin)
    end 
  end

end
