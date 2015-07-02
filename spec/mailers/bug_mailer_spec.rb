require "spec_helper"

describe BugMailer, :type => :controller do
  before do |example|
    @bug = create(:bug, :w_admin)
  end

  describe "alert_admin_assigned_to_bug" do
    before(:each) do 
      @mail = BugMailer.alert_admin_assigned_to_bug(@bug)
    end

    it 'renders the subject' do
      expect(@mail.subject).to eq("You have been assigned a new bug.")
    end
 
    it 'renders the receiver email' do
      expect(@mail.to).to eq([@bug.admin.email])
    end
 
    it 'renders the sender e@mail' do
      expect(@mail.from).to eq(['BugTracker@themechanism.com'])
    end
 
    it 'assigns link to bug show page' do
      expect(@mail.body.encoded).to match( dashboard_bug_url(@bug) )
    end

    it 'assigns admin name' do
      expect(@mail.body.encoded).to match( @bug.admin.name )
    end
  end

  describe "alert_admin_unassigned_from_bug" do
    before(:each) do
      @second_dev = create(:admin, :second_dev) 
      @mail = BugMailer.alert_admin_unassigned_from_bug(@bug, @second_dev.id)
    end
    it 'renders the subject' do
      expect(@mail.subject).to eq("You have been unassigned from a bug.")
    end
 
    it 'renders the receiver email' do
      expect(@mail.to).to eq([@second_dev.email])
    end
 
    it 'renders the sender e@mail' do
      expect(@mail.from).to eq(['BugTracker@themechanism.com'])
    end
 
    it 'assigns link to bug show page' do
      expect(@mail.body.encoded).to match( dashboard_bug_url(@bug) )
    end

    it 'assigns admin name' do
      expect(@mail.body.encoded).to match( @second_dev.name )
    end
  end

  describe "alert_project_manager_that_bug_needs_verification" do
    before(:each) do
      @bug.update_attributes(status: 'Verify')
      @admin = @bug.admin
      @project_manager = @bug.project.admin
      @mail = BugMailer.alert_project_manager_that_bug_needs_verification(@bug)
    end
    it 'renders the subject' do
      expect(@mail.subject).to eq("#{@admin.name} submit a bug to verify.")
    end
 
    it 'renders the receiver email' do
      expect(@mail.to).to eq([@project_manager.email])
    end
 
    it 'renders the sender e@mail' do
      expect(@mail.from).to eq(['BugTracker@themechanism.com'])
    end
 
    it 'assigns link to bug show page' do
      expect(@mail.body.encoded).to match( dashboard_bug_url(@bug) )
    end

    it 'assigns admin name' do
      expect(@mail.body.encoded).to match( @project_manager.name )
    end
  end

  describe "alert_admin_revert_to_open" do
    before(:each) do
      @admin = @bug.admin
      @project_manager = @bug.project.admin
      @mail = BugMailer.alert_admin_revert_to_open(@bug)
    end
    it 'renders the subject' do
      expect(@mail.subject).to eq("#{@project_manager.name} re-opened a bug after your submission.")
    end
 
    it 'renders the receiver email' do
      expect(@mail.to).to eq([@admin.email])
    end
 
    it 'renders the sender e@mail' do
      expect(@mail.from).to eq(['BugTracker@themechanism.com'])
    end
 
    it 'assigns link to bug show page' do
      expect(@mail.body.encoded).to match( dashboard_bug_url(@bug) )
    end

    it 'assigns admin name' do
      expect(@mail.body.encoded).to match( @admin.name )
    end
  end

  describe "alert_admin_is_closed" do
    before(:each) do
      @bug.update_attributes(status: 'Closed')
      @admin = @bug.admin
      @project_manager = @bug.project.admin
      @mail = BugMailer.alert_admin_is_closed(@bug)
    end
    it 'renders the subject' do
      expect(@mail.subject).to eq("#{@project_manager.name} closed your bug. Nice.")
    end
 
    it 'renders the receiver email' do
      expect(@mail.to).to eq([@admin.email])
    end
 
    it 'renders the sender e@mail' do
      expect(@mail.from).to eq(['BugTracker@themechanism.com'])
    end
 
    it 'assigns link to bug show page' do
      expect(@mail.body.encoded).to match( dashboard_bug_url(@bug) )
    end

    it 'assigns admin name' do
      expect(@mail.body.encoded).to match( @admin.name )
    end
  end

end
