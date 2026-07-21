import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import Button from '../ui/Button';

const TestCentreLocation = () => {
  const [postcode, setPostcode] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setPostcode(value);
  };

  const handleSearch = (searchValue = postcode) => {
    if (searchValue.trim()) {
      navigate(`/test-center?search=${encodeURIComponent(searchValue.trim())}`);
    } else {
      navigate('/test-center');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="bg-blue-600 text-white">
      <div className="margin-container flex flex-col md:flex-row items-center justify-between py-2 md:py-4">
        {/* Text Section */}
        <div className="text-center md:text-left w-full md:w-1/2 mb-1 md:mb-0">
          <h2 className="text-xl font-semibold mb-1">Find Your Nearest Test Centre</h2>

        </div>

        {/* Input Section */}
        <div className="w-full md:w-1/2 flex items-center justify-end">
          <div className="w-full bg-white rounded-lg py-1 px-3 max-w-md relative">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Enter postcode, city, or address..."
                  value={postcode}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="w-full text-sm pl-10 pr-3 py-2 rounded-lg text-gray-800 placeholder-gray-500 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <Button
                onClick={() => handleSearch()}
                className="text-sm py-[8px] px-8 whitespace-nowrap"
              >
                FIND
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestCentreLocation;
