import { View, Text, ScrollView, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useColors } from "@/hooks/use-colors";
import { useTranslation } from "@/lib/i18n-context";

interface ComparisonChartProps {
  baseData: number[];
  dynamicData: number[];
  labels: string[];
  title: string;
  baseLabel: string;
  dynamicLabel: string;
}

export function ComparisonChart({
  baseData,
  dynamicData,
  labels,
  title,
  baseLabel,
  dynamicLabel,
}: ComparisonChartProps) {
  const colors = useColors();
  const { t } = useTranslation();
  const screenWidth = Dimensions.get("window").width;
  const chartWidth = Math.max(screenWidth - 48, labels.length * 40);

  return (
    <View style={{ gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: "600", color: colors.foreground }}>
        {title}
      </Text>

      {/* Legend */}
      <View style={{ flexDirection: "row", gap: 16, flexWrap: "wrap" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <View
            style={{
              width: 16,
              height: 3,
              backgroundColor: colors.primary,
              borderRadius: 2,
            }}
          />
          <Text style={{ fontSize: 14, color: colors.foreground }}>{baseLabel}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <View
            style={{
              width: 16,
              height: 3,
              backgroundColor: "#F59E0B",
              borderRadius: 2,
            }}
          />
          <Text style={{ fontSize: 14, color: colors.foreground }}>{dynamicLabel}</Text>
        </View>
      </View>

      {/* Chart */}
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <LineChart
          data={{
            labels: labels,
            datasets: [
              {
                data: baseData,
                color: () => colors.primary,
                strokeWidth: 2,
              },
              {
                data: dynamicData,
                color: () => "#F59E0B",
                strokeWidth: 2,
              },
            ],
          }}
          width={chartWidth}
          height={220}
          chartConfig={{
            backgroundColor: colors.surface,
            backgroundGradientFrom: colors.surface,
            backgroundGradientTo: colors.surface,
            decimalPlaces: 0,
            color: (opacity = 1) => colors.foreground + Math.round(opacity * 255).toString(16).padStart(2, "0"),
            labelColor: (opacity = 1) => colors.muted + Math.round(opacity * 255).toString(16).padStart(2, "0"),
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "4",
              strokeWidth: "2",
            },
            propsForBackgroundLines: {
              strokeDasharray: "",
              stroke: colors.border,
              strokeWidth: 1,
            },
          }}
          bezier
          style={{
            borderRadius: 16,
            paddingRight: 16,
          }}
          withInnerLines={true}
          withOuterLines={true}
          withVerticalLines={false}
          withHorizontalLines={true}
          withDots={labels.length <= 12}
          withShadow={false}
        />
      </ScrollView>
    </View>
  );
}
