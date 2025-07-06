const Button = ({ children, onClick, type = "submit", disabled = false }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-200"
  >
    {children}
  </button>
);

export default Button;
