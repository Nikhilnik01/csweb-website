import { useCallback, useRef } from "react";
import { apiClient } from "../api/apiClient"; // ✅ named import, correct path

const useLeadCapture = () => {
  const capturedRef = useRef(false);

  const captureLead = useCallback(async ({ email, firstName = "", lastName = "", phone = "", source = "form" }) => {
    if (!email || capturedRef.current) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    capturedRef.current = true;
    try {
      await apiClient.post("/Home/CaptureLead", {
        email, firstName, lastName, phone, source,
        capturedAt: new Date().toISOString(),
      });
      if (typeof window !== "undefined" && window.trackLead) {
        window.trackLead(source);
      }
    } catch {
      capturedRef.current = false;
    }
  }, []);

  const captureLeadOnBlur = useCallback((email, firstName = "", lastName = "", source = "form") => {
    captureLead({ email, firstName, lastName, source });
  }, [captureLead]);

  const captureOnBlur = useCallback((e, extra = {}) => {
    captureLead({ email: e.target.value, ...extra });
  }, [captureLead]);

  return { captureLead, captureOnBlur, captureLeadOnBlur };
};

export default useLeadCapture;
export { useLeadCapture };