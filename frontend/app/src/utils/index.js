// localStorageから認証情報を取得
export const getAuthHeaders = () => {
  const accessToken = localStorage.getItem('access-token') || '';
  const uid = localStorage.getItem('uid') || '';
  const client = localStorage.getItem('client') || '';

  return { 'access-token': accessToken, 'uid': uid, 'client': client, 'Content-Type': 'application/json' };
};
