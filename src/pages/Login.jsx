import { GoogleLogin } from "@react-oauth/google";
import { useGoogleApi } from "../hooks/useGoogleApi";
import ClipLoader from "react-spinners/ClipLoader";
const Login = () => {
  const { fetchGoogle,loading } = useGoogleApi();
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="relative">
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          await fetchGoogle(credentialResponse.credential);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
       {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50">
            <ClipLoader color="#36d7b7" />
          </div>
        )}
    </div>
    </div>
  );
};

export default Login;
