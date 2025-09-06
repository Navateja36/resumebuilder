export default async function handler(request, response) {
    try {
      // This code checks if the secret keys (environment variables) exist
      const apiUrl = process.env.KV_REST_API_URL;
      const apiToken = process.env.KV_REST_API_TOKEN;
  
      console.log("Checking for KV_REST_API_URL:", apiUrl);
      console.log("Checking for KV_REST_API_TOKEN:", apiToken);
  
      if (apiUrl && apiToken) {
        // If they exist, send a success message
        return response.status(200).json({
          message: "Success! The environment variables were found.",
        });
      } else {
        // If they are missing, send an error message
        return response.status(500).json({
          message: "Error! The environment variables are still missing.",
        });
      }
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: 'An unexpected error occurred during the check.' });
    }
  }