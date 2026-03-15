import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ACCENT = '#00C0D4';
const BG = '#000000';

function useIsSmall() {
    return Dimensions.get('window').width < 768;
}

const BADGE_STYLES: Record<string, { bg: string; border: string; color: string }> = {
    success: { bg: 'rgba(167, 243, 208, 0.1)', border: 'rgba(167, 243, 208, 0.2)', color: '#86EFAC' },
    warning: { bg: 'rgba(251, 191, 36, 0.1)', border: 'rgba(251, 191, 36, 0.2)', color: '#FCD34D' },
    danger:  { bg: 'rgba(252, 165, 165, 0.1)', border: 'rgba(252, 165, 165, 0.2)', color: '#FCA5A5' },
    default: { bg: 'rgba(255, 255, 255, 0.05)', border: 'rgba(255, 255, 255, 0.1)', color: 'rgba(255,255,255,0.85)' },
};

export function Badge({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default' | 'success' | 'warning' | 'danger' }) {
    const s = BADGE_STYLES[variant] ?? BADGE_STYLES.default;
    return (
        <View style={{
            backgroundColor: s.bg,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 100,
            borderWidth: 1,
            borderColor: s.border,
        }}>
            <Text style={{ color: s.color, fontSize: 12, fontWeight: '600' }}>{children}</Text>
        </View>
    );
}

export function GlassCard({ children, style }: { children: React.ReactNode, style?: any }) {
    return (
        <View style={[{
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            borderRadius: 24,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.08)',
            padding: 32,
            ...Platform.select({
                web: {
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                }
            })
        }, style]}>
            {children}
        </View>
    );
}

export function GradientButton({ children, onPress, size = 'md' }: { children: React.ReactNode, onPress: () => void, size?: 'md' | 'lg' }) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => ({
                backgroundColor: '#FFFFFF',
                paddingHorizontal: size === 'lg' ? 32 : 24,
                paddingVertical: size === 'lg' ? 18 : 14,
                borderRadius: 100,
                opacity: pressed ? 0.9 : 1,
                transform: [{ scale: pressed ? 0.98 : 1 }],
                alignItems: 'center',
                justifyContent: 'center',
            })}
        >
            <Text style={{
                color: BG,
                fontSize: size === 'lg' ? 18 : 16,
                fontWeight: '800',
                letterSpacing: -0.5,
                fontFamily: 'Inter-Bold',
            }}>
                {children}
            </Text>
        </Pressable>
    );
}

export function OutlineButton({ children, onPress }: { children: React.ReactNode, onPress: () => void }) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => ({
                backgroundColor: 'transparent',
                paddingHorizontal: 24,
                paddingVertical: 14,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.2)',
                opacity: pressed ? 0.7 : 1,
                alignItems: 'center',
                justifyContent: 'center',
            })}
        >
            <Text style={{
                color: '#FFFFFF',
                fontSize: 16,
                fontWeight: '600',
                fontFamily: 'Inter-SemiBold',
            }}>
                {children}
            </Text>
        </Pressable>
    );
}

export function SectionHeading({ title, subtitle, badge }: { title: string, subtitle?: string, badge?: string }) {
    const isSmall = useIsSmall();
    return (
        <View style={{ marginBottom: 64, alignItems: 'center' }}>
            {badge && (
                <Badge>
                    <Text style={{ color: ACCENT, fontSize: 12, fontWeight: '700', letterSpacing: 1, fontFamily: 'Inter-Bold' }}>{badge.toUpperCase()}</Text>
                </Badge>
            )}
            <Text style={{
                fontSize: isSmall ? 32 : 48,
                fontWeight: '800',
                color: '#FFFFFF',
                marginTop: 16,
                textAlign: 'center',
                fontFamily: 'PlayfairDisplay-Bold',
                letterSpacing: -1,
            }}>
                {title}
            </Text>
            {subtitle && (
                <Text style={{
                    fontSize: 18,
                    color: 'rgba(255, 255, 255, 0.5)',
                    marginTop: 16,
                    textAlign: 'center',
                    maxWidth: 600,
                    lineHeight: 28,
                    fontFamily: 'Inter-Regular',
                }}>
                    {subtitle}
                </Text>
            )}
        </View>
    );
}

export function FeatureCard({ icon, title, description }: { icon: string, title: string, description: string }) {
    const isSmall = useIsSmall();
    return (
        <GlassCard style={{ height: '100%' }}>
            <View style={{
                width: 56, height: 56, borderRadius: 16,
                backgroundColor: 'rgba(0, 192, 212, 0.1)',
                alignItems: 'center', justifyContent: 'center',
                marginBottom: 28,
            }}>
                <Ionicons name={icon as any} size={28} color={ACCENT} />
            </View>
            <Text style={{ color: '#FFFFFF', fontSize: isSmall ? 18 : 20, fontWeight: '700', marginBottom: 16, fontFamily: 'Inter-Bold', lineHeight: 28 }}>
                {title}
            </Text>
            <Text style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: isSmall ? 14 : 15, lineHeight: 26, fontFamily: 'Inter-Regular' }}>
                {description}
            </Text>
        </GlassCard>
    );
}
