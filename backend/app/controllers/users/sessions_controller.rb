class Users::SessionsController < DeviseTokenAuth::SessionsController
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
end
