import { useEffect, useState } from "react";
import { baseURL, getRequest } from "../utils/service";

export const useFetchRecipientUser = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);
  const recipientId = chat?.members.find((id) => id !== user?._id);

  useEffect(() => {
    const getUser = async () => {
      try {
        if (!recipientId) return null;

        const response = await getRequest(`${baseURL}/auth/find/${recipientId}`);
        setRecipientUser(response);
      } catch (error) {
        setError(error);
      }
    };

    getUser();
  }, [recipientId]);

  useEffect(() => {
    console.log(recipientUser); // Log inside the useEffect callback
  }, [recipientUser]); // Log whenever recipientUser changes

  return { recipientUser, error };
};
