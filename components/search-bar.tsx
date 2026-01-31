import { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { useTranslation } from "@/lib/i18n-context";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export function SearchBar({ onSearch, placeholder, debounceMs = 300 }: SearchBarProps) {
  const colors = useColors();
  const { t } = useTranslation();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs, onSearch]);

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.surface,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <Text style={{ fontSize: 18, marginRight: 8, color: colors.muted }}>🔍</Text>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder={placeholder || t("common.search")}
        placeholderTextColor={colors.muted}
        style={{
          flex: 1,
          fontSize: 16,
          color: colors.foreground,
        }}
      />
      {query.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={{ padding: 4 }}>
          <Text style={{ fontSize: 18, color: colors.muted }}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
