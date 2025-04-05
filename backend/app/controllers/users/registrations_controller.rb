module Users
  class RegistrationsController < DeviseTokenAuth::RegistrationsController
    private

    def sign_up_params
      params.require(:registration).permit(:email, :password, :lastname, :firstname, :age, :gender)
    end
  end
end
