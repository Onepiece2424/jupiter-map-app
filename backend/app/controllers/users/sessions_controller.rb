module Users
  class SessionsController < DeviseTokenAuth::SessionsController
    def create
      super do |resource|
        render json: { user: resource.as_json.merge(signed_in: user_signed_in?) } and return
      end
    end
  end
end
