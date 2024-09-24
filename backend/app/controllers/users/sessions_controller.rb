class Users::SessionsController < DeviseTokenAuth::SessionsController
  before_action :configure_permitted_parameters, if: :devise_controller?

  def create
    super do |user|
      if user
        render json: {
          message: 'ログイン成功',
          tokens: {
            'access-token': response.headers['access-token'],
            'client': response.headers['client'],
            'uid': response.headers['uid']
          },
          user: user
        } and return
      end
    end
  end

  private

  def configure_permitted_parameters
    # sessionの中のパラメータを許可する
    devise_parameter_sanitizer.permit(:sign_in, keys: [:session => [:email, :password]])
  end
end
