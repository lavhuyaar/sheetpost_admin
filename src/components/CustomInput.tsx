import { ICustomInput } from "../types/interfaces";

const CustomInput: React.FC<ICustomInput> = ({
  name,
  labelText,
  register,
  type,
  placeholder,
  errorMessage,
}) => {
  return (
    <>
      <div className="flex flex-col w-full gap-2">
        <label htmlFor={name} className="font-semibold text-lg">
          {labelText}
        </label>
        <input
          autoComplete="off"
          className="border-primary-txt/40 focus:outline-none align-middle border rounded-md px-3 py-2"
          {...register(name, { required: true })}
          type={type}
          placeholder={placeholder}
        />

        {errorMessage && (
          <p className="text-red-500 text-sm w-full">{errorMessage}</p>
        )}
      </div>
    </>
  );
};

export default CustomInput;
