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
 
    it 'assigns @name' do
      p "#{@mail.body.encoded.inspect}"
      p "#{dashboard_bug_url(@bug).inspect}"
      expect(@mail.body.encoded).to match( dashboard_bug_url(@bug) )
    end
 
    # it 'assigns @confirmation_url' do
    #   expect(@mail.body.encoded).to match("http://aplication_url/#{user.id}/confirmation")
    # end

  end


end
