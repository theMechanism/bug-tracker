ActiveAdmin.register Client do
  menu :priority => 2
  
permit_params [:email, :password, :password_confirmation] 
  
index do
    column :email
    actions
  end
  form do |f|
      f.inputs "Client" do
        f.input :email
        f.input :password
        f.input :password_confirmation
      end
      f.actions
    end
  controller do
    def create
      @client = Client.new(email: params[:client][:email], password: params[:client][:password])
      create! #or super
    end
  end
  
end
