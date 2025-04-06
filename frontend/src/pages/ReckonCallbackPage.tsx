// src/pages/ReckonCallbackPage.tsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useReckonCallback from "@/hooks/reckon/useReckonCallback";

const ReckonCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const reckonCallback = useReckonCallback();

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    console.log("Reckon callback code:", code);
    console.log("Reckon callback state:", state);

    if (code && state) {
      reckonCallback.mutate(
        { code, state },
        {
          onSuccess: () => {
            navigate("/dashboard");
          },
          onError: () => {
            navigate("/select");
          },
        }
      );
    } else {
      console.error("Invalid callback from Reckon");
      navigate("/select");
    }
  }, [navigate, reckonCallback, searchParams]);

  return <div className="p-4">Connecting Reckon...</div>;
};

export default ReckonCallbackPage;
