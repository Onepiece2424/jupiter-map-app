module Auth
  module JoinToken
    include ActionController::Cookies
    extend ActiveSupport::Concern

    included do
      after_action :join_tokens, only: [:create]
    end

    private

    def join_tokens
      return if response.headers['access-token'].nil?

      cookies[:token] = {
        value: encode_access_token,
        httponly: true,
        expires: 30.days
      }

      response.headers.delete_if { |key| auth_headers_data.include?(key) }
    end

    def auth_headers_data
      {
        'access-token' => response.headers['access-token'],
        'client' => response.headers['client'],
        'uid' => response.headers['uid']
      }
    end

    def encode_access_token
      CGI.escape(Base64.encode64(JSON.dump(auth_headers_data)))
    end
  end
end
