import React from "react";
import { View, Text, TextInput, StyleSheet, Animated, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  onTogglePassword?: () => void;
  showPassword?: boolean;
  placeholder?: string;
  error?: string;
  id?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType = "default",
  onTogglePassword,
  showPassword,
  placeholder,
  error,
  id
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View 
        style={[
          styles.inputWrapper, 
          error ? styles.inputError : null,
          value ? styles.inputFilled : null
        ]}
      >
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize="none"
          placeholder={placeholder}
          placeholderTextColor="#B0B0B0"
          id={id}
          nativeID={id}
          testID={id}
        />
        {onTogglePassword && (
          <Ionicons
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            size={20}
            color="#707070"
            onPress={onTogglePassword}
            style={styles.icon}
          />
        )}
      </View>
      {error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={14} color="#FF3B30" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    gap: 6,
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#303030",
    marginBottom: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  inputFilled: {
    borderColor: "#FEA33C",
    backgroundColor: "#FFFAF4",
  },
  inputError: {
    borderColor: "#FF3B30",
    backgroundColor: "#FFF5F5",
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#303030",
    fontWeight: "500",
  },
  icon: {
    marginLeft: 8,
    padding: 4,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  errorText: {
    fontSize: 12,
    color: "#FF3B30",
    fontWeight: "500",
  }
});
