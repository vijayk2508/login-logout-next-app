import Image from "next/image";
import { InputFieldContainerClassname } from "../constants/general";

interface InputFieldProps {
    readonly icon: string;
    readonly label: string;
    readonly placeholder: string;
    readonly type: "text" | "email" | "password";
    readonly name: string;
    readonly onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    readonly value: string;
}

const InputField: React.FC<InputFieldProps> = ({
    icon,
    label,
    placeholder,
    type,
    name,
    onChange,
    value,
}) => {
    return (
        <div className={InputFieldContainerClassname}>
            <Image
                src={icon}
                alt={label}
                width={32}
                height={32}
                className="w-6 h-6"
            />
            <div className="flex flex-col py-2">
                <p className="text-sm font-medium text-gray-700 mx-2">{label}</p>
                <input
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    className="mx-2 w-full bg-gray-100 text-black"
                    value={value}
                    onChange={onChange}

                />
            </div>
        </div>
    );
};

export default InputField;
