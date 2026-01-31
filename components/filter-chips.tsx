import { View, TouchableOpacity, Text } from "react-native";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

export type FilterOption = "all" | "viable" | "review" | "not_viable";

interface FilterChipsProps {
  selected: FilterOption;
  onSelect: (filter: FilterOption) => void;
  counts?: {
    all: number;
    viable: number;
    review: number;
    not_viable: number;
  };
  labels: {
    all: string;
    viable: string;
    review: string;
    not_viable: string;
  };
}

export function FilterChips({ selected, onSelect, counts, labels }: FilterChipsProps) {
  const colors = useColors();

  const handleSelect = (filter: FilterOption) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onSelect(filter);
  };

  const renderChip = (filter: FilterOption, label: string, count?: number) => {
    const isSelected = selected === filter;
    return (
      <TouchableOpacity
        key={filter}
        onPress={() => handleSelect(filter)}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 20,
          backgroundColor: isSelected ? colors.primary : colors.surface,
          borderWidth: 1,
          borderColor: isSelected ? colors.primary : colors.border,
          marginRight: 8,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: isSelected ? "600" : "400",
            color: isSelected ? "#FFFFFF" : colors.foreground,
          }}
        >
          {label}
          {count !== undefined && ` (${count})`}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {renderChip("all", labels.all, counts?.all)}
      {renderChip("viable", labels.viable, counts?.viable)}
      {renderChip("review", labels.review, counts?.review)}
      {renderChip("not_viable", labels.not_viable, counts?.not_viable)}
    </View>
  );
}
