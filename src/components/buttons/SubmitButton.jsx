const SubmitButton = ({
  isSubmitting = false,
  label = "Submit",
  submittingLabel = "Mengirim...",
  className = "",
}) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`w-full px-4 py-2 rounded-md text-white font-medium transition-colors ${
        isSubmitting
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      } ${className}`}
    >
      {isSubmitting ? submittingLabel : label}
    </button>
  );
};

export default SubmitButton;
