import { isAxiosError } from "axios";
import { toast } from "react-toastify";

const handleAxiosError = (error: unknown, helperMessage: string) => {
  console.error(error + " :: " + helperMessage);
  if (isAxiosError(error)) {
    toast.dismiss();
    toast.error(error?.response?.data?.message); //Error snackbar
  } else {
    toast.dismiss();
    toast.error("An error occured! Please try again!");
  }
};

export default handleAxiosError;
