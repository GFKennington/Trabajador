import { TextInput } from "@expo/ui";
import { useColorScheme } from "react-native";

import { Colors } from "@/constants/theme";

interface NumberInputProps {
    onChange: (value: number) => void;
    allowDecimal?: boolean;
    placeholder?: string;
}

export default function NumberInput({ onChange, allowDecimal, placeholder }: NumberInputProps) {
    const scheme = useColorScheme();
    const colors = Colors[scheme === "unspecified" ? "light" : scheme];

    const handleChange = (value: string): void => {
        let cleanedValue: string = value;
        if (allowDecimal) {
            cleanedValue = value.replace(/[^0-9.]/g, "");
            const parts = cleanedValue.split(".");
            if (parts.length > 2) {
                cleanedValue = `${parts[0]}.${parts.slice(1).join("")}`;
            }
        } else {
            cleanedValue = value.replace(/[^0-9]/g, "");
        }

        let numericValue: number | null = cleanedValue === "" ? null : parseFloat(cleanedValue);
        if (numericValue !== null && Number.isNaN(numericValue)) {
            numericValue = null;
        }

        onChange(numericValue !== null ? numericValue : 0);
    };

    return (
        <TextInput
            selectionColor={colors.background}
            placeholderTextColor={colors.text}
            keyboardType={allowDecimal ? "decimal-pad" : "number-pad"}
            onChangeText={handleChange}
            placeholder={placeholder}
            style={{
                borderColor: colors.text,
                borderWidth: 1,
                padding: 10,
                borderRadius: 5,
            }}
            textStyle={{ color: colors.text }}
        />
    );
}
