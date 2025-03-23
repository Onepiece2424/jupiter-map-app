module Users
  class RegistrationsController < DeviseTokenAuth::RegistrationsController
    def create
      @user = User.new(users_params)
      if @user.save!

        # 新しい認証トークンを作成
        auth_headers = @user.create_new_auth_token

        # レスポンスヘッダーに認証情報を設定
        response.headers.merge!(auth_headers)

        render json: { status: 'success' }
      else
        render json: { status: 'error', errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def users_params
      params.require(:registration).permit(:firstname, :lastname, :age, :gender, :email, :password)
    end
  end
end
