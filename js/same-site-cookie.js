const tokenValue = 'seu_token_aqui';
const cookieOptions = {
  expires: new Date(Date.now() + 30 * 86400 * 1000), // 30 dias
  sameSite: 'None', // ou 'Lax'
  secure: true
};

document.cookie = `__vercel_live_token=${tokenValue}; ${cookieOptions}`;