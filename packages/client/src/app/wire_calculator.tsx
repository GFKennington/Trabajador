import { Platform, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { WebBadge } from "@/components/web-badge";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import NumberInput from "@/components/number-input";
import { SetStateAction, useState } from "react"; 

// TODO: hook up inputs to outputs (do the calculations)

export default function WireCalculatorScreen() {
    const safeAreaInsets = useSafeAreaInsets();
    const insets = {
        ...safeAreaInsets,
        bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
    };
    const [ ampacity, setAmpacity ] = useState<number>(0);
    const [ temperatureRating, setTemperatureRating ] = useState<number>(0);
    const [ wireDetails, setWireDetails ] = useState<string>("Wire Temperature");
    const [ wireMaterial, setWireMaterial ] = useState<string>("Copper");
    const [ wireType, setWireType ] = useState<string>("NM-B");

    const [ alluminumSize, setAlluminumSize ] = useState<string>("");
    const [ copperSize, setCopperSize ] = useState<string>("");
    const theme = useTheme();

    const contentPlatformStyle = Platform.select({
    android: {
            paddingTop: insets.top,
            paddingLeft: insets.left,
            paddingRight: insets.right,
            paddingBottom: insets.bottom,
        },
        web: {
            paddingTop: Spacing.six,
            paddingBottom: Spacing.four,
        },
    });

    return (
        <ScrollView
            style={[styles.scrollView, { backgroundColor: theme.background }]}
            contentInset={insets}
            contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}
        >
            <ThemedView style={styles.container}>
                <ThemedView style={styles.titleContainer}>
                    <ThemedText type="subtitle">Wire Calculator</ThemedText>
                    <ThemedText style={styles.centerText} themeColor="textSecondary">
                        Calculate the right wire size for your installation.
                    </ThemedText>
                </ThemedView>

                 <Picker
                    selectedValue={wireDetails}
                    onValueChange={(itemValue: SetStateAction<string>) => setWireDetails(itemValue)}
                >
                    <Picker.Item label="Wire Temperature" value="Wire Temperature" />
                    <Picker.Item label="Wire Type" value="Wire Type" />
                </Picker>

                <ThemedText type="subtitle">Ampacity: {ampacity}</ThemedText>
                            <NumberInput
                                onChange={setAmpacity}
                                allowDecimal={true}
                                placeholder={"Set Ampacity"}
                            />

                {
                    wireDetails === "Wire Temperature" && (
                        <>
                            <ThemedText type="subtitle">Temperature Rating: {temperatureRating}</ThemedText>
                            <NumberInput
                                onChange={setTemperatureRating}
                                allowDecimal={true}
                                placeholder={"Set Temperature Rating"}
                            />
                            
                            <Picker
                                selectedValue={wireMaterial}
                                onValueChange={(itemValue: SetStateAction<string>) => setWireMaterial(itemValue)}
                            >
                                <Picker.Item label="60c" value="60c" />
                                <Picker.Item label="75c" value="75c" />
                                <Picker.Item label="90c" value="90c" />
                            </Picker>
                        </>   
                    )                    
                }

                {
                    wireDetails === "Wire Type" && (
                        <>
                            <ThemedText type="subtitle">Temperature Rating: {temperatureRating}</ThemedText>
                            <NumberInput
                                onChange={setTemperatureRating}
                                allowDecimal={true}
                                placeholder={"Set Temperature Rating"}
                            />
                            
                            <Picker
                                selectedValue={wireMaterial}
                                onValueChange={(itemValue: SetStateAction<string>) => setWireMaterial(itemValue)}
                            >
                                <Picker.Item label="NM-B" value="NM-B" />
                                <Picker.Item label="UF-B" value="UF-B" />
                                <Picker.Item label="THW" value="THW" />
                                <Picker.Item label="THWN" value="THWN" />
                                <Picker.Item label="SE" value="SE" />
                                <Picker.Item label="USE" value="USE" />
                                <Picker.Item label="XHHW" value="XHHW" />
                                <Picker.Item label="THWN-2" value="THWN-2" />
                                <Picker.Item label="THHN" value="THHN" />
                                <Picker.Item label="XHHW-2" value="XHHW-2" />
                                <Picker.Item label="USE-2" value="USE-2" />
                            </Picker>
                        </>   
                    )
                }

                <ThemedText type="subtitle">Aluminum Size: {alluminumSize}</ThemedText>
                <ThemedText type="subtitle">Copper Size: {copperSize}</ThemedText>

                {Platform.OS === "web" && <WebBadge />}
            </ThemedView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    container: {
        maxWidth: MaxContentWidth,
        flexGrow: 1,
    },
    titleContainer: {
        gap: Spacing.three,
        alignItems: "center",
        paddingHorizontal: Spacing.four,
        paddingVertical: Spacing.six,
    },
    centerText: {
        textAlign: "center",
    },
    pressed: {
        opacity: 0.7,
    },
    linkButton: {
        flexDirection: "row",
        paddingHorizontal: Spacing.four,
        paddingVertical: Spacing.two,
        borderRadius: Spacing.five,
        justifyContent: "center",
        gap: Spacing.one,
        alignItems: "center",
    },
    sectionsWrapper: {
        gap: Spacing.five,
        paddingHorizontal: Spacing.four,
        paddingTop: Spacing.three,
    },
    collapsibleContent: {
        alignItems: "center",
    },
    imageTutorial: {
        width: "100%",
        aspectRatio: 296 / 171,
        borderRadius: Spacing.three,
        marginTop: Spacing.two,
    },
    imageReact: {
        width: 100,
        height: 100,
        alignSelf: "center",
    },
});
