import { View, Text, Pressable, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useTranslation } from '@/lib/i18n-context';

export function LanguageSelector() {
  const { language, setLanguage } = useTranslation();

  const handleLanguageChange = async (lang: 'es' | 'en') => {
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    await setLanguage(lang);
  };

  return (
    <View className="flex-row gap-2 bg-surface rounded-full p-1">
      <Pressable
        onPress={() => handleLanguageChange('es')}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.7 : 1,
          },
        ]}
        className={`px-4 py-2 rounded-full ${
          language === 'es' ? 'bg-primary' : 'bg-transparent'
        }`}
      >
        <Text
          className={`font-semibold ${
            language === 'es' ? 'text-background' : 'text-foreground'
          }`}
        >
          ES
        </Text>
      </Pressable>

      <Pressable
        onPress={() => handleLanguageChange('en')}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.7 : 1,
          },
        ]}
        className={`px-4 py-2 rounded-full ${
          language === 'en' ? 'bg-primary' : 'bg-transparent'
        }`}
      >
        <Text
          className={`font-semibold ${
            language === 'en' ? 'text-background' : 'text-foreground'
          }`}
        >
          EN
        </Text>
      </Pressable>
    </View>
  );
}
