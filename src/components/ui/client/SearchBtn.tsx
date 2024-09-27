import { Search } from "lucide-react";
import { Input } from "../input";

const SearchBtn = () => {
  return (
    <div>
      <div>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={20}
          />
          <Input
            type="text"
            className="pl-10 h-[50px] py-2 border border-gray-200 placeholder:text-gray-500 text-gray-600 hind-siliguri-regular rounded-md w-full"
            placeholder="এখানে ব্লগ খুজুন..."
          />
        </div>
        <span className="text-sm text-gray-400 hind-siliguri-light">
          একাডেমিক, শিক্ষা, চিকিৎসা, স্বাস্থ্য, অনলাইন ইনকাম, প্রোগ্রামিং...{" "}
        </span>
      </div>
    </div>
  );
};

export default SearchBtn;
