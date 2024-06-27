import { Input } from "@/components/ui/input";
import useDebounce from "@/utils/useDebounce";
import { useState } from "react";

type Props = {
  value?: string | number | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  placeholder: string;
}

function SearchInput({ value, onChange, placeholder }: Props) {
  const [displayValue, setDisplayValue] = useState(value);
  const debouncedChange = useDebounce(onChange, 500)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayValue(event.target.value)
    debouncedChange(event.target.value);
  }

  return (
    <>
      <Input
        type="search"
        placeholder={placeholder}
        value={displayValue}
        onChange={handleChange}
        className="w-96 border-gray-400 outline-none"
      />
    </>
  )
}

export default SearchInput