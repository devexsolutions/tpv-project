// components/NumericKeypad.js
export default function NumericKeypad({ value, onChange }) {
    const buttons = ['7', '8', '9', '4', '5', '6', '1', '2', '3', 'C', '0', '.'];
  
    function handleButtonClick(button) {
      if (button === 'C') {
        onChange('1');
      } else {
        onChange(value === '1' ? button : value + button);
      }
    }
  
    return (
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Cantidad</h2>
        <input
          type="text"
          value={value}
          readOnly
          className="w-full p-2 text-right text-2xl font-bold mb-2 border rounded"
        />
        <div className="grid grid-cols-3 gap-2">
          {buttons.map((button) => (
            <button
              key={button}
              onClick={() => handleButtonClick(button)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
            >
              {button}
            </button>
          ))}
        </div>
      </div>
    );
  }
  