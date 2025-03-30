class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  include ActionController::Cookies

  before_action :split_token

  private

  def split_token
    return if cookies[:token].nil?

    token = JSON.parse(Base64.decode64(CGI.unescape(cookies[:token])))
    request.headers['access-token'] = token['access-token']
    request.headers['client'] = token['client']
    request.headers['uid'] = token['uid']
  end
end
