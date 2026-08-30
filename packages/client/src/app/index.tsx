import { Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { WebBadge } from "@/components/web-badge";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { formatDate } from "trabajador-shared";

export default function HomeScreen() {
    return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <ThemedView style={styles.heroSection}>
                    <ThemedText type="title" style={styles.title}>
                        Welcome to&nbsp;Trabajador
                    </ThemedText>
                    <ThemedText type="small">shared lib ok: {formatDate(new Date())}</ThemedText>
                </ThemedView>

                {Platform.OS === "web" && <WebBadge />}
            </SafeAreaView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "row",
    },
    safeArea: {
        flex: 1,
        paddingHorizontal: Spacing.four,
        alignItems: "center",
        gap: Spacing.three,
        paddingBottom: BottomTabInset + Spacing.three,
        maxWidth: MaxContentWidth,
    },
    heroSection: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        paddingHorizontal: Spacing.four,
        gap: Spacing.four,
    },
    title: {
        textAlign: "center",
    },
    code: {
        textTransform: "uppercase",
    },
    stepContainer: {
        gap: Spacing.three,
        alignSelf: "stretch",
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.four,
        borderRadius: Spacing.four,
    },
});
