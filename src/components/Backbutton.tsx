import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg 
                 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 
                 text-gray-700 dark:text-gray-200 font-medium transition-colors"
    >
      <ArrowLeft className="w-5 h-5" />
      <span>Back</span>
    </button>
  );
};
