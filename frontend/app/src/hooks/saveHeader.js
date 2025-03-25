const saveAuthHeaders = (headers) => {
  const accessToken = headers['access-token'] || '';
  const client = headers['client'] || '';
  const uid = headers['uid'] || '';

  localStorage.setItem('access-token', accessToken);
  localStorage.setItem('client', client);
  localStorage.setItem('uid', uid);
};

export default saveAuthHeaders;
