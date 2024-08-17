const apiUrl = import.meta.env.VITE_APP_API_URL;

const check = async () => {
  try {
    const response = await fetch(`${apiUrl}/validateUser`, {
      method: 'GET',
      credentials: 'include',   
    });

    if (!response.ok) {
      console.error(`Error: ${response.statusText}`);
      return false;
    }

    // Optionally, handle response data if needed
    const data = await response.json();
    console.log('User validation response:', data);

    return true;
  } catch (error) {
    console.error('Fetch error:', error);
    return false;
  }
};

export default check
