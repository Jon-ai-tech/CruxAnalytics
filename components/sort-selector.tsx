import { View, TouchableOpacity, Text } from "react-native";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

export type SortOption = "date-desc" | "date-asc" | "name-asc" | "name-desc" | "roi-desc" | "roi-asc" | "npv-desc" | "npv-asc";

interface SortSelectorProps {
  selected: SortOption;
  onSelect: (sort: SortOption) => void;
  labels: {
    [key in SortOption]: string;
  };
}

export function SortSelector({ selected, onSelect, labels }: SortSelectorProps) {
  const colors = useColors();

  const handleSelect = (sort: SortOption) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onSelect(sort);
  };

  const sortOptions: SortOption[] = [
    "date-desc",
    "date-asc",
    "name-asc",
    "name-desc",
    "roi-desc",
    "roi-asc",
    "npv-desc",
    "npv-asc",
  ];

  return (
    <View style={{ gap: 8 }}>
      {sortOptions.map((option) => {
        const isSelected = selected === option;
        return (
          <TouchableOpacity
            key={option}
            onPress={() => handleSelect(option)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 8,
              backgroundColor: isSelected ? colors.primary + "20" : "transparent",
            }}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: isSelected ? colors.primary : colors.border,
                backgroundColor: isSelected ? colors.primary : "transparent",
                marginRight: 12,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isSelected && <Text style={{ color: "#FFFFFF", fontSize: 12 }}>✓</Text>}
            </View>
            <Text
              style={{
                fontSize: 15,
                color: isSelected ? colors.primary : colors.foreground,
                fontWeight: isSelected ? "600" : "400",
              }}
            >
              {labels[option]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
