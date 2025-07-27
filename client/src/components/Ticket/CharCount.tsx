export function CharCount({
  length,
  maxChars,
}: {
  length: number;
  maxChars: number;
}) {
  return (
    <div className="flex justify-end">
      <span
        className={`text-sm ${
          length > maxChars ? "text-red-500" : "text-gray-500"
        }`}
      >
        {length}/{maxChars}
      </span>
    </div>
  );
}
